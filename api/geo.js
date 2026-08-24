export default function handler(req, res) {
  const country = req.headers["x-vercel-ip-country"] || "MA";
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.status(200).json({ country });
}
