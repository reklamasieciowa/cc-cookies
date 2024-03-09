const im = iframemanager();

im.run({
	onChange: ({ changedServices, eventSource }) => {
		if (eventSource.type === 'click') {
			const servicesToAccept = [
				...CookieConsent.getUserPreferences().acceptedServices['analytics'],
				...changedServices,
			];

			CookieConsent.acceptService(servicesToAccept, 'analytics');
		}
	},

	currLang: 'pl',
	autoLang: true,

	services: {
		youtube: {
			embedUrl: 'https://www.youtube-nocookie.com/embed/{data-id}',
			thumbnailUrl: 'https://i3.ytimg.com/vi/{data-id}/hqdefault.jpg',

			iframe: {
				allow:
					'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen;',
			},

			cookie: {
				name: 'cc_youtube',
			},

			languages: {
				pl: {
					notice:
						'Ten film pochodzi z YouTube.<br/>Zaakceptuj <a rel="noreferrer noopener" href="https://www.youtube.com/t/terms" target="_blank">warunki korzystania</a> z youtube.com.',
					loadBtn: 'Akceptuję, ale załaduj tylko ten film',
					loadAllBtn: 'Akceptuję, załaduj wszystkie filmy',
				},
				en: {
					notice:
						'This video is from YouTube. Accept <a rel="noreferrer noopener" href="https://www.youtube.com/t/terms" target="_blank">terms and conditions</a> of youtube.com.',
					loadBtn: 'Accept, but load this movie only',
					loadAllBtn: 'Accept, load all movies',
				},
			},
		},

		vimeo: {
			embedUrl: 'https://player.vimeo.com/video/{data-id}',

			iframe: {
				allow: 'fullscreen; picture-in-picture;',
			},

			cookie: {
				name: 'cc_vimeo',
			},

			thumbnailUrl: async (dataId, setThumbnail) => {
				const url = `https://vimeo.com/api/v2/video/${dataId}.json`;
				const response = await (await fetch(url)).json();
				const thumbnailUrl = response[0]?.thumbnail_large;
				thumbnailUrl && setThumbnail(thumbnailUrl);
			},

			languages: {
				pl: {
					notice:
						'Ten film  pochodzi z Vimeo.<br/>Zaakceptuj <a rel="noreferrer noopener" href="https://vimeo.com/terms" target="_blank">warunki korzystania</a> z vimeo.com.',
					loadBtn: 'Akceptuję, ale załaduj tylko ten film',
					loadAllBtn: 'Akceptuję, załaduj wszystkie filmy',
				},
				en: {
					notice:
						'This video is from Vimeo. Accept  <a rel="noreferrer noopener" href="https://vimeo.com/terms" target="_blank">terms and conditions</a> of vimeo.com.',
					loadBtn: 'Accept, but load this movie only',
					loadAllBtn: 'Accept, load all movies',
				},
			},
		},
	},
});

export function iframeManager() {
	return im;
}