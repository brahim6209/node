const express = require('express');
const corsAnywhere = require('cors-anywhere');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up the CORS Anywhere proxy
const corsProxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
});

app.use('/proxy', (req, res) => {
  req.url = req.url.replace('/proxy', ''); // Remove "/proxy" prefix from URL
  corsProxy.emit('request', req, res);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
