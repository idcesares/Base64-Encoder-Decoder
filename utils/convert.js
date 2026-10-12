import {
  decodeBase64,
  encodeBase64,
  fromUrlSafeBase64,
  toUrlSafeBase64,
} from './base64';

export function convert(text, { mode = 'encode', urlSafe = false } = {}) {
  if (mode === 'encode') {
    const encoded = encodeBase64(text);
    return urlSafe ? toUrlSafeBase64(encoded) : encoded;
  }
  return decodeBase64(urlSafe ? fromUrlSafeBase64(text) : text);
}

export function getByteCount(value) {
  return new TextEncoder().encode(value).length;
}
