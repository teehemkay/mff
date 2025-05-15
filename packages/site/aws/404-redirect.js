function handler(event) {
  const uri = event.request.uri;
  const res = event.response;

  const languages = [
    'bg',
    'es',
    'cs',
    'da',
    'de',
    'et',
    'el',
    'en',
    'fr',
    'ga',
    'hr',
    'it',
    'lv',
    'lt',
    'hu',
    'mt',
    'nl',
    'pl',
    'pt',
    'ro',
    'sk',
    'fi',
    'sv',
  ];

  if (res.statusCode === '404') {
    let languageCode = '';

    for (let i = 0; i < languages.length; i++) {
      if (uri.startsWith(`/${languages[i]}/`)) {
        languageCode = languages[i];
        break;
      }
    }

    if (languageCode) {
      res.uri = `/${languageCode}/404/index.html`;
    } else {
      res.uri = '/404/index.html';
    }

    res.statusCode = '200';
    res.statusDescription = 'OK';
  }

  return res;
}
