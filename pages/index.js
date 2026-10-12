import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import {
  ArrowLeftRight,
  Check,
  Clipboard,
  Download,
  FileText,
  History,
  RotateCcw,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';
import {
  decodeBase64,
  encodeBase64,
  fromUrlSafeBase64,
  toUrlSafeBase64,
} from '../utils/base64';

const EXAMPLE = 'Hello, world! 🌍';
const HISTORY_KEY = 'base64-workbench-history';
const HISTORY_MAX_INPUT = 2000;

function getByteCount(value) {
  return new TextEncoder().encode(value).length;
}

export default function Home() {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(HISTORY_KEY) || '[]');
      if (Array.isArray(saved)) {
        setHistory(saved.filter((entry) => entry && typeof entry.input === 'string' && (entry.mode === 'encode' || entry.mode === 'decode')).slice(0, 5));
      }
    } catch {
      /* storage unavailable or corrupted; start with an empty history */
    }
  }, []);

  useEffect(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const result = mode === 'encode'
        ? (urlSafe ? toUrlSafeBase64(encodeBase64(input)) : encodeBase64(input))
        : decodeBase64(urlSafe ? fromUrlSafeBase64(input) : input);
      setOutput(result);
      setError('');
    } catch {
      setOutput('');
      setError('This does not look like valid Base64. Check the input and try again.');
    }
  }, [input, mode, urlSafe]);

  const saveToHistory = useCallback(() => {
    if (!input || !output) return;
    if (input.length > HISTORY_MAX_INPUT) return;
    const item = { mode, input, id: Date.now() };
    const nextHistory = [item, ...history.filter((entry) => entry.input !== item.input || entry.mode !== item.mode)].slice(0, 5);
    setHistory(nextHistory);
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
    } catch {
      /* history is best-effort */
    }
  }, [history, input, mode, output]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      saveToHistory();
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError('Clipboard access is unavailable. Select the result and copy it manually.');
    }
  };

  const handleSave = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = `base64-${mode === 'encode' ? 'encoded' : 'decoded'}.txt`;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
    saveToHistory();
  }, [mode, output, saveToHistory]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter' && output) handleSave();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSave, output]);

  const loadFile = (file) => {
    if (!file) return;
    if (file.size > 1024 * 1024) {
      setError('For a quick browser experience, choose a text file smaller than 1 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setInput(String(reader.result || ''));
    reader.onerror = () => setError('We could not read that file.');
    reader.readAsText(file);
  };

  const switchMode = (nextMode) => {
    if (nextMode === mode) return;
    setMode(nextMode);
    setInput(output || '');
    setOutput('');
    setError('');
  };

  const reset = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <>
      <Head>
        <title>Base64 Workbench — Encode, Decode, Ship</title>
        <link rel="canonical" href="https://base64.dcesares.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Base64 Workbench — Encode, Decode, Ship" />
        <meta property="og:description" content="A fast, private Base64 workbench for text, files, URL-safe encoding, and copy-ready results." />
        <meta property="og:url" content="https://base64.dcesares.dev/" />
        <meta name="description" content="A fast, private Base64 workbench for text, files, URL-safe encoding, and copy-ready results." />
        <meta name="theme-color" content="#09090b" />
      </Head>
      <main className="min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(20,184,166,.18),transparent_30%),radial-gradient(circle_at_88%_14%,rgba(99,102,241,.2),transparent_27%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between py-3">
            <a href="#workbench" className="flex items-center gap-3 font-semibold tracking-tight">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-teal-300 to-indigo-500 text-zinc-950 shadow-lg shadow-teal-500/20"><Sparkles size={19} /></span>
              <span>Base64 <span className="text-zinc-500">Workbench</span></span>
            </a>
            <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 sm:block">Private by design · Runs in your browser</span>
          </header>

          <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[.8fr_1.2fr] lg:py-16">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-300/15 bg-teal-300/10 px-3 py-1.5 text-xs font-medium text-teal-200"><span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> Local processing. Zero uploads.</div>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-.04em] text-white sm:text-6xl">The cleanest way to work with Base64.</h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400 sm:text-lg">Encode and decode Unicode text instantly, switch to URL-safe Base64, import a text file, and keep a small on-device history.</p>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-zinc-400"><span>✓ Unicode ready</span><span>✓ URL-safe mode</span><span>✓ Download results</span></div>
            </div>

            <section id="workbench" className="rounded-3xl border border-white/10 bg-zinc-900/75 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex rounded-xl bg-black/25 p-1">
                  {['encode', 'decode'].map((item) => <button key={item} onClick={() => switchMode(item)} aria-pressed={mode === item} className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${mode === item ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'}`}>{item}</button>)}
                </div>
                <label className="flex cursor-pointer items-center gap-2 text-xs text-zinc-400"><input type="checkbox" checked={urlSafe} onChange={(event) => setUrlSafe(event.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-teal-400 focus:ring-teal-400" /> URL-safe Base64</label>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <Panel label={mode === 'encode' ? 'Plain text' : 'Base64 input'} meta={`${input.length.toLocaleString()} characters · ${getByteCount(input).toLocaleString()} bytes`}>
                  <textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder={mode === 'encode' ? 'Write or paste text here…' : 'Paste Base64 here…'} className="min-h-[250px] w-full resize-none bg-transparent p-4 font-mono text-sm leading-6 text-zinc-100 outline-none placeholder:text-zinc-600" aria-label="Input" />
                  <div className="flex items-center justify-between border-t border-white/5 px-3 py-2"><button onClick={() => setInput(EXAMPLE)} className="text-xs text-teal-300 hover:text-teal-200">Use example</button><div className="flex gap-1"><button onClick={() => fileInputRef.current?.click()} className="icon-button" title="Import text file" aria-label="Import text file"><Upload size={15} /></button><button onClick={reset} className="icon-button" title="Clear input" aria-label="Clear input"><X size={15} /></button></div><input ref={fileInputRef} type="file" accept="text/plain,.txt,.csv,.json,.xml" className="hidden" onChange={(event) => loadFile(event.target.files?.[0])} /></div>
                </Panel>
                <Panel label={mode === 'encode' ? 'Base64 output' : 'Decoded text'} meta={output ? `${output.length.toLocaleString()} characters` : 'Ready when you are'}>
                  <textarea value={output} readOnly placeholder="Your result appears here instantly…" className="min-h-[250px] w-full resize-none bg-transparent p-4 font-mono text-sm leading-6 text-zinc-100 outline-none placeholder:text-zinc-600" aria-label="Result" />
                  <div className="flex items-center justify-between border-t border-white/5 px-3 py-2"><span className="text-xs text-zinc-500">⌘/Ctrl + Enter to download</span><div className="flex gap-1"><button onClick={handleSave} disabled={!output} className="icon-button disabled:opacity-30" title="Download result" aria-label="Download result"><Download size={15} /></button><button onClick={handleCopy} disabled={!output} className="icon-button disabled:opacity-30" title="Copy result" aria-label="Copy result">{copied ? <Check size={15} className="text-teal-300" /> : <Clipboard size={15} />}</button></div></div>
                </Panel>
              </div>

              {error && <div role="alert" className="mt-4 flex items-center gap-2 rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200"><X size={15} /> {error}</div>}
              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4"><button onClick={() => { setInput(output); setOutput(input); setMode(mode === 'encode' ? 'decode' : 'encode'); }} disabled={!input && !output} className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white disabled:opacity-30"><ArrowLeftRight size={15} /> Swap direction</button><span aria-live="polite" className="text-xs text-teal-300">{copied ? 'Copied to clipboard' : 'Instant conversion enabled'}</span></div>
            </section>
          </section>

          <section className="mb-5 rounded-2xl border border-white/10 bg-white/[.03] p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-2 text-sm font-medium"><History size={16} className="text-teal-300" /> Recent work</div>{history.length > 0 && <button onClick={() => { setHistory([]); try { window.localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ } }} className="text-xs text-zinc-500 hover:text-white"><RotateCcw size={13} className="mr-1 inline" /> Clear</button>}</div>
            {history.length ? <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{history.map((entry) => <button key={entry.id} onClick={() => { setMode(entry.mode); setInput(entry.input); }} className="rounded-xl border border-white/5 bg-black/15 p-3 text-left transition hover:border-teal-300/30 hover:bg-white/5"><span className="block text-xs capitalize text-teal-300">{entry.mode}</span><span className="mt-1 block truncate font-mono text-xs text-zinc-400">{entry.input}</span></button>)}</div> : <p className="text-sm text-zinc-500">Copy or download a result and it will appear here. Your history stays on this device.</p>}
          </section>
          <footer className="flex flex-wrap justify-between gap-3 py-3 text-xs text-zinc-600"><span>Built for quick, private transformations.</span><a className="hover:text-zinc-300" href="https://dcesares.dev" target="_blank" rel="noreferrer">dcesares.dev</a></footer>
        </div>
      </main>
    </>
  );
}

function Panel({ label, meta, children }) {
  return <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20"><div className="flex items-center justify-between border-b border-white/5 px-4 py-3"><span className="text-sm font-medium text-zinc-200">{label}</span><span className="text-xs text-zinc-500">{meta}</span></div>{children}</div>;
}
