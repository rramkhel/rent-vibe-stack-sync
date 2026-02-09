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
