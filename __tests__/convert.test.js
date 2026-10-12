import { convert, getByteCount } from '../utils/convert';

it('converts in both directions with and without URL-safe mode', () => {
  expect(convert('??>>', { mode: 'encode' })).toBe('Pz8+Pg==');
  expect(convert('??>>', { mode: 'encode', urlSafe: true })).toBe('Pz8-Pg');
  expect(convert('Pz8-Pg', { mode: 'decode', urlSafe: true })).toBe('??>>');
});

it('counts UTF-8 bytes', () => {
  expect(getByteCount('🌍')).toBe(4);
});
