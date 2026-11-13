module.exports = async function handler(req, res) {
  const TURSO_URL = "https://townshipdb-wsaph.aws-ap-southeast-1.turso.io/v2/pipeline";
  const TURSO_TOKEN = "EyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTQ1Nzg2MTMsImlkIjoiMDFhMWQ1MzUtOWEwMS03ZGI2LThlZTEtZWY3ZmI5YjU4MDA1Iiwia2lkIjoiVjE0dmlnYThBLXYxTkZ5TkswcFFSN0NmbVdKa2Zmd3VxZjRhRkxaWjVlSSIsInJpZCI6ImViNDhmYjI4LTcwMWMtNGZiYy1iZWE3LWE0YWRjNzlhOWI3MSJ9.V-dP0sszcxHDZyVHw8YZFSiHhhRGVffFSdXAkCdl5AJswcE9kjXoOrycgba5XqIEOTrTJKaGXHAVHBjY8cCdCg";

  try {
    const payload = typeof req.body === "string" ? req.body : JSON.stringify(req.body);

    const response = await fetch(TURSO_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TURSO_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: payload
    });

    const text = await response.text();
    res.setHeader("Content-Type", "application/json");
    return res.status(response.status).send(text);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
