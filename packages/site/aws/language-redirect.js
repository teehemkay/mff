function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Liste des langues supportées
  var languages = ['en']; // ajoute plus tard ['en', 'fr', 'es', ...]

  // Vérifie si le URI commence par une langue connue
  var match = uri.match(/^\/([a-z]{2})(\/|$)/);

  // do we have a language?
  var language = match ? match[1] : null;

  // Is it a known language?
  var isKnownLanguage = language && languages.includes(language);

  // Si langue détectée mais pas langue connue rediriger vers en
  if (language && !isKnownLanguage) {
    request.uri = uri.replace(language, 'en');
  }

  if (request.uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!request.uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
}
