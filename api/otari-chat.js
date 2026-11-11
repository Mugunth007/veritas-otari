export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { model = 'openai/gpt-oss-120b', messages, temperature = 0.2, apiKey } = req.body || {};
  const token = apiKey || process.env.OTARI_API_KEY || process.env.VITE_OTARI_API_KEY;

  if (!token) {
    return res.status(400).json({ error: 'Missing Otari API key' });
  }

  try {
    const response = await fetch('https://otari.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Otari-Key': token,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ model, messages, temperature })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
