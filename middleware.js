export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export default function middleware(request) {
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
    return new Response('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="RentSync Prototypes"' },
    });
  }

  try {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = atob(base64Credentials);
    const colonIndex = credentials.indexOf(':');

    if (colonIndex === -1) {
      return new Response('Invalid credentials', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="RentSync Prototypes"' },
      });
    }

    const username = credentials.substring(0, colonIndex).toLowerCase();
    const password = credentials.substring(colonIndex + 1);
    const expectedPassword = validUsers[username];

    if (!expectedPassword || password !== expectedPassword) {
      return new Response('Invalid credentials', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="RentSync Prototypes"' },
      });
    }

    return undefined;

  } catch (e) {
    return new Response('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="RentSync Prototypes"' },
    });
  }
}
