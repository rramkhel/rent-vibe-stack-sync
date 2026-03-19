# Add Cookie-Based Login Gate to rent-vibe-stack-sync

## Overview
Replace the middleware with a clean cookie-based auth system:
1. A styled login page that sets a cookie on successful auth
2. A serverless API function to validate the password
3. A guard script on every protected page that redirects if no cookie

## Step 1: Remove the Middleware

```bash
cd /Users/jupiter/Projects/rent-vibe-stack-sync
rm middleware.js
```

## Step 2: Create the API Function

Create the `api` folder and auth endpoint:

```bash
mkdir -p api
```

Create `api/auth.js`:

```javascript
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
```

## Step 3: Create the Login Page

Create `login.html` in the project root:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In | RentSync Prototypes</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      padding: 48px;
      width: 100%;
      max-width: 400px;
    }

    .logo {
      text-align: center;
      margin-bottom: 32px;
    }

    .logo-icon {
      font-size: 48px;
      margin-bottom: 12px;
    }

    .logo h1 {
      font-size: 24px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 4px;
    }

    .logo p {
      font-size: 14px;
      color: #6b7280;
    }

    .form-group {
      margin-bottom: 24px;
    }

    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 8px;
    }

    input[type="password"] {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      transition: border-color 0.2s, box-shadow 0.2s;
      font-family: inherit;
    }

    input[type="password"]:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    input[type="password"].error {
      border-color: #ef4444;
    }

    .error-message {
      color: #ef4444;
      font-size: 14px;
      margin-top: 8px;
      display: none;
    }

    .error-message.visible {
      display: block;
    }

    button {
      width: 100%;
      padding: 14px 24px;
      font-size: 16px;
      font-weight: 600;
      color: white;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      font-family: inherit;
    }

    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 20px -10px rgba(102, 126, 234, 0.5);
    }

    button:active {
      transform: translateY(0);
    }

    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .footer-note {
      text-align: center;
      margin-top: 24px;
      font-size: 12px;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="login-card">
    <div class="logo">
      <div class="logo-icon">🔐</div>
      <h1>RentSync Prototypes</h1>
      <p>Internal access only</p>
    </div>

    <form id="login-form">
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Enter access password"
          autocomplete="current-password"
          required
        >
        <p class="error-message" id="error-message">Invalid password. Please try again.</p>
      </div>

      <button type="submit" id="submit-btn">Sign In</button>
    </form>

    <p class="footer-note">
      Need access? Contact Rachel.
    </p>
  </div>

  <script>
    // If already authenticated, redirect to home
    (function() {
      var hasAuth = document.cookie.split(';').some(function(c) {
        return c.trim().indexOf('rvss_auth=') === 0;
      });
      if (hasAuth) {
        window.location.replace('/');
      }
    })();

    const form = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Reset error state
      passwordInput.classList.remove('error');
      errorMessage.classList.remove('visible');
      
      // Disable button while loading
      submitBtn.disabled = true;
      submitBtn.textContent = 'Signing in...';

      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: passwordInput.value }),
          credentials: 'include'
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Redirect to home page
          window.location.href = '/';
        } else {
          // Show error
          passwordInput.classList.add('error');
          errorMessage.classList.add('visible');
          passwordInput.select();
        }
      } catch (error) {
        console.error('Login error:', error);
        errorMessage.textContent = 'Something went wrong. Please try again.';
        errorMessage.classList.add('visible');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign In';
      }
    });

    // Clear error on input
    passwordInput.addEventListener('input', () => {
      passwordInput.classList.remove('error');
      errorMessage.classList.remove('visible');
    });
  </script>
</body>
</html>
```

## Step 4: Create the Auth Guard Script

Create `js/auth-guard.js`:

```javascript
// Auth Guard - Include this at the TOP of every protected page
// Add via: <script src="/js/auth-guard.js"></script>

(function() {
  var hasAuth = document.cookie.split(';').some(function(c) {
    return c.trim().indexOf('rvss_auth=') === 0;
  });
  
  if (!hasAuth) {
    window.location.replace('/login.html');
  }
})();
```

## Step 5: Add Auth Guard to All Protected Pages

Add this script tag at the TOP of the `<head>` section in every HTML file that should be protected:

```html
<script src="/js/auth-guard.js"></script>
```

Files to update:
- `/index.html` (hub page)
- `/rent-vibes/index.html`
- `/rent-vibes/demo.html`
- `/rent-vibes/vision.html`
- `/rent-vibes/is-basement.html`
- `/rent-vibes/is-basement-docs.html`
- `/landlord-login/index.html`
- Any other HTML files in the project

**Example** - in `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="/js/auth-guard.js"></script>  <!-- ADD THIS FIRST -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RentSync Prototypes</title>
  <!-- rest of head -->
</head>
```

**Important:** The auth-guard script must be the FIRST script in `<head>` so it runs before any page content renders.

## Step 6: Verify Environment Variables in Vercel

You already have these set from the middleware setup - just confirm they exist:

1. Go to Vercel Dashboard → rent-vibe-stack-sync → Settings → Environment Variables
2. Verify these exist:
   - `AUTH_PASS_JUPITER`
   - `AUTH_PASS_RACHEL`
   - `AUTH_PASS_DEMO1` through `AUTH_PASS_DEMO7`

Any of these passwords will work to log in.

## Step 7: Create a Logout Function (Optional)

If you want a logout button anywhere, add this function:

```javascript
function logout() {
  // Clear the cookie by setting it to expire in the past
  document.cookie = 'rvss_auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
  window.location.href = '/login.html';
}
```

And a logout link/button:
```html
<a href="#" onclick="logout(); return false;">Sign Out</a>
```

## Step 8: Deploy and Test

```bash
git add .
git commit -m "Replace middleware auth with styled login page

- Add /api/auth.js serverless function for password validation
- Add login.html with styled login form
- Add auth-guard.js for client-side protection
- Remove middleware.js"

git push origin main
```

## Step 9: Test the Flow

1. Open incognito window
2. Go to https://rent-vibe-stack-sync.vercel.app/
3. Should redirect to /login.html
4. Enter the password you set in SITE_PASSWORD
5. Should redirect to home page
6. Refresh - should stay logged in (cookie persists)
7. Close browser, reopen - should still be logged in (7-day cookie)

## Credential Management

**Using existing passwords:**
You already have 9 passwords configured from the middleware setup:
- `AUTH_PASS_JUPITER` - your primary
- `AUTH_PASS_RACHEL` - your backup
- `AUTH_PASS_DEMO1` through `AUTH_PASS_DEMO7` - shareable

Any of these passwords will work. To revoke someone's access, change or delete their env var in Vercel and redeploy.

## Troubleshooting

### "Login works but I get redirected back to login"
- Check that the cookie is being set (DevTools → Application → Cookies)
- Make sure you're on HTTPS (cookies with `Secure` flag won't work on HTTP)
- Localhost testing: Remove `Secure;` from cookie in api/auth.js for local dev

### "API returns 500 error"
- Check Vercel logs for the error
- Verify SITE_PASSWORD env var is set

### "Page flashes before redirect"
- Make sure auth-guard.js is the FIRST script in `<head>`
- The script should execute before any DOM rendering

## Local Development Note

For localhost testing with `python3 -m http.server`:
- The API won't work (no serverless functions locally)
- The auth guard will always redirect to login
- Either:
  1. Temporarily comment out the auth-guard script for local dev
  2. Manually set the cookie in browser DevTools: `document.cookie = "rvss_auth=valid; path=/"`
  3. Use `vercel dev` instead of python server to test the full flow locally
