// server.js
const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.YT_API_KEY;

// 1. Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// 2. API endpoint
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
                key: API_KEY,
            },
        });

        const videos = yt.data.items.map(i => ({
            id: i.id.videoId,
            title: i.snippet.title,
        }));

        res.json(videos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'YouTube fetch failed' });
    }
});

// 3. Serve index.html on unmatched routes (for frontend routing or root)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 4. Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
