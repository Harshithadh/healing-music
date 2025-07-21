export default async function handler(req, res) {
    const API_KEY = process.env.YT_API_KEY;
    const freq = req.query.freq;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${freq}hz%20healing%20music&type=video&key=${API_KEY}&maxResults=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error("API error:", err);
        res.status(500).json({ error: "Failed to fetch from YouTube API" });
    }
}
