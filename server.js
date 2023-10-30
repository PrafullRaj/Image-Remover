const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const port = 3000;

const REMOVE_BG_API_ENDPOINT = "https://api.slazzer.com/v2.0/remove_image_background";
const API_KEY = '4ae61c9d7a004934809855121975e1d8';  // Replace with your actual API key

app.use(express.static('public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/removebg', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No image uploaded.');
    }

    const formData = new FormData();
    formData.append('image_file', req.file.buffer);
    formData.append('size', 'auto');

    try {
        const response = await axios.post(REMOVE_BG_API_ENDPOINT, formData, {
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': API_KEY
            },
            responseType: 'arraybuffer'  // important for receiving the image as a buffer
        });

        res.send(response.data);

    } catch (error) {
        console.error('Error removing background:', error);
        res.status(500).send('Failed to remove background.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
