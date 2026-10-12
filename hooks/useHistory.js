import { useCallback, useSyncExternalStore } from 'react';

const KEY = 'base64-workbench-history';
const MAX_ENTRIES = 5;
export const MAX_INPUT_LENGTH = 2000;
const EMPTY = [];

let cache = { raw: null, value: EMPTY };
const listeners = new Set();

function parse(raw) {
  try {
    const saved = JSON.parse(raw || '[]');
    if (!Array.isArray(saved)) return EMPTY;
    return saved
      .filter((entry) => entry && typeof entry.input === 'string' && (entry.mode === 'encode' || entry.mode === 'decode'))
      .slice(0, MAX_ENTRIES);
  } catch {
    return EMPTY;
  }
}

function getSnapshot() {
  let raw = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    /* storage unavailable */
  }
  if (raw !== cache.raw) cache = { raw, value: parse(raw) };
  return cache.value;
}

function subscribe(listener) {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function write(entries) {
  try {
    if (entries.length) window.localStorage.setItem(KEY, JSON.stringify(entries));
    else window.localStorage.removeItem(KEY);
  } catch {
    /* history is best-effort */
  }
  listeners.forEach((listener) => listener());
}

export function useHistory() {
  const history = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  const add = useCallback(({ mode, input }) => {
    if (!input || input.length > MAX_INPUT_LENGTH) return;
    const rest = getSnapshot().filter((entry) => entry.input !== input || entry.mode !== mode);
    write([{ mode, input, id: Date.now() }, ...rest].slice(0, MAX_ENTRIES));
  }, []);

  const clear = useCallback(() => write([]), []);

  return { history, add, clear };
}
