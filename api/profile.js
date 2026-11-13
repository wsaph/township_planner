module.exports = async function (req, res) {
  const url = "https://townshipdb-wsaph.aws-ap-southeast-1.turso.io/v2/pipeline";
  const token = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTQ1ODI0OTQsImlkIjoiMDFhMWQ1MzUtOWEwMS03ZGI2LThlZTEtZWY3ZmI5YjU4MDA1Iiwia2lkIjoiVjE0dmlnYThBLXYxTkZ5TkswcFFSN0NmbVdKa2Zmd3VxZjRhRkxaWjVlSSIsInJpZCI6ImViNDhmYjI4LTcwMWMtNGZiYy1iZWE3LWE0YWRjNzlhOWI3MSJ9.70wzGi5wXCYPZTWSvmeIoQ6L3o-mkK0xx-njy7mdEo8pFc01lwMHhrBxoAkWitMt9DKd9pAupmP1P8MjjhZpAA";

  try {
    const bodyStr = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: bodyStr
    });
    const text = await r.text();
    res.status(r.status).setHeader("Content-Type", "application/json").send(text);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};
