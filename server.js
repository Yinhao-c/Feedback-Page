const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// POST endpoint to handle feedback submission
app.post('/submit-feedback', (req, res) => {
    const { email, message } = req.body;
    if (!email || !message) {
        return res.status(400).json({ success: false, message: 'Email and message required' });
    }

    const feedbackEntry = `${new Date().toISOString()} | ${email} | ${message}\n`;

    // Save feedback to local file
    fs.appendFile('feedback.txt', feedbackEntry, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        return res.json({ success: true, message: 'Feedback received!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
