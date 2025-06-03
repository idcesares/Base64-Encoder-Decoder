import { encodeBase64, decodeBase64 } from '../../utils/base64';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { text, action } = req.body || {};
  if (typeof text !== 'string' || (action !== 'encode' && action !== 'decode')) {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }

  try {
    const result = action === 'encode' ? encodeBase64(text) : decodeBase64(text);
    res.status(200).json({ result });
  } catch {
    res.status(500).json({ error: 'Processing error' });
  }
}
