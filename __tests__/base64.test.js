import { encodeBase64, decodeBase64, fromUrlSafeBase64, toUrlSafeBase64 } from '../utils/base64';

describe('Base64 utils', () => {
  it('encodes and decodes unicode correctly', () => {
    const text = '✓ à la mode';
    const encoded = encodeBase64(text);
    expect(encoded).toBe('4pyTIMOgIGxhIG1vZGU=');
    expect(decodeBase64(encoded)).toBe(text);
  });
});

it('converts URL-safe Base64', () => {
  expect(toUrlSafeBase64('++//AA==')).toBe('--__AA');
  expect(fromUrlSafeBase64('--__AA')).toBe('++//AA==');
});

it('rejects malformed Base64', () => {
  expect(() => decodeBase64('not valid!')).toThrow('Invalid Base64 format');
});

it('round-trips emoji and empty-adjacent edge cases', () => {
  expect(decodeBase64(encodeBase64('Hello, world! 🌍'))).toBe('Hello, world! 🌍');
  expect(encodeBase64('')).toBe('');
});

it('ignores whitespace and rejects bad padding or invalid UTF-8', () => {
  expect(decodeBase64('dGVz\n dA==')).toBe('test');
  expect(() => decodeBase64('dGVzdA=')).toThrow('Invalid Base64 format');
  expect(() => decodeBase64('/w==')).toThrow('Invalid Base64 format');
  expect(() => decodeBase64('')).toThrow('Invalid Base64 format');
});

it('rejects impossible URL-safe lengths', () => {
  expect(() => fromUrlSafeBase64('A')).toThrow('Invalid Base64 format');
});
