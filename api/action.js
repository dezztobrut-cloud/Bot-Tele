export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    const { token, chat_id, action } = req.body;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id, action }) // action isinya "typing"
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengirim action' });
    }
}
