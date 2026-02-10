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
