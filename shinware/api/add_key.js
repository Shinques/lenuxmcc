import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.resolve("./shinware/shinware.json"); // JSON dosyası root'ta

  if (req.method === "POST") {
    const { username, key } = req.body;

    if (!username || !key) {
      return res.status(400).json({ error: "username ve key gerekli" });
    }

    // JSON dosyasını oku
    let data = { admin: { username: "Admin", password: "123" }, users: {} };
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    // Yeni kullanıcı ekle
    d
