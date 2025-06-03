import { encodeBase64, decodeBase64 } from '../utils/base64';

describe('Base64 utils', () => {
  it('encodes and decodes unicode correctly', () => {
    const text = '✓ à la mode';
    const encoded = encodeBase64(text);
    expect(encoded).toBe('4pyTIMOgIGxhIG1vZGU=');
    expect(decodeBase64(encoded)).toBe(text);
  });
});
