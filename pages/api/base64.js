import { convert } from '../../utils/convert';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { text, action, urlSafe = false } = req.body || {};
  if (typeof text !== 'string' || (action !== 'encode' && action !== 'decode') || typeof urlSafe !== 'boolean') {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }

  try {
    res.status(200).json({ result: convert(text, { mode: action, urlSafe }) });
  } catch {
    res.status(422).json({ error: 'Invalid Base64 input' });
  }
}
