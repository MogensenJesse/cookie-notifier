// Cookie Notifier - Favicon switcher for golden and wrath cookies
// https://github.com/MogensenJesse/cookie-notifier

if(CookieNotifier === undefined) var CookieNotifier = {};
if(typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');

CookieNotifier.name = 'Cookie Notifier';
CookieNotifier.version = '1.1.0';
CookieNotifier.GameVersion = '2.058';

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

	if(CCSE.ConfirmGameVersion(CookieNotifier.name, CookieNotifier.version, CookieNotifier.GameVersion)) Game.registerMod(CookieNotifier.name, CookieNotifier);
}


if(!CookieNotifier.isLoaded){
	if(CCSE && CCSE.isLoaded){
		CookieNotifier.launch();
	}
	else{
		if(!CCSE) var CCSE = {};
		if(!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(CookieNotifier.launch);
	}
}
