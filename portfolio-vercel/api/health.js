module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status:    'ok',
    service:   'Resend',
    platform:  'Vercel',
    timestamp: new Date().toISOString(),
  });
};
