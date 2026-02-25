export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Hanya menerima method POST' });
    
    const { token, offset } = req.body;
    if (!token) return res.status(400).json({ error: 'Token bot diperlukan' });

    try {
        // Kita nggak pakai parameter 'timeout' yang lama biar Vercel Serverless nggak kena limit waktu eksekusi.
        const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${offset}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil pesan' });
    }
}
