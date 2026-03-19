# Sprint: Local Development Auth Setup

## Problem
The cookie-based auth system works great on Vercel, but locally:
- `python3 -m http.server` can't run serverless API functions
- The auth-guard script redirects to login, but login can't validate passwords
- You're stuck in a redirect loop or can't test locally

## Solution
Add a local development bypass that automatically sets the auth cookie when running on localhost.

---

## Step 1: Update auth-guard.js

Replace `/js/auth-guard.js` with this version that bypasses auth on localhost:

```javascript
// Auth Guard - Include at the TOP of every protected page
// Bypasses auth on localhost for local development

(function() {
  var isLocalhost = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';
  
  // On localhost, auto-set the cookie and skip auth
  if (isLocalhost) {
    // Set cookie if not present (so the rest of the app works normally)
    if (!document.cookie.includes('rvss_auth=')) {
      document.cookie = 'rvss_auth=valid; path=/';
    }
    return; // Don't redirect, allow access
  }
  
  // On production, check for valid auth cookie
  var hasAuth = document.cookie.split(';').some(function(c) {
    return c.trim().indexOf('rvss_auth=') === 0;
  });
  
  if (!hasAuth) {
    window.location.replace('/login.html');
  }
})();
```

---

## Step 2: Update login.html (Optional Enhancement)

Update the login form script in `login.html` to handle localhost gracefully:

Find the existing redirect check at the top of the `<script>` section and replace with:

```javascript
// If already authenticated OR on localhost, redirect to home
(function() {
  var isLocalhost = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';
  
  // On localhost, just go straight to home
  if (isLocalhost) {
    document.cookie = 'rvss_auth=valid; path=/';
    window.location.replace('/');
    return;
  }
  
  // On production, check if already logged in
  var hasAuth = document.cookie.split(';').some(function(c) {
    return c.trim().indexOf('rvss_auth=') === 0;
  });
  if (hasAuth) {
    window.location.replace('/');
  }
})();
```

This means if you accidentally go to `/login.html` on localhost, it'll just redirect you to home instead of showing a login form that won't work.

---

## Step 3: Test Locally

```bash
cd /Users/jupiter/Projects/rent-vibe-stack-sync
python3 -m http.server 8080
```

Visit http://localhost:8080/

**Expected behavior:**
- Home page loads immediately (no redirect to login)
- All pages accessible without auth prompt
- Cookie `rvss_auth=valid` automatically set

---

## Step 4: Test on Production

```bash
git add .
git commit -m "Add localhost bypass for local development

- auth-guard.js: Skip auth check on localhost, auto-set cookie
- login.html: Redirect straight to home on localhost"

git push origin main
```

**Test on production (incognito window):**
1. Go to https://rent-vibe-stack-sync.vercel.app/
2. Should redirect to /login.html
3. Enter password → should redirect to home
4. Refresh → should stay logged in

**Test on localhost:**
1. Go to http://localhost:8080/
2. Should load home directly (no login required)

---

## How It Works

| Environment | Behavior |
|-------------|----------|
| `localhost` or `127.0.0.1` | Auth bypassed, cookie auto-set, full access |
| `*.vercel.app` or custom domain | Full auth required via login page |

---

## Security Note

This is safe because:
- The bypass only works on `localhost` / `127.0.0.1`
- Attackers can't spoof the hostname in your browser
- Production traffic never hits localhost
- The cookie is still set locally so any cookie-dependent code works normally

---

## Completion Checklist

- [ ] Updated `js/auth-guard.js` with localhost bypass
- [ ] Updated `login.html` with localhost redirect (optional)
- [ ] Tested locally - pages load without auth
- [ ] Pushed to Vercel
- [ ] Tested production - login still required
- [ ] Both environments working correctly
