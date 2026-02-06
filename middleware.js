// middleware.js
// Basic auth protection for Vercel deployment
// Localhost is unaffected - this only runs on Vercel's edge network

export function middleware(request) {
  // List of valid username:password combinations
  // Each user gets their own login - revoke access by removing their entry
  const validUsers = {
    'jupiter': process.env.AUTH_PASS_JUPITER,
    'rachel': process.env.AUTH_PASS_RACHEL,
    'demo1': process.env.AUTH_PASS_DEMO1,
    'demo2': process.env.AUTH_PASS_DEMO2,
    'demo3': process.env.AUTH_PASS_DEMO3,
    'demo4': process.env.AUTH_PASS_DEMO4,
    'demo5': process.env.AUTH_PASS_DEMO5,
    'demo6': process.env.AUTH_PASS_DEMO6,
    'demo7': process.env.AUTH_PASS_DEMO7,
  };

  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return unauthorizedResponse();
  }

  // Decode the base64 credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = atob(base64Credentials);
  const [username, password] = credentials.split(':');

  // Check if username exists and password matches
  const expectedPassword = validUsers[username?.toLowerCase()];

  if (!expectedPassword || password !== expectedPassword) {
    return unauthorizedResponse();
  }

  // Auth successful - continue to the requested page
  return;
}

function unauthorizedResponse() {
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="RentSync Prototypes"',
      'Content-Type': 'text/plain',
    },
  });
}

// Apply to all routes
export const config = {
  matcher: '/:path*',
};
