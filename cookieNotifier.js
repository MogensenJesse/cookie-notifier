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

	if(typeof CCSE != 'undefined' && CCSE.ConfirmGameVersion){
		if(CCSE.ConfirmGameVersion(CookieNotifier.name, CookieNotifier.version, CookieNotifier.GameVersion)) Game.registerMod(CookieNotifier.name, CookieNotifier);
	}
	else{
		Game.registerMod(CookieNotifier.name, CookieNotifier);
	}
}


if(!CookieNotifier.isLoaded){
	if(CCSE && CCSE.isLoaded){
		CookieNotifier.launch();
	}
	else{
		// Wait for CCSE to load if it's available
		if(typeof CCSE == 'undefined') var CCSE = {};
		if(!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(CookieNotifier.launch);
		
		// Fallback: register immediately if Game is ready and CCSE doesn't load
		// This ensures the mod works even without CCSE or if CCSE loads too late
		if(typeof Game != 'undefined' && Game.ready){
			// Game is ready, register immediately
			setTimeout(function(){
				if(!CookieNotifier.isLoaded){
					CookieNotifier.launch();
				}
			}, 100);
		}
		else if(typeof Game != 'undefined'){
			// Wait for Game to be ready
			Game.registerHook('onload', function(){
				setTimeout(function(){
					if(!CookieNotifier.isLoaded){
						CookieNotifier.launch();
					}
				}, 100);
			});
		}
		else{
			// Game object doesn't exist yet, wait a bit longer
			setTimeout(function(){
				if(!CookieNotifier.isLoaded && typeof Game != 'undefined'){
					CookieNotifier.launch();
				}
			}, 1000);
		}
	}
}
