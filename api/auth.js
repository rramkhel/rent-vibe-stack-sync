module.exports = async (req, res) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body || {};
    const submittedPassword = (password || '').trim();

    // Use existing env vars from the middleware setup
    const validPasswords = [
      process.env.AUTH_PASS_JUPITER,
      process.env.AUTH_PASS_RACHEL,
      process.env.AUTH_PASS_DEMO1,
      process.env.AUTH_PASS_DEMO2,
      process.env.AUTH_PASS_DEMO3,
      process.env.AUTH_PASS_DEMO4,
      process.env.AUTH_PASS_DEMO5,
      process.env.AUTH_PASS_DEMO6,
      process.env.AUTH_PASS_DEMO7,
    ].filter(Boolean).map(p => p.trim());

    if (validPasswords.length === 0) {
      console.error('No AUTH_PASS_* environment variables set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const isValid = validPasswords.some(p => p === submittedPassword);

    if (isValid) {
      // Set 7-day cookie
      const maxAge = 60 * 60 * 24 * 7; // 7 days in seconds
      res.setHeader('Set-Cookie', [
        `rvss_auth=valid; Path=/; Secure; SameSite=Strict; Max-Age=${maxAge}`
      ]);
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ error: 'Invalid password' });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
