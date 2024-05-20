import './cookieconsent.umd.js';
import { iframeManager } from './iframemanager-config.js';
var im = iframeManager();
/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
window.onload = () => {

	CookieConsent.run({
		debug: window.location.href.search("[?&]ccdebug=") != -1,
		root: 'body',
		// autoShow: true,
		// disablePageInteraction: true,
		// hideFromBots: true,
		// mode: 'opt-in',
		revision: 1.0,

		cookie: {
			name: 'cc_cookie',
			// domain: location.hostname,
			// path: '/',
			// sameSite: "Lax",
			// expiresAfterDays: 365,
		},

		// https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
		guiOptions: {
			consentModal: {
				layout: 'box wide',
				position: 'middle center',
				equalWeightButtons: false,
				flipButtons: true
			},
			preferencesModal: {
				layout: 'box',
				equalWeightButtons: false,
				flipButtons: true
			}
		},

		onFirstConsent: ({ cookie }) => {
			if (CookieConsent.getConfig('debug')) {
				console.log('onFirstConsent fired', cookie);
			}

			sendCookieEvent();
		},

		onConsent: ({ cookie }) => {
			if (CookieConsent.getConfig('debug')) {
				console.log('onConsent fired!', cookie);
			}

			document.getElementById('show-preferencesModal').classList.remove('show-preferencesModal-hidden');
		},

		onChange: ({ changedCategories, changedServices }) => {
			if (CookieConsent.getConfig('debug')) {
				console.log('onChange fired!', changedCategories, changedServices);
			}

			sendCookieEvent();
		},

		onModalReady: ({ modalName }) => {
			if (CookieConsent.getConfig('debug')) {
				console.log('ready:', modalName);
			}
		},

		onModalShow: ({ modalName }) => {
			if (CookieConsent.getConfig('debug')) {
				console.log('visible:', modalName);
			}

			document.getElementById('show-preferencesModal').classList.add('show-preferencesModal-hidden');
		},

		onModalHide: ({ modalName }) => {
			if (CookieConsent.getConfig('debug')) {
				console.log('hidden:', modalName);
			}

			if(CookieConsent.validConsent()){
				document.getElementById('show-preferencesModal').classList.remove('show-preferencesModal-hidden');
			}
		},

		categories: {
			necessary: {
				enabled: true,  // this category is enabled by default
				readOnly: true  // this category cannot be disabled
			},
			analytics_storage: {
				autoClear: {
					cookies: [
						{
							name: /^_ga/,   // GA
						},
						{
							name: /^_gat/,   // GA
						},
						{
							name: '_gid',   // GA
						},
						{
							name: '__cf_bm', // vimeo
						},
						{
							name: 'vuid', // vimeo
						},
						{
							name: 'player', // vimeo
						}
					]
				},

				services: {
					youtube: {
					  label: 'Youtube Embed',
					  onAccept: () => im.acceptService('youtube'),
					  onReject: () => im.rejectService('youtube'),
					},
					vimeo: {
					  label: 'Vimeo Embed',
					  onAccept: () => im.acceptService('vimeo'),
					  onReject: () => im.rejectService('vimeo'),
					},
				},

				// https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
				// services: {
				//     ga: {
				//         label: 'Google Analytics',
				//         onAccept: () => {},
				//         onReject: () => {}
				//     },
				//     youtube: {
				//         label: 'Youtube Embed',
				//         onAccept: () => {},
				//         onReject: () => {}
				//     },
				// }
			},
			ad_storage: {
				autoClear: {
					cookies: [
						{
							name: '_fbp',
						},
						{
							name: 'fr',
						},
						{
							name: 'IDE',
						},
						{
							name: '_gcl_au',
						},
						{
							name: 'NID',
						},
						{
							name: 'RUL',
						}
					]
				},
			},
			ad_user_data: {},
			ad_personalization: {},
			functionality_storage: {},
			personalization_storage: {},
			security_storage: {
				enabled: true,  // this category is enabled by default
				readOnly: true  // this category cannot be disabled
			},
		},

		language: {
			default: 'pl',
			autoDetect: 'document',
			translations: {
				'pl': './cc/lang/pl.json', //Use absslute paths
				'en': './cc/lang/en.json' //Use absslute paths
			}
		}
	});

	const cookieSettingsButton = document.createElement('div');
	cookieSettingsButton.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><svg id="Warstwa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 355.51 370.64"><defs><style>.cls-1cc{fill:#513c07;}.cls-2cc{fill:#fcd25b;stroke:#050505;stroke-miterlimit:10;}</style></defs><path class="cls-2cc" d="M351.36,230.92c-6.66-5.83-13.48-11.47-20.22-17.19-5-4.24-10.12-8.36-14.97-12.78-9.08-8.28-8.98-23.25,.16-31.46,4.54-4.08,9.29-7.93,13.95-11.88,7.03-5.95,14.12-11.83,21.06-17.88,3.47-3.03,4.44-7.02,3.04-11.41-2.71-8.49-6.11-16.72-10.07-24.71-7.57-15.24-17.07-29.17-28.46-41.81-3.34-3.7-7.75-4.83-12.46-3.16-13.71,4.88-27.43,9.76-41.14,14.65-2.81,1-5.69,1.55-8.68,1.35-8.97-.62-15.44-5-19.11-13.2-.99-2.21-1.44-4.71-1.89-7.12-2.51-13.39-4.95-26.8-7.39-40.2-.96-5.28-4.06-8.71-9.04-9.66-4.49-.85-9-1.64-13.52-2.28-11.08-1.56-22.22-1.98-33.4-1.48-10.06,.45-20.01,1.74-29.88,3.74-4.74,.96-7.98,4.18-8.92,8.93-.62,3.16-1.18,6.33-1.76,9.49-2.07,11.33-4.07,22.68-6.22,33.99-2.47,13-15.42,20.72-28.07,16.8-3.21-1-6.36-2.21-9.54-3.34-11.02-3.92-22.03-7.89-33.07-11.74-4.63-1.61-8.78-.55-12.03,3.16-3.28,3.73-6.5,7.51-9.54,11.43-12.12,15.67-21.38,32.92-27.92,51.61-.64,1.84-1.36,3.7-1.63,5.62-.56,4.04,.99,7.34,4.1,9.96,11.04,9.31,22.06,18.65,33.1,27.97,2.37,2,4.34,4.32,5.77,7.09,4.47,8.61,2.62,19.38-4.62,25.86-4.49,4.01-9.16,7.81-13.75,11.7-6.87,5.81-13.74,11.62-20.62,17.42-2.64,2.22-4.04,5.03-4.13,8.64,.03,.38,.03,.93,.12,1.46,.11,.62,.26,1.24,.45,1.84,3.2,9.83,7.2,19.33,12.01,28.49,7.23,13.76,16.07,26.41,26.48,37.96,3.41,3.79,7.82,4.9,12.61,3.19,13.74-4.9,27.47-9.8,41.22-14.68,12.75-4.52,26.08,2.83,28.96,16.01,.88,4.05,1.53,8.16,2.27,12.24,1.93,10.56,3.84,21.13,5.8,31.68,.89,4.8,4.19,8.11,8.97,8.97,5.03,.91,10.07,1.79,15.13,2.47,10.64,1.43,21.34,1.76,32.06,1.27,9.94-.46,19.77-1.74,29.52-3.73,4.68-.95,8.06-4.29,8.9-8.85,2.21-12.01,4.38-24.02,6.61-36.03,.65-3.49,1.14-7.04,2.19-10.41,3.51-11.25,15.88-17.59,27.1-13.98,4.78,1.54,9.48,3.31,14.21,4.99,9.38,3.33,18.76,6.67,28.13,10.02,4.79,1.71,9.26,.67,12.6-3.17,3.18-3.66,6.33-7.34,9.3-11.17,12.97-16.74,22.68-35.22,29.23-55.35,1.41-4.35,.41-8.33-3.03-11.34Z"/><circle class="cls-1cc" cx="299.38" cy="114.52" r="24.56"/><circle class="cls-1cc" cx="177.36" cy="44.79" r="18.01"/><circle class="cls-1cc" cx="56.4" cy="114.4" r="21.22"/><circle class="cls-1cc" cx="58.07" cy="252.58" r="25.25"/><circle class="cls-1cc" cx="176.15" cy="325.85" r="21.22"/><circle class="cls-1cc" cx="301.65" cy="253.97" r="18.31"/><circle class="cls-1cc" cx="207.67" cy="126.65" r="18.01"/><circle class="cls-1cc" cx="119" cy="170.6" r="16.04"/><circle class="cls-1cc" cx="197.06" cy="228.96" r="23.04"/></svg>';
	cookieSettingsButton.id = "show-preferencesModal";
	cookieSettingsButton.classList.add('show-preferencesModal-hidden');
	cookieSettingsButton.dataset.cc = 'show-preferencesModal';
	document.body.appendChild(cookieSettingsButton);
};

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

function sendCookieEvent() {

	gtag('consent', 'update', {
		'ad_user_data': CookieConsent.acceptedCategory('ad_user_data') ? 'granted' : 'denied',
		'ad_personalization': CookieConsent.acceptedCategory('ad_personalization') ? 'granted' : 'denied',
		'ad_storage': CookieConsent.acceptedCategory('ad_storage') ? 'granted' : 'denied',
		'analytics_storage': CookieConsent.acceptedCategory('analytics_storage') ? 'granted' : 'denied',
		'personalization_storage': CookieConsent.acceptedCategory('personalization_storage') ? 'granted' : 'denied',
		'functionality_storage': CookieConsent.acceptedCategory('functionality_storage') ? 'granted' : 'denied',
		'security_storage': CookieConsent.acceptedCategory('security_storage') ? 'granted' : 'denied',
	});
	
	// An alternative method of sending consent to GTM via the AddCookieSetCallback callback after the CookiesSet event.
	// window.dataLayer = window.dataLayer || [];
	// dataLayer.push({
	// 	'event': 'CookiesSet'
	// });

	//let CookiesSetEvent = new CustomEvent('CookiesSet', { 'detail': CookieConsent.getCookie('categories') });

	//document.dispatchEvent(CookiesSetEvent);

	if (CookieConsent.getConfig('debug')) {
		console.log('sendCookieEvent with categories: ', CookieConsent.getCookie('categories'));
		console.log('analytics_storage: ' + CookieConsent.acceptedCategory('analytics_storage'));
		console.log('ad_storage: ' + CookieConsent.acceptedCategory('ad_storage'));
		console.log('ad_user_data: ' + CookieConsent.acceptedCategory('ad_user_data'));
		console.log('ad_personalization: ' + CookieConsent.acceptedCategory('ad_personalization'));
		console.log('personalization_storage: ' + CookieConsent.acceptedCategory('personalization_storage'));
		console.log('functionality_storage: ' + CookieConsent.acceptedCategory('functionality_storage'));
		console.log('security_storage: ' + CookieConsent.acceptedCategory('security_storage'));
	}
}

// An alternative method of sending consent to GTM via the AddCookieSetCallback callback after the CookiesSet event.
// window.AddCookieSetCallback = function (callback) {
// 	document.addEventListener('CookiesSet', function (event) {
// 		if (typeof callback == 'function' && event.detail) {
// 			callback(event.detail);
// 			if (CookieConsent.getConfig('debug')) {
// 				console.log('CookiesSet callback called with data:', event.detail);
// 			}
// 		} else {
// 			if (CookieConsent.getConfig('debug')) {
// 				console.log('Invalid data passed to CookiesSet callback:', event);
// 			}
// 		}
// 	});
// }