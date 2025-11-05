// Cookie Notifier - Favicon switcher for golden and wrath cookies
// https://github.com/MogensenJesse/cookie-notifier

if(CookieNotifier === undefined) var CookieNotifier = {};

CookieNotifier.name = 'Cookie Notifier';
CookieNotifier.version = '1.1.0';
CookieNotifier.GameVersion = '2.052';

CookieNotifier.launch = function(){
	CookieNotifier.init = function(){
		CookieNotifier.isLoaded = 1;
		
		const defaultFavicon = 'https://orteil.dashnet.org/cookieclicker/img/favicon.ico';
		const goldenCookieFavicon = 'https://static.wikia.nocookie.net/cookieclicker/images/5/50/GoldCookie.png';
		const wrathCookieFavicon = 'https://cdn.dashnet.org/cookieclicker/img/wrathCookie.png';

		function setFavicon(url) {
			let link = document.querySelector("link[rel~='icon']");
			if (!link) {
				link = document.createElement('link');
				link.rel = 'icon';
				document.getElementsByTagName('head')[0].appendChild(link);
			}
			link.href = url;
		}

		CookieNotifier.faviconInterval = setInterval(() => {
			const goldenCookiePresent = Game.shimmers.some(shimmer => shimmer.type === 'golden');
			const wrathCookiePresent = Game.shimmers.some(shimmer => shimmer.type === 'wrath');
			
			if (wrathCookiePresent) {
				setFavicon(wrathCookieFavicon);
			} else if (goldenCookiePresent) {
				setFavicon(goldenCookieFavicon);
			} else {
				setFavicon(defaultFavicon);
			}
		}, 1000);
	};

	CookieNotifier.reset = function() {
		if (CookieNotifier.faviconInterval) {
			clearInterval(CookieNotifier.faviconInterval);
		}
		// Reset favicon on mod reset
		const defaultFavicon = '/favicon.ico';
		let link = document.querySelector("link[rel~='icon']");
		if (link) {
			link.href = defaultFavicon;
		}
	};

	// Register with CCSE if available for better mod manager compatibility
	if(typeof CCSE != 'undefined' && CCSE.isLoaded){
		CCSE.ConfirmGameVersion(CookieNotifier.name, CookieNotifier.version, CookieNotifier.GameVersion);
	}
	
	Game.registerMod(CookieNotifier.name, CookieNotifier);
};

// Prevent double-loading
if(!CookieNotifier.isLoaded){
	if(typeof CCSE != 'undefined' && CCSE.isLoaded){
		CookieNotifier.launch();
	}
	else{
		// Wait for CCSE to load if it's available
		if(typeof CCSE == 'undefined') var CCSE = {};
		if(!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(CookieNotifier.launch);
		
		// Fallback: register immediately if CCSE doesn't load within a reasonable time
		// This ensures the mod works even without CCSE
		setTimeout(function(){
			if(!CookieNotifier.isLoaded){
				CookieNotifier.launch();
			}
		}, 1000);
	}
}
