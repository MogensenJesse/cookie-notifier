Game.registerMod('FaviconGoldenCookie', {
  init: function() {
    const defaultFavicon = 'https://orteil.dashnet.org/cookieclicker/img/favicon.ico';
    const goldenCookieFavicon = 'https://static.wikia.nocookie.net/cookieclicker/images/5/50/GoldCookie.png';

    function setFavicon(url) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = url;
    }

    this.faviconInterval = setInterval(() => {
      const goldenCookiePresent = Game.shimmers.some(shimmer => shimmer.type === 'golden');
      if (goldenCookiePresent) {
        setFavicon(goldenCookieFavicon);
      } else {
        setFavicon(defaultFavicon);
      }
    }, 1000);
  },

  reset: function() {
    clearInterval(this.faviconInterval);
    // Reset favicon on mod reset
    const defaultFavicon = '/favicon.ico';
    let link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = defaultFavicon;
    }
  }
});
