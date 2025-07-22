const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const YT_API_KEY = process.env.YT_API_KEY;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/healing', async (req, res) => {
    try {
        const freq = req.query.freq || '432';
        const q = `${freq}Hz healing music`;

        const yt = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q,
                type: 'video',
                maxResults: 8,
                key: YT_API_KEY
            }
        });

        const videos = yt.data.items.map(i => ({
            id: i.id.videoId,
            title: i.snippet.title
        }));

        res.json(videos);
    } catch (err) {
        console.error('YouTube fetch error:', err.response?.data || err.message);
        res.status(500).json({ error: 'YouTube fetch failed' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
