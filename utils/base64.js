function bytesToBase64(bytes) {
  if (typeof window === 'undefined') {
    return Buffer.from(bytes).toString('base64');
  }

  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return window.btoa(binary);
}

function base64ToBytes(value) {
  const normalized = value.replace(/\s/g, '');
  if (!normalized || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(normalized)) {
    throw new Error('Invalid Base64 format');
  }

  if (typeof window === 'undefined') {
    return new Uint8Array(Buffer.from(normalized, 'base64'));
  }

  const binary = window.atob(normalized);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

export function encodeBase64(text) {
  return bytesToBase64(new TextEncoder().encode(text));
}

export function decodeBase64(base64) {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(base64ToBytes(base64));
  } catch {
    throw new Error('Invalid Base64 format');
  }
}

export function toUrlSafeBase64(value) {
  return value.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function fromUrlSafeBase64(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
  const padding = normalized.length % 4;
  if (padding === 1) throw new Error('Invalid Base64 format');
  return normalized + '='.repeat((4 - padding) % 4);
}
