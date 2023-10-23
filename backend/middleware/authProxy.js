const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
dotenv.config();

const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVER, // Authentication server
  changeOrigin: true, // Changes host header to target's host

  onProxyReq: (proxyReq, req, res) => {
    console.log('Proxying request to authentication server:', req.url);

    if (req.body) {
      // If a request body is present, forward it to the target server
      const bodyData = JSON.stringify(req.body);

      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);

    }
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log('Received response from authentication server:', req.url, 'Status:', proxyRes.statusCode);
  },
});

module.exports = authProxy;
