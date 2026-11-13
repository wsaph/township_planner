export default async function handler(req, res) {
  const TURSO_URL = "https://townshipdb-wsaph.aws-ap-southeast-1.turso.io/v2/pipeline";
  const TURSO_TOKEN = "EyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTQ1Nzg2MTMsImlkIjoiMDFhMWQ1MzUtOWEwMS03ZGI2LThlZTEtZWY3ZmI5YjU4MDA1Iiwia2lkIjoiVjE0dmlnYThBLXYxTkZ5TkswcFFSN0NmbVdKa2Zmd3VxZjRhRkxaWjVlSSIsInJpZCI6ImViNDhmYjI4LTcwMWMtNGZiYy1iZWE3LWE0YWRjNzlhOWI3MSJ9.V-dP0sszcxHDZyVHw8YZFSiHhhRGVffFSdXAkCdl5AJswcE9kjXoOrycgba5XqIEOTrTJKaGXHAVHBjY8cCdCg";

  try {
    let payload = req.body;
    if (!payload || typeof payload === "string") {
      const raw = await new Promise((resolve) => {
        let buf = "";
        req.on("data", (chunk) => (buf += chunk));
        req.on("end", () => resolve(buf));
      });
      payload = raw ? JSON.parse(raw) : (typeof req.body === "string" ? JSON.parse(req.body) : {});
    }

    const response = await fetch(TURSO_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TURSO_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    if (!response.ok) {
      return res.status(response.status).json({ error: `Turso ${response.status}: ${text}` });
    }

    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
