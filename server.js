const express = require('express');
const youtubedl = require('youtube-dl-exec');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/convert', async (req, res) => {
    const url = req.query.url;
    const format = req.query.format;

    if (!url || !format) {
        return res.status(400).send('URL and format are required');
    }

    try {
        const output = `output.${format}`;
        const options = {
            output,
            format: format === 'mp4' ? 'best' : 'bestaudio',
            noCheckCertificates: true,
        };

        await youtubedl(url, options);
        res.download(path.resolve(output));
    } catch (error) {
        res.status(500).send('Error converting video');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
