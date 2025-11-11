// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for FCC testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Test endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// ✅ Your Request Header Parser endpoint
app.get("/api/whoami", (req, res) => {
  // get IP address
  const ipaddress =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  // get language
  const language = req.headers["accept-language"];

  // get software (user agent)
  const software = req.headers["user-agent"];

  // send correct JSON response
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software,
  });
});

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
