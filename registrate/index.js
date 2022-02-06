
const express = require('express');
const app = express();
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const fetch = require('node-fetch')


app.post('/registrants', (req, res) => {
    fetch('http://localhost:9000/registrants', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(req.body)
    }).then(response => response.json()).then(registration => {
        res.statusCode = registration.statusCode
        res.json(registration)
    })
    
    
})

const PORT = 3001;
const DOMAIN = 'localhost';
app.listen(PORT, DOMAIN, function () {
    console.log(`The server is running at http://${DOMAIN}:${PORT}`);
});

module.exports = app