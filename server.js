const express = require("express");
const axios = require('axios');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

require('dotenv').config();

const PORT = '8888';
const LINE_BOT_API = 'https://api.line.me/v2/bot';
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
};

app.post('/send-message', async (req, res) => {
    try {
        const { userId, messages } = req.body;
        const body = {
            to: userId,
            messages: [
                {
                    type: 'text',
                    text: messages
                }
            ]
        };

        const response = await axios.post(
            `${LINE_BOT_API}/message/push`,
            body,
            { headers }
        );
        
        console.log('response', response.data);

        res.json({
            message: 'Send message success',
            responseData: response.data
        });
    } catch (error) {
        console.error('error', error.response.data);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
