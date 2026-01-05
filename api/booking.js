export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const scriptUrl = process.env.APPS_SCRIPT_URL; // your Google Apps Script /exec
    if (!scriptUrl) {
      return res.status(500).json({ error: "APPS_SCRIPT_URL missing in Vercel env" });
    }

    const r = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await r.text(); // Apps Script often returns text
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
