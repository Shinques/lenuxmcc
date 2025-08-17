import fs from "fs";
import path from "path";

export default function handler(req, res) {
    const filePath = path.resolve("./shinware.json");

    if (req.method === "POST") {
        const { username, key } = req.body;

        if (!username || !key) {
            return res.status(400).json({ error: "username ve key gerekli" });
        }

        let data = { admin: { username: "Admin", password: "123" }, users: {} };
        if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        }

        data.users[username] = key;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

        return res.status(200).json({ message: `✅ ${username} için key oluşturuldu` });
    } else {
        res.status(405).json({ error: "Sadece POST destekleniyor" });
    }
}
