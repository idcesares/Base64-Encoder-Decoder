import handler from '../pages/api/base64';

function createMocks({ method = 'POST', body = {} } = {}) {
  const req = { method, body };
  const res = {
    statusCode: 0,
    jsonPayload: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.jsonPayload = payload; },
  };
  return { req, res };
}

describe('API base64 handler', () => {
  it('encodes text', () => {
    const { req, res } = createMocks({ body: { text: 'test', action: 'encode' } });
    handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.jsonPayload.result).toBe('dGVzdA==');
  });

  it('decodes text', () => {
    const { req, res } = createMocks({ body: { text: 'dGVzdA==', action: 'decode' } });
    handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.jsonPayload.result).toBe('test');
  });
});

it('returns an actionable error for malformed input', () => {
  const { req, res } = createMocks({ body: { text: 'not valid!', action: 'decode' } });
  handler(req, res);
  expect(res.statusCode).toBe(422);
  expect(res.jsonPayload.error).toBe('Invalid Base64 input');
});
