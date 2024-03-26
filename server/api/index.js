import express from 'express';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { PORT, API_SERVICE_URL, AUTH_TOKEN, CLAN_ID } from './constants.js';

// Create Express Server
const app = express();

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/', (req, res, next) => {
  res.send('This is a proxy service which proxies to Clash of clans API.');
});

// Proxy endpoints
app.use(
  '/currentWar',
  createProxyMiddleware({
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`currentWar`]: `/clans/${CLAN_ID}/currentwar`,
    },
  })
);

// Start the Proxy
app.listen(PORT, () => {
  console.log(`Starting Proxy at port ${PORT}`);
});
