export const MMC_MARKERS = ['mmc.html', 'multimedia.europarl.europa.eu'];
export const PLACEHOLDER_ID = 'consent-popup-placeholder';

// :: ((a -> b), (b -> c)) -> a -> c
export const pipe = (f, g) => (x) => g(f(x));

// :: type alias Selector = String
// :: Selector => ()
export const setFocus = (selector) => {
  document.querySelector(selector).focus();
};

// :: (Sector, String, String => ()
export const setDataAttribute = (selector, name, value) => {
  document.querySelector(selector).dataset[name] = value;
};

// :: () -> String
export const lang = () => {
  const { lang } = document.documentElement;
  return lang ? lang.slice(0, 2) : 'en';
};

// :: type alias Location = String
// :: type Context = {tag: String, attribute: String, extention: String}
// :: type alias Basename = String
// :: type SelectorBuilder = Context -> Basename -> Selector

// :: Location -> QueryString -> DOMElement
export const findAtLocation = (location) => (selector) =>
  document.querySelector(location).querySelector(selector);

// :: Selector -> DOMElement
export const findInHead = findAtLocation('head');

// :: Selector -> DOMElement
export const findInBody = findAtLocation('body');

// :: SelectorBuilder
export const fileBasedSelector =
  ({ tag, attribute, extension }) =>
  (basename) =>
    `${tag}[${attribute}*="${basename}${
      basename.endsWith(extension) ? '' : extension
    }"]`;

// :: Basename -> Selector
export const cssSelector = fileBasedSelector({
  tag: 'link',
  attribute: 'href',
  extension: '.css',
});

// :: Basename -> Selector
export const scriptSelector = fileBasedSelector({
  tag: 'script',
  attribute: 'src',
  extension: '.js',
});

// :: Basename -> DOMElement
export const findCssLink = pipe(cssSelector, findInHead);

// :: Basename -> DOMElement
export const findScriptInHead = pipe(scriptSelector, findInHead);

// :: Basename -> DOMElement
export const findScriptInBody = pipe(scriptSelector, findInBody);

export const findScript = (basename) =>
  findScriptInHead(basename) || findScriptInBody(basename);

export const scriptAttribute = (basename, attribute) => {
  const scriptElement = findScript(basename);
  return scriptElement && scriptElement.getAttribute(attribute);
};

export const scriptDataset = (basename) => {
  const scriptElement = findScript(basename);
  return scriptElement && scriptElement.dataset;
};

export const hasMarker = (markers, location) =>
  markers.some((item) => location.includes(item));

export const cssUrlSuffix = (location) =>
  hasMarker(MMC_MARKERS, location) ? '-mmc' : '';

export const cssUrlFromScript = (origin, destination) => {
  const dest = destination || origin;
  const basename = `${dest}${cssUrlSuffix(document.location.href)}`;

  const scriptElement = findScript(origin);

  return scriptElement
    ? scriptElement.src
        .split('/')
        .slice(0, -1)
        .concat(`${basename}.css`)
        .join('/')
    : null;
};

export const createCssLink = (url, onLoad, onError) => {
  // Creation de l'appel du fichier CSS
  const c = document.createElement('link');
  c.setAttribute('rel', 'stylesheet');
  c.setAttribute('type', 'text/css');
  c.setAttribute('href', url);
  // Ajout des evenements de chargement
  c.addEventListener('load', onLoad, false);
  c.addEventListener('error', onError, false);
  return c;
};

export const injectInHead = (cssLinkOrScript) => {
  document.querySelector('head').append(cssLinkOrScript);
};

export const trackerUrl = (basename) => {
  const script = findScript(basename);
  return script ? script.dataset.value : '';
};

export const trackerLoaded = (basename) => {
  const url = trackerUrl(basename);
  return url === '' ? false : findScriptInHead(url);
};

export const createTrackerScript = (url, className) => {
  const theNode = document.createElement('script');
  theNode.setAttribute('type', 'text/javascript');
  theNode.setAttribute('defer', '');
  theNode.setAttribute('src', url);
  theNode.setAttribute('class', 'tracker-node-' + className);
  return theNode;
};

export const injectTracker = (basename, className) => {
  const url = trackerUrl(basename);
  if (url === '' || findScript(url)) {
    return;
  }

  injectInHead(createTrackerScript(url, className));
};

export const removeElement = (selector) => {
  const tag = document.querySelector(selector);
  if (tag) {
    tag.remove();
  }
};

export const removeScript = (basename) => {
  const tasks = [findScriptInHead, findScriptInBody];
  for (const task of tasks) {
    const script = task(basename);
    if (script) {
      script.remove();
    }
  }
};

export const removeCssLink = (basename) => {
  const link = findCssLink(basename);
  if (link) {
    link.remove();
  }
};

export const removeScriptAndCss = (basename) => {
  const tasks = [
    [removeScript, basename],
    [removeCssLink, basename],
  ];

  for (const task of tasks) {
    task[0](task[1]);
  }
};

export const normalizedDomain = () => location.hostname;

export const insertPopupPlaceholder = () => {
  const placeholder = document.createElement('div');
  placeholder.setAttribute('id', PLACEHOLDER_ID);
  document.body.insertBefore(placeholder, document.body.firstChild);
};

export const insertPopupPlaceholderIfNeeded = () => {
  if (!findInBody(`#${PLACEHOLDER_ID}`)) {
    insertPopupPlaceholder();
  }
};

export const transitionEndEventName = () => {
  const bodyStyle = document.body.style;
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  return Object.keys(transitions).reduce(
    (acc, transition) =>
      acc === undefined && bodyStyle[transition] !== undefined
        ? transitions[transition]
        : acc,
    undefined
  );
};
