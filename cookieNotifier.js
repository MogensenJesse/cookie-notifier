(function() {
  // URLs of the default and golden cookie favicons
  const defaultFavicon = 'https://orteil.dashnet.org/cookieclicker/img/favicon.ico'; // Adjust if your default favicon URL differs
  const goldenCookieFavicon = 'https://static.wikia.nocookie.net/cookieclicker/images/5/50/GoldCookie.png';

  // Function to set the favicon dynamically
  function setFavicon(url) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = url;
  }

  // Check for golden cookies in the game's shimmer array every second
  setInterval(function() {
    const goldenCookiePresent = Game.shimmers.some(shimmer => shimmer.type === 'golden');
    if (goldenCookiePresent) {
      setFavicon(goldenCookieFavicon);
    } else {
      setFavicon(defaultFavicon);
    }
  }, 1000); // Check interval in milliseconds
})();
