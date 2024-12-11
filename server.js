const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: __dirname });
const handle = nextApp.getRequestHandler();

const app = express();
const HTTP_PORT = process.env.PORT || 3001;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;

// SSL certificate configuration
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'private.key')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.crt'))
};

// Initialize Next.js
nextApp.prepare().then(() => {
  // Serve static files from the '.next' directory
  app.use('/_next', express.static(path.join(__dirname, '.next')));
  app.use(express.static(path.join(__dirname, 'public')));

  // Redirect HTTP to HTTPS
  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect(['https://', req.hostname, ':', HTTPS_PORT, req.url].join(''));
    }
    next();
  });

  // Handle all routes by serving the Next.js app
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  // Create HTTP server
  http.createServer(app).listen(HTTP_PORT, () => {
    console.log(`HTTP Server running on port ${HTTP_PORT}`);
  });

  // Create HTTPS server
  https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running on port ${HTTPS_PORT}`);
  });
}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});