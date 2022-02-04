
const express = require('express');
const app = express();

app.post('/registrants', (req, res) => {
    res.json({status: 400, body: {
        message: "error"
    }})
})

const PORT = 3001;
const DOMAIN = 'localhost';
app.listen(PORT, DOMAIN, function () {
    console.log(`The server is running at http://${DOMAIN}:${PORT}`);
});