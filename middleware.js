export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export default function middleware(request) {
  const validUsers = {
    'jupiter': process.env.AUTH_PASS_JUPITER || 'NebulaMoons42!',
    'rachel': process.env.AUTH_PASS_RACHEL || 'Teal$Stack2026',
    'demo1': process.env.AUTH_PASS_DEMO1 || 'Comet9!Drift',
    'demo2': process.env.AUTH_PASS_DEMO2 || 'OrbitFlash88!',
    'demo3': process.env.AUTH_PASS_DEMO3 || 'Quasar$Leap21',
    'demo4': process.env.AUTH_PASS_DEMO4 || 'Nova!Spark67',
    'demo5': process.env.AUTH_PASS_DEMO5 || 'PulsarWave33!',
    'demo6': process.env.AUTH_PASS_DEMO6 || 'Meteor$Fall99',
    'demo7': process.env.AUTH_PASS_DEMO7 || 'Cosmic!Glow55',
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
