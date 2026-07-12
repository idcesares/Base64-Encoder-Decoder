import { decodeBase64, encodeBase64, fromUrlSafeBase64, toUrlSafeBase64 } from '../../utils/base64';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { text, action, urlSafe = false } = req.body || {};
  if (typeof text !== 'string' || (action !== 'encode' && action !== 'decode')) {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }

  try {
    const result = action === 'encode'
      ? (urlSafe ? toUrlSafeBase64(encodeBase64(text)) : encodeBase64(text))
      : decodeBase64(urlSafe ? fromUrlSafeBase64(text) : text);
    res.status(200).json({ result });
  } catch {
    res.status(422).json({ error: 'Invalid Base64 input' });
  }
}
