(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('privacy-policy', ['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bundle = {}));
})(this, (function (exports) { 'use strict';

  var SSR_NODE = 1;
  var TEXT_NODE = 3;
  var EMPTY_OBJ = {};
  var EMPTY_ARR = [];
  var SVG_NS = "http://www.w3.org/2000/svg";
  var id = a => a;
  var map = EMPTY_ARR.map;
  var isArray = Array.isArray;
  var enqueue = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : setTimeout;
  var createClass = obj => {
    var out = "";
    if (typeof obj === "string") return obj;
    if (isArray(obj)) {
      for (var k = 0, tmp; k < obj.length; k++) {
        if (tmp = createClass(obj[k])) {
          out += (out && " ") + tmp;
        }
      }
    } else {
      for (var k in obj) {
        if (obj[k]) out += (out && " ") + k;
      }
    }
    return out;
  };
  var shouldRestart = (a, b) => {
    for (var k in {
      ...a,
      ...b
    }) {
      if (typeof (isArray(a[k]) ? a[k][0] : a[k]) === "function") {
        b[k] = a[k];
      } else if (a[k] !== b[k]) return true;
    }
  };
  var patchSubs = (oldSubs, newSubs = EMPTY_ARR, dispatch) => {
    for (var subs = [], i = 0, oldSub, newSub; i < oldSubs.length || i < newSubs.length; i++) {
      oldSub = oldSubs[i];
      newSub = newSubs[i];
      subs.push(newSub && newSub !== true ? !oldSub || newSub[0] !== oldSub[0] || shouldRestart(newSub[1], oldSub[1]) ? [newSub[0], newSub[1], (oldSub && oldSub[2](), newSub[0](dispatch, newSub[1]))] : oldSub : oldSub && oldSub[2]());
    }
    return subs;
  };
  var getKey = vdom => vdom == null ? vdom : vdom.key;
  var patchProperty = (node, key, oldValue, newValue, listener, isSvg) => {
    if (key === "style") {
      for (var k in {
        ...oldValue,
        ...newValue
      }) {
        oldValue = newValue == null || newValue[k] == null ? "" : newValue[k];
        if (k[0] === "-") {
          node[key].setProperty(k, oldValue);
        } else {
          node[key][k] = oldValue;
        }
      }
    } else if (key[0] === "o" && key[1] === "n") {
      if (!((node.events || (node.events = {}))[key = key.slice(2)] = newValue)) {
        node.removeEventListener(key, listener);
      } else if (!oldValue) {
        node.addEventListener(key, listener);
      }
    } else if (!isSvg && key !== "list" && key !== "form" && key in node) {
      node[key] = newValue == null ? "" : newValue;
    } else if (newValue == null || newValue === false) {
      node.removeAttribute(key);
    } else {
      node.setAttribute(key, newValue);
    }
  };
  var createNode = (vdom, listener, isSvg) => {
    var props = vdom.props;
    var node = vdom.type === TEXT_NODE ? document.createTextNode(vdom.tag) : (isSvg = isSvg || vdom.tag === "svg") ? document.createElementNS(SVG_NS, vdom.tag, props.is && props) : document.createElement(vdom.tag, props.is && props);
    for (var k in props) {
      patchProperty(node, k, null, props[k], listener, isSvg);
    }
    for (var i = 0; i < vdom.children.length; i++) {
      node.appendChild(createNode(vdom.children[i] = maybeVNode(vdom.children[i]), listener, isSvg));
    }
    return vdom.node = node;
  };
  var patch = (parent, node, oldVNode, newVNode, listener, isSvg) => {
    if (oldVNode === newVNode) ; else if (oldVNode != null && oldVNode.type === TEXT_NODE && newVNode.type === TEXT_NODE) {
      if (oldVNode.tag !== newVNode.tag) node.nodeValue = newVNode.tag;
    } else if (oldVNode == null || oldVNode.tag !== newVNode.tag) {
      node = parent.insertBefore(createNode(newVNode = maybeVNode(newVNode), listener, isSvg), node);
      if (oldVNode != null) {
        parent.removeChild(oldVNode.node);
      }
    } else {
      var tmpVKid;
      var oldVKid;
      var oldKey;
      var newKey;
      var oldProps = oldVNode.props;
      var newProps = newVNode.props;
      var oldVKids = oldVNode.children;
      var newVKids = newVNode.children;
      var oldHead = 0;
      var newHead = 0;
      var oldTail = oldVKids.length - 1;
      var newTail = newVKids.length - 1;
      isSvg = isSvg || newVNode.tag === "svg";
      for (var i in {
        ...oldProps,
        ...newProps
      }) {
        if ((i === "value" || i === "selected" || i === "checked" ? node[i] : oldProps[i]) !== newProps[i]) {
          patchProperty(node, i, oldProps[i], newProps[i], listener, isSvg);
        }
      }
      while (newHead <= newTail && oldHead <= oldTail) {
        if ((oldKey = getKey(oldVKids[oldHead])) == null || oldKey !== getKey(newVKids[newHead])) {
          break;
        }
        patch(node, oldVKids[oldHead].node, oldVKids[oldHead], newVKids[newHead] = maybeVNode(newVKids[newHead++], oldVKids[oldHead++]), listener, isSvg);
      }
      while (newHead <= newTail && oldHead <= oldTail) {
        if ((oldKey = getKey(oldVKids[oldTail])) == null || oldKey !== getKey(newVKids[newTail])) {
          break;
        }
        patch(node, oldVKids[oldTail].node, oldVKids[oldTail], newVKids[newTail] = maybeVNode(newVKids[newTail--], oldVKids[oldTail--]), listener, isSvg);
      }
      if (oldHead > oldTail) {
        while (newHead <= newTail) {
          node.insertBefore(createNode(newVKids[newHead] = maybeVNode(newVKids[newHead++]), listener, isSvg), (oldVKid = oldVKids[oldHead]) && oldVKid.node);
        }
      } else if (newHead > newTail) {
        while (oldHead <= oldTail) {
          node.removeChild(oldVKids[oldHead++].node);
        }
      } else {
        for (var keyed = {}, newKeyed = {}, i = oldHead; i <= oldTail; i++) {
          if ((oldKey = oldVKids[i].key) != null) {
            keyed[oldKey] = oldVKids[i];
          }
        }
        while (newHead <= newTail) {
          oldKey = getKey(oldVKid = oldVKids[oldHead]);
          newKey = getKey(newVKids[newHead] = maybeVNode(newVKids[newHead], oldVKid));
          if (newKeyed[oldKey] || newKey != null && newKey === getKey(oldVKids[oldHead + 1])) {
            if (oldKey == null) {
              node.removeChild(oldVKid.node);
            }
            oldHead++;
            continue;
          }
          if (newKey == null || oldVNode.type === SSR_NODE) {
            if (oldKey == null) {
              patch(node, oldVKid && oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
              newHead++;
            }
            oldHead++;
          } else {
            if (oldKey === newKey) {
              patch(node, oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
              newKeyed[newKey] = true;
              oldHead++;
            } else {
              if ((tmpVKid = keyed[newKey]) != null) {
                patch(node, node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node), tmpVKid, newVKids[newHead], listener, isSvg);
                newKeyed[newKey] = true;
              } else {
                patch(node, oldVKid && oldVKid.node, null, newVKids[newHead], listener, isSvg);
              }
            }
            newHead++;
          }
        }
        while (oldHead <= oldTail) {
          if (getKey(oldVKid = oldVKids[oldHead++]) == null) {
            node.removeChild(oldVKid.node);
          }
        }
        for (var i in keyed) {
          if (newKeyed[i] == null) {
            node.removeChild(keyed[i].node);
          }
        }
      }
    }
    return newVNode.node = node;
  };
  var propsChanged = (a, b) => {
    for (var k in a) if (a[k] !== b[k]) return true;
    for (var k in b) if (a[k] !== b[k]) return true;
  };
  var maybeVNode = (newVNode, oldVNode) => newVNode !== true && newVNode !== false && newVNode ? typeof newVNode.tag === "function" ? ((!oldVNode || oldVNode.memo == null || propsChanged(oldVNode.memo, newVNode.memo)) && ((oldVNode = newVNode.tag(newVNode.memo)).memo = newVNode.memo), oldVNode) : newVNode : text("");
  var recycleNode = node => node.nodeType === TEXT_NODE ? text(node.nodeValue, node) : createVNode(node.nodeName.toLowerCase(), EMPTY_OBJ, map.call(node.childNodes, recycleNode), SSR_NODE, node);
  var createVNode = (tag, {
    key,
    ...props
  }, children, type, node) => ({
    tag,
    props,
    key,
    children,
    type,
    node
  });
  var text = (value, node) => createVNode(value, EMPTY_OBJ, EMPTY_ARR, TEXT_NODE, node);
  var h = (tag, {
    class: c,
    ...props
  }, children = EMPTY_ARR) => createVNode(tag, {
    ...props,
    ...(c ? {
      class: createClass(c)
    } : EMPTY_OBJ)
  }, isArray(children) ? children : [children]);
  var app = ({
    node,
    view,
    subscriptions,
    dispatch = id,
    init = EMPTY_OBJ
  }) => {
    var vdom = node && recycleNode(node);
    var subs = [];
    var state;
    var busy;
    var update = newState => {
      if (state !== newState) {
        if ((state = newState) == null) dispatch = subscriptions = render = id;
        if (subscriptions) subs = patchSubs(subs, subscriptions(state), dispatch);
        if (view && !busy) enqueue(render, busy = true);
      }
    };
    var render = () => node = patch(node.parentNode, node, vdom, vdom = view(state), listener, busy = false);
    var listener = function (event) {
      dispatch(this.events[event.type], event);
    };
    return (dispatch = dispatch((action, props) => typeof action === "function" ? dispatch(action(state, props)) : isArray(action) ? typeof action[0] === "function" ? dispatch(action[0], action[1]) : action.slice(1).map(fx => fx && fx !== true && (fx[0] || fx)(dispatch, fx[1]), update(action[0])) : update(action)))(init), dispatch;
  };

  const textify = x => typeof x === 'string' || typeof x === 'number' ? text(x) : x;
  const jsx = function (type, props) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }
    return typeof type === 'function' ? type(props, children) : h(type, props || {}, children.flat().map(textify));
  };

  const MMC_MARKERS = ['mmc.html', 'multimedia.europarl.europa.eu'];
  const PLACEHOLDER_ID = 'consent-popup-placeholder';

  // :: ((a -> b), (b -> c)) -> a -> c
  const pipe = (f, g) => x => g(f(x));

  // :: type alias Selector = String
  // :: Selector => ()
  const setFocus = selector => {
    document.querySelector(selector).focus();
  };

  // :: (Sector, String, String => ()
  const setDataAttribute = (selector, name, value) => {
    document.querySelector(selector).dataset[name] = value;
  };

  // :: () -> String
  const lang = () => {
    const {
      lang
    } = document.documentElement;
    return lang ? lang.slice(0, 2) : 'en';
  };

  // :: type alias Location = String
  // :: type Context = {tag: String, attribute: String, extention: String}
  // :: type alias Basename = String
  // :: type SelectorBuilder = Context -> Basename -> Selector

  // :: Location -> QueryString -> DOMElement
  const findAtLocation = location => selector => document.querySelector(location).querySelector(selector);

  // :: Selector -> DOMElement
  const findInHead = findAtLocation('head');

  // :: Selector -> DOMElement
  const findInBody = findAtLocation('body');

  // :: SelectorBuilder
  const fileBasedSelector = _ref => {
    let {
      tag,
      attribute,
      extension
    } = _ref;
    return basename => `${tag}[${attribute}*="${basename}${basename.endsWith(extension) ? '' : extension}"]`;
  };

  // :: Basename -> Selector
  const cssSelector = fileBasedSelector({
    tag: 'link',
    attribute: 'href',
    extension: '.css'
  });

  // :: Basename -> Selector
  const scriptSelector = fileBasedSelector({
    tag: 'script',
    attribute: 'src',
    extension: '.js'
  });

  // :: Basename -> DOMElement
  const findCssLink = pipe(cssSelector, findInHead);

  // :: Basename -> DOMElement
  const findScriptInHead = pipe(scriptSelector, findInHead);

  // :: Basename -> DOMElement
  const findScriptInBody = pipe(scriptSelector, findInBody);
  const findScript = basename => findScriptInHead(basename) || findScriptInBody(basename);
  const scriptDataset = basename => {
    const scriptElement = findScript(basename);
    return scriptElement && scriptElement.dataset;
  };
  const hasMarker = (markers, location) => markers.some(item => location.includes(item));
  const cssUrlSuffix = location => hasMarker(MMC_MARKERS, location) ? '-mmc' : '';
  const cssUrlFromScript = (origin, destination) => {
    const dest = origin;
    const basename = `${dest}${cssUrlSuffix(document.location.href)}`;
    const scriptElement = findScript(origin);
    return scriptElement ? scriptElement.src.split('/').slice(0, -1).concat(`${basename}.css`).join('/') : null;
  };
  const createCssLink = (url, onLoad, onError) => {
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
  const injectInHead = cssLinkOrScript => {
    document.querySelector('head').append(cssLinkOrScript);
  };
  const trackerUrl = basename => {
    const script = findScript(basename);
    return script ? script.dataset.value : '';
  };
  const createTrackerScript = (url, className) => {
    const theNode = document.createElement('script');
    theNode.setAttribute('type', 'text/javascript');
    theNode.setAttribute('defer', '');
    theNode.setAttribute('src', url);
    theNode.setAttribute('class', 'tracker-node-' + className);
    return theNode;
  };
  const injectTracker = (basename, className) => {
    const url = trackerUrl(basename);
    if (url === '' || findScript(url)) {
      return;
    }
    injectInHead(createTrackerScript(url, className));
  };
  const removeElement = selector => {
    const tag = document.querySelector(selector);
    if (tag) {
      tag.remove();
    }
  };
  const removeScript = basename => {
    const tasks = [findScriptInHead, findScriptInBody];
    for (const task of tasks) {
      const script = task(basename);
      if (script) {
        script.remove();
      }
    }
  };
  const normalizedDomain = () => location.hostname;
  const insertPopupPlaceholder = () => {
    const placeholder = document.createElement('div');
    placeholder.setAttribute('id', PLACEHOLDER_ID);
    document.body.insertBefore(placeholder, document.body.firstChild);
  };
  const insertPopupPlaceholderIfNeeded = () => {
    if (!findInBody(`#${PLACEHOLDER_ID}`)) {
      insertPopupPlaceholder();
    }
  };
  const transitionEndEventName = () => {
    const bodyStyle = document.body.style;
    const transitions = {
      transition: 'transitionend',
      OTransition: 'oTransitionEnd',
      MozTransition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd'
    };
    return Object.keys(transitions).reduce((acc, transition) => acc === undefined && bodyStyle[transition] !== undefined ? transitions[transition] : acc, undefined);
  };

  const slideIn = _ => ({
    displayed: true,
    dismissed: false
  });
  const slideOut = effecters => _ => [{
    displayed: false,
    dismissed: true
  }, [effecters]];
  const setListener = (dispatch, props) => {
    const element = findInBody(props.selector);
    const listener = event => requestAnimationFrame(() => dispatch(props.dispatchable, event));
    if (element) {
      element.addEventListener(props.type, listener);
      return () => element.removeEventListener(props.type, listener);
    }
    return () => {};
  };
  const removePopup = (dispatch, options) => {
    requestAnimationFrame(() => {
      removeElement(options.selector);
      dispatch(() => undefined);
    });
  };
  const removePopupFx = selector => [removePopup, {
    selector
  }];
  const setFocusOnElement = (/* dispatch */_, options) => {
    requestAnimationFrame(() => {
      setFocus(options.selector);
    });
  };
  const setFocusFx = selector => [setFocusOnElement, {
    selector
  }];

  /*! js-cookie v3.0.5 | MIT */
  /* eslint-disable no-var */
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  /* eslint-enable no-var */

  /* eslint-disable no-var */
  var defaultConverter = {
    read: function (value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function (value) {
      return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
    }
  };
  /* eslint-enable no-var */

  /* eslint-disable no-var */

  function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
      if (typeof document === 'undefined') {
        return;
      }
      attributes = assign({}, defaultAttributes, attributes);
      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += '; ' + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }
      return document.cookie = name + '=' + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
      if (typeof document === 'undefined' || arguments.length && !name) {
        return;
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e) {}
      }
      return name ? jar[name] : jar;
    }
    return Object.create({
      set,
      get,
      remove: function (name, attributes) {
        set(name, '', assign({}, attributes, {
          expires: -1
        }));
      },
      withAttributes: function (attributes) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function (converter) {
        return init(assign({}, this.converter, converter), this.attributes);
      }
    }, {
      attributes: {
        value: Object.freeze(defaultAttributes)
      },
      converter: {
        value: Object.freeze(converter)
      }
    });
  }
  var api = init(defaultConverter, {
    path: '/'
  });

  const OPTED_IN = 'in';
  const OPTED_OUT = 'out';
  const NO_CHOICE = 'choose';
  const JS_AND_CSS_BASENAME = 'privacy-policy';
  const domainTokens = {
    default: 'europarl'
  };

  /* globals define */


  // Cookie time to live: 13 months in days
  const COOKIE_TTL = 365 + 31;
  const COOKIE_INFO = {
    [domainTokens.default]: {
      name: 'europarlcookiepolicysagreement',
      optin: '1',
      optout: '0'
    }
  };
  const COOKIE_DATA = {};
  const cookie = prop => {
    if (!COOKIE_DATA.info) {
      COOKIE_DATA.info = COOKIE_INFO[scriptDataset(JS_AND_CSS_BASENAME).domainToken || domainTokens.default];
    }
    return COOKIE_DATA.info[prop];
  };
  const noop = () => {};
  const removeATICookies = () => {
    for (const cookie of ATICookies) {
      api.remove(cookie, {
        sameSite: 'strict'
      });
    }
  };
  const ATICookies = ['atidvisitor', 'atreman', 'atredir', 'atsession', 'atuserid', 'attvtreman', 'attvtsession', 'atwebosession'];
  const setCookie = value => {
    // The value of the cookie should be :
    // 1 : the visitor opted in
    // 0 : the visitor opted out
    api.set(cookie('name'), value, {
      expires: COOKIE_TTL,
      domain: normalizedDomain(),
      sameSite: 'strict'
    });
  };
  const optInFx = () => {
    setCookie(cookie('optin'));
    loadTrackers();
  };
  const optOutFx = () => {
    setCookie(cookie('optout'));
    cleanupTrackers();
  };
  const optedIn = () => api.get(cookie('name')) === cookie('optin');
  const optedOut = () => api.get(cookie('name')) === cookie('optout');
  const status = () => optedIn() ? OPTED_IN : optedOut() ? OPTED_OUT : NO_CHOICE;
  const cleanupTrackers = () => {
    removeScript(trackerUrl(JS_AND_CSS_BASENAME));
    removeATICookies();
  };
  const loadTrackers = () => {
    injectTracker(JS_AND_CSS_BASENAME, 'WEBA');
  };
  const fakeTrackerModuleFactory = () => ({
    staticinfography: noop,
    refresh: noop,
    scan: noop
  });
  const trackerModuleIdFromUrl = url => url.split('/').pop().split('.').shift();
  const registerTrackerAMDShim = () => {
    if (typeof define === 'function' && define.amd) {
      // Some feature (e.g. continuous loading, infographics depends depend on the trackers
      define(trackerModuleIdFromUrl(trackerUrl(JS_AND_CSS_BASENAME)), [], fakeTrackerModuleFactory);
    }
  };
  const handlers = {
    [OPTED_OUT]() {
      cleanupTrackers();
      registerTrackerAMDShim();
      console.log('Cookie consent: User does NOT want to be tracked.');
      return [OPTED_OUT, {
        optInFx,
        optOutFx
      }];
    },
    [OPTED_IN]() {
      loadTrackers();
      console.log('Cookie consent: User has opted in, trackers activated.');
      return [OPTED_IN, {
        optInFx,
        optOutFx
      }];
    },
    [NO_CHOICE]() {
      console.log('Cookie consent: User has not yet expressed choice.');
      return [NO_CHOICE, {
        optInFx,
        optOutFx
      }];
    }
  };
  const cookieHandler = () => handlers[status()]();

  const translations$1 = lang => data$1[lang] || data$1.en;
  const data$1 = {
    en: {
      lang: 'en',
      optOutDesc: 'Based on the information at our disposal, it seems you refused our analytics cookies. If you change your mind, you may activate the following choice:',
      optInLabel: 'I accept analytics cookies',
      optInDesc: 'Based on the information at our disposal, it seems you accepted our analytics cookies. If you change your mind, you may activate the following choice:',
      optOutLabel: 'I refuse analytics cookies',
      chooseDesc: 'Based on the information at our disposal, it seems you neither accepted nor refused our analytics cookies. Consequently, we did not place any on your device. Could you please explicitly express your choice?',
      dntDesc: 'Because you activated the "Do Not Track" (DNT) setting of your browser, we do not add any analytics cookie on your device. If you change your mind, please de-activate the DNT setting of your browser and refresh your cache.',
      ariaLabel: 'Managing cookies on this website'
    },
    uk: {
      lang: 'uk',
      optOutDesc: 'Згідно з доступною нам інформацією Ви прийняли наші аналітичні файли cookie. Якщо передумаєте, то можете активувати такий вибір:',
      optOutLabel: 'Я відмовляюся від аналітичних файлів cookie.',
      optInDesc: 'Згідно з доступною нам інформацією Ви відмовилися від наших аналітичних файлів cookie. Якщо передумаєте, то можете активувати такий вибір:',
      optInLabel: 'Я приймаю аналітичні файли cookie.',
      chooseDesc: 'Згідно з доступною нам інформацією Ви не прийняли та не відмовилися від наших аналітичних файлів cookie. Тому ми не розміщували їх на Вашому пристрої. Просимо Вас чітко визначитися та зробити свій вибір.',
      dntDesc: 'Оскільки у своєму браузері Ви активували налаштування «Не відстежувати» (DNT), ми не додаємо жодних аналітичних файлів cookie на Ваш пристрій. Якщо Ви передумаєте, будь ласка, деактивуйте налаштування DNT у своєму браузері та оновіть кеш.',
      ariaLabel: 'Управління файлами cookie на цьому вебсайті'
    },
    bg: {
      lang: 'bg',
      optOutDesc: 'Въз основа на информацията, с която разполагаме, изглежда сте отхвърлили нашите аналитични бисквитки. Ако промените решението си, можете да задействате следната опция:',
      optInLabel: 'Приемам аналитичните бисквитки',
      optInDesc: 'Въз основа на информацията, с която разполагаме, изглежда сте приели нашите аналитични бисквитки. Ако промените решението си, можете да задействате следната опция:',
      optOutLabel: 'Отхвърлям аналитичните бисквитки',
      chooseDesc: 'Въз основа на информацията, с която разполагаме, изглежда нито сте приели, нито сте отхвърлили нашите аналитични бисквитки. Съответно ние не сме поставили никакви бисквитки на Вашето устройство. Бихте ли могли да изразите своя избор изрично?',
      dntDesc: 'Тъй като задействахте настройката „Не проследявай“ (DNT) на Вашия браузър, не добавяме никакви аналитични бисквитки на Вашето устройство. Ако промените решението си, моля деактивирайте настройката DNT на Вашия браузър и актуализирайте паметта си.',
      ariaLabel: 'Управление на „бисквитките“ на уебсайта'
    },
    cs: {
      lang: 'cs',
      optOutDesc: 'Na základě informací, které máme k dispozici, se zdá, že nesouhlasíte se zasíláním našich analytických cookies. Pokud změníte názor, můžete aktivovat následující volbu:',
      optInLabel: 'Souhlasím se zasíláním analytických cookies',
      optInDesc: 'Na základě informací, které máme k dispozici, se zdá, že souhlasíte se zasíláním našich analytických cookies. Pokud změníte názor, můžete aktivovat následující volbu:',
      optOutLabel: 'Nesouhlasím se zasíláním analytických cookies',
      chooseDesc: 'Na základě informací, které máme k dispozici, se zdá, že jste neučinili žádné rozhodnutí ohledně zasílání analytických cookies. Proto jsme ve vašem zařízení žádné nepoužili. Vyjádřete prosím svůj výslovný souhlas nebo nesouhlas výběrem jedné z možností.',
      dntDesc: 'Jelikož jste ve svém prohlížeči aktivovali funkci „Do Not Track“ (DNT), nezaslali jsme do vašeho zařízení žádné analytické cookies. Pokud změníte názor, deaktivujte ve vašem prohlížeči funkci DNT a obnovte mezipaměť.',
      ariaLabel: 'Správa souborů cookie na těchto internetových stránkách'
    },
    da: {
      lang: 'da',
      optOutDesc: 'Ud fra de oplysninger, vi har til rådighed, har du tilsyneladende afvist vores analysecookies. Hvis du skifter mening, kan du vælge følgende:',
      optInLabel: 'Jeg accepterer analysecookies',
      optInDesc: 'Ud fra de oplysninger, vi har til rådighed, har du tilsyneladende accepteret vores analysecookies. Hvis du skifter mening, kan du vælge følgende:',
      optOutLabel: 'Jeg afviser analysecookies',
      chooseDesc: 'Ud fra de oplysninger, vi har til rådighed, har du tilsyneladende hverken accepteret eller afvist vores analysecookies. Derfor har vi ikke placeret nogen på din enhed. Du bedes udtrykkeligt angive, hvilket valg du har truffet.',
      dntDesc: 'Da du har aktiveret din browsers "Do Not Track"-indstilling (spor mig ikke), tilføjer vi ikke nogen analysecookies på din enhed. Hvis du skifter mening, bedes du deaktivere din browsers "Do Not Track"-indstilling og opdatere din cache.',
      ariaLabel: 'Administration af cookies på dette websted'
    },
    de: {
      lang: 'de',
      optOutDesc: 'Anhand der vorliegenden Informationen haben Sie die Verwendung von Analyse-Cookies des Europäischen Parlaments abgelehnt. Wenn Sie Ihre Meinung ändern, können Sie das folgende Kontrollkästchen aktivieren:',
      optInLabel: 'Analyse-Cookies akzeptieren',
      optInDesc: 'Anhand der vorliegenden Informationen haben Sie die Verwendung von Analyse-Cookies des Europäischen Parlaments akzeptiert. Wenn Sie Ihre Meinung ändern, können Sie das folgende Kontrollkästchen aktivieren:',
      optOutLabel: 'Analyse-Cookies ablehnen',
      chooseDesc: 'Anhand der vorliegenden Informationen haben Sie die Verwendung von Analyse-Cookies des Europäischen Parlaments weder akzeptiert noch abgelehnt. Dementsprechend hat das Europäische Parlament keine Cookies auf Ihrem Gerät gesetzt. Bitte treffen Sie hier ausdrücklich eine Auswahl:',
      dntDesc: 'Da Sie in Ihrem Browser die Einstellung „Do Not Track“ (DNT, „nicht verfolgen“) aktiviert haben, setzt das Europäische Parlament auf Ihrem Gerät keine Analyse-Cookies. Wenn Sie Ihre Meinung ändern, müssen Sie in Ihrem Browser die DNT-Einstellung deaktivieren und den Cache aktualisieren.',
      ariaLabel: 'Verwaltung von Cookies auf dieser Website'
    },
    el: {
      lang: 'el',
      optOutDesc: 'Με βάση τις πληροφορίες που έχουμε στη διάθεσή μας, φαίνεται ότι αρνηθήκατε τα cookies ανάλυσής μας. Εάν αλλάξετε γνώμη, μπορείτε να ενεργοποιήσετε την ακόλουθη επιλογή:',
      optInLabel: 'Αποδέχομαι τα cookies ανάλυσης',
      optInDesc: 'Με βάση τις πληροφορίες που έχουμε στη διάθεσή μας, φαίνεται ότι αποδεχθήκατε τα cookies ανάλυσής μας. Εάν αλλάξετε γνώμη, μπορείτε να ενεργοποιήσετε την ακόλουθη επιλογή:',
      optOutLabel: 'Απορρίπτω τα cookies ανάλυσης',
      chooseDesc: 'Με βάση τις πληροφορίες που έχουμε στη διάθεσή μας, φαίνεται ότι ούτε αποδεχθήκατε ούτε αρνηθήκατε τα cookies ανάλυσής μας. Κατά συνέπεια, δεν τοποθετήσαμε κανένα στη συσκευή σας. Θα θέλατε να δηλώσετε ρητά την επιλογή σας;',
      dntDesc: 'Επειδή ενεργοποιήσατε τη ρύθμιση «Do Not Track» (DNT) («Μην παρακολουθείτε») στον φυλλομετρητή σας, δεν προσθέτουμε κανένα cookie ανάλυσης στη συσκευή σας. Εάν αλλάξετε γνώμη, απενεργοποιήστε τη ρύθμιση DNT του φυλλομετρητή σας και ανανεώστε την κρυφή μνήμη σας.',
      ariaLabel: 'Διαχείριση των cookies στον παρόντα ιστότοπο'
    },
    es: {
      lang: 'es',
      optOutDesc: 'Según la información de que disponemos, parece que usted aceptó nuestras cookies de análisis. Si cambia de opinión, puede activar la siguiente opción:',
      optInLabel: 'Acepto las cookies de análisis',
      optInDesc: 'Según la información de que disponemos, parece que usted rechazó nuestras cookies de análisis. Si cambia de opinión, puede activar la siguiente opción:',
      optOutLabel: 'Rechazo las cookies de análisis',
      chooseDesc: 'Según la información de que disponemos, parece que usted no aceptó ni rechazó nuestras cookies de análisis. Por lo tanto, no colocamos ninguna en su dispositivo. ¿Podría expresar explícitamente su elección?',
      dntDesc: 'Al activar usted la configuración de «No realizar seguimiento» de su navegador, no añadimos ninguna cookie de análisis en su dispositivo. Si cambia de opinión, lo rogamos desactive la configuración de «No realizar seguimiento» de su navegador y actualice la memoria caché.',
      ariaLabel: 'Gestión de cookies de este sitio web'
    },
    et: {
      lang: 'et',
      optOutDesc: 'Meie käsutuses oleva teabe põhjal tundub, et keeldusite meie analüüsiküpsistest. Kui otsustate siiski analüüsiküpsistega nõustuda, võite aktiveerida järgmise valiku:',
      optInLabel: 'Nõustun analüüsiküpsistega',
      optInDesc: 'Meie käsutuses oleva teabe põhjal tundub, et nõustusite meie analüüsiküpsistega. Kui otsustate siiski analüüsiküpsistest keelduda, võite aktiveerida järgmise valiku:',
      optOutLabel: 'Keeldun analüüsiküpsistest',
      chooseDesc: 'Meie käsutuses oleva teabe põhjal tundub, et te ei nõustunud meie analüüsiküpsistega ega ka ei keeldunud neist. Seetõttu ei paigaldanud me teie seadmele küpsiseid. Palun väljendage oma valikut selgesõnaliselt.',
      dntDesc: 'Kuna aktiveerisite oma veebilehitsejas seade „Do Not Track“ (DNT), ei paigalda Euroopa Parlament teie seadmesse ühtegi analüüsiküpsist. Kui otsustate siiski küpsistega nõustuda, siis deaktiveerige oma veebilehitseja DNT seade ja värskendage vahemälu.',
      ariaLabel: 'Küpsiste haldamine'
    },
    fi: {
      lang: 'fi',
      optOutDesc: 'Käytettävissämme olevien tietojen mukaan olet estänyt analytiikkaevästeemme. Jos muutat mieltäsi, voit valita seuraavan vaihtoehdon:',
      optInLabel: 'Hyväksyn analytiikkaevästeet',
      optInDesc: 'Käytettävissämme olevien tietojen mukaan olet sallinut analytiikkaevästeemme. Jos muutat mieltäsi, voit valita seuraavan vaihtoehdon:',
      optOutLabel: 'En hyväksy analytiikkaevästeitä',
      chooseDesc: 'Käytettävissämme olevien tietojen mukaan et ole sallinut etkä estänyt analytiikkaevästeitämme. Näin ollen emme asettaneet niitä laitteellesi. Ilmoita, kumman vaihtoehdon valitset:',
      dntDesc: 'Koska olet ottanut seuraamisenestoasetuksen (”Do Not Track”) käyttöön selaimessasi, emme lisää laitteellesi analytiikkaevästeitä. Jos muutat mieltäsi, ota DNT-asetus pois käytöstä selaimessasi ja päivitä välimuisti.',
      ariaLabel: 'Evästeiden hallinta tällä sivustolla'
    },
    fr: {
      lang: 'fr',
      optOutDesc: 'Sur la base des informations dont nous disposons, il semble que vous ayez refusé nos cookies analytiques. Si vous changez d’avis, vous pouvez activer le choix suivant:',
      optInLabel: 'J’accepte les cookies analytiques',
      optInDesc: 'Sur la base des informations dont nous disposons, il semble que vous ayez accepté nos cookies analytiques. Si vous changez d’avis, vous pouvez activer le choix suivant:',
      optOutLabel: 'Je refuse les cookies analytiques',
      chooseDesc: 'Sur la base des informations dont nous disposons, il semble que vous n’ayez ni accepté ni refusé nos cookies analytiques. Par conséquent, nous n’avons installé aucun cookie sur votre appareil. Pourriez-vous exprimer votre choix?',
      dntDesc: 'Comme vous avez activé la fonctionnalité «Ne pas suivre» de votre navigateur, nous n’installons aucun cookie analytique sur votre appareil. Si vous changez d’avis, vous pouvez désactiver la fonctionnalité «Ne pas suivre» de votre navigateur et rafraîchir la mémoire cache.',
      ariaLabel: 'Gérer les cookies'
    },
    ga: {
      lang: 'ga',
      optOutDesc: 'Bunaithe ar an bhfaisnéis atá ar fáil againn, is cosúil gur dhiúltaigh tú ár bhfianáin anailisíochta. Má athraíonn tú d’intinn, féadfaidh tú an rogha seo a leanas a ghníomhachtú:',
      optInLabel: 'Glacaim le fianáin anailísíochta',
      optInDesc: 'Bunaithe ar an bhfaisnéis atá ar fáil againn, is cosúil gur ghlac tú lenár bhfianáin anailisíochta. Má athraíonn tú d’intinn, féadfaidh tú an rogha seo a leanas a ghníomhachtú:',
      optOutLabel: 'Diúltaím fianáin anailísíochta',
      chooseDesc: 'Bunaithe ar an bhfaisnéis atá ar fáil againn, is cosúil nár ghlac tú lenár bhfianáin anailisíochta nó nár dhiúltaigh tú iad. Dá bhrí sin, níl aon fhianáin suiteáilte againn ar do ghléas. An bhféadfá do rogha a chur in iúl?',
      dntDesc: 'De bharr gur ghníomhaigh tú an socrú “Ná Rianaigh” (DNT) ar do bhrabhsálaí, ní chuireann Parlaimint na hEorpa aon fhianáin anailísíochta le do ghléas. Má athraíonn tú d’intinn, déan socrú DNT do bhrabhsálaí a dhíghníomhachtú agus do thaisce a athnuachan.',
      ariaLabel: 'Fianáin a bhainistiú ar an suíomh gréasáin seo'
    },
    hr: {
      lang: 'hr',
      optOutDesc: 'Na temelju informacija kojima raspolažemo, zaključujemo da ste odbili analitičke kolačiće. Ako se predomislite, možete odabrati jednu od sljedećih mogućnosti:',
      optInLabel: 'Prihvaćam analitičke kolačiće',
      optInDesc: 'Na temelju informacija kojima raspolažemo, zaključujemo da ste prihvatili analitičke kolačiće. Ako se predomislite, možete odabrati jednu od sljedećih mogućnosti:',
      optOutLabel: 'Ne prihvaćam analitičke kolačiće',
      chooseDesc: 'Na temelju informacija kojima raspolažemo, zaključujemo da niste ni prihvatili ni odbili analitičke kolačiće. U skladu s time na vaš uređaj nisu pohranjeni kolačići. Molimo vas da se izjasnite',
      dntDesc: 'Budući da ste aktivirali opciju „Do Not Track” u svome pregledniku, na vaš uređaj ne dodajemo analitičke kolačiće. Ako se predomislite, deaktivirajte opciju „Do Not Track” u svome pregledniku i osvježite predmemoriju.',
      ariaLabel: 'Upravljanje kolačićima na ovoj stranici'
    },
    hu: {
      lang: 'hu',
      optOutDesc: 'A rendelkezésünkre álló információk alapján úgy tűnik, hogy Ön elutasította elemzési célú sütijeinket. Ha meggondolja magát, aktiválhatja a következő opciót:',
      optInLabel: 'Elfogadom az elemzési célú sütiket',
      optInDesc: 'A rendelkezésünkre álló információk alapján úgy tűnik, hogy Ön elfogadta elemzési célú sütijeinket. Ha meggondolja magát, aktiválhatja a következő opciót:',
      optOutLabel: 'Elutasítom az elemzési célú sütiket',
      chooseDesc: 'A rendelkezésünkre álló információk alapján úgy tűnik, hogy Ön se nem fogadta el, se nem utasította el elemzési célú sütijeinket. Ezért a készülékén nem helyeztünk el sütit. Kérjük, szíveskedjen kifejezetten jelezni választását.',
      dntDesc: 'Mivel aktiválta böngészőjének nyomon követést tiltó (DNT) beállítását, nem adunk hozzá elemzési célú sütiket az eszközéhez. Ha meggondolja magát, kérjük, oldja fel böngészője DNT-beállítását, és frissítse a gyorsítótárat.',
      ariaLabel: 'Sütik kezelése a weblapon'
    },
    it: {
      lang: 'it',
      optOutDesc: 'Sulla base delle informazioni a nostra disposizione, sembra che tu abbia rifiutato i nostri cookie analitici. Se cambi idea, puoi attivare la seguente scelta:',
      optInLabel: 'Accetto i cookie analitici',
      optInDesc: 'Sulla base delle informazioni a nostra disposizione, sembra che tu abbia accettato i nostri cookie analitici. Se cambi idea, puoi attivare la seguente scelta:',
      optOutLabel: 'Rifiuto i cookie analitici',
      chooseDesc: 'Sulla base delle informazioni a nostra disposizione, sembra che tu non abbia né accettato né rifiutato i nostri cookie analitici. Pertanto, non abbiamo installato alcun cookie sul tuo dispositivo. Ti preghiamo di esplicitare la tua scelta.',
      dntDesc: "Poiché hai attivato l'impostazione antitracciamento sul tuo browser, non installiamo alcun cookie analitico sul tuo dispositivo. Se cambi idea, puoi disattivare l'impostazione antitracciamento del tuo browser e aggiornare la memoria cache.",
      ariaLabel: 'Gestione dei cookie su questo sito web'
    },
    lt: {
      lang: 'lt',
      optOutDesc: 'Remiantis turima informacija panašu, jog nesutikote, kad būtų naudojami analitiniai slapukai. Jei apsigalvosite, galite aktyvuoti šį pasirinkimą:',
      optInLabel: 'Sutinku, kad būtų naudojami analitiniai slapukai',
      optInDesc: 'Remiantis turima informacija panašu, jog sutikote, kad būtų naudojami analitiniai slapukai. Jei apsigalvosite, galite aktyvuoti šį pasirinkimą:',
      optOutLabel: 'Nesutinku, kad būtų naudojami analitiniai slapukai',
      chooseDesc: 'Remiantis turima informacija panašu, kad jūs nei davėte sutikimą naudoti analitinius slapukus, nei atsisakėte, kad jie būtų naudojami. Todėl jūsų įrenginyje jų nenaudojame. Ar galėtumėte aiškiai nurodyti, ką pasirinkate?',
      dntDesc: 'Kadangi aktyvavote naršyklės nuostatą „Nesekti“ (DNT), į jūsų įrenginį nededame analitinių slapukų. Jei persigalvojate, savo naršyklėje išjunkite nuostatą DNT ir atnaujinkite atmintinę.',
      ariaLabel: 'Slapukų tvarkymas šioje svetainėje'
    },
    lv: {
      lang: 'lv',
      optOutDesc: 'Pamatojoties uz mūsu rīcībā esošo informāciju, šķiet, ka jūs noraidījāt mūsu analītiskās sīkdatnes. Ja pārdomājat, varat aktivizēt šādu izvēli:',
      optInLabel: 'Es piekrītu analītisko sīkdatņu izmantošanai',
      optInDesc: 'Pamatojoties uz mūsu rīcībā esošo informāciju, šķiet, ka jūs piekritāt mūsu analītisko sīkdatņu izmantošanai. Ja pārdomājat, varat aktivizēt šādu izvēli:',
      optOutLabel: 'Es atsakos no analītiskajām sīkdatnēm',
      chooseDesc: 'Pamatojoties uz mūsu rīcībā esošo informāciju, šķiet, ka jūs nedz atteicāties no mūsu analītisko sīkdatņu izmantošanas, nedz piekritāt to izmantošanai. Līdz ar to mēs jūsu ierīcē tās neizmantojam. Vai jūs, lūdzu, varētu skaidri paust savu izvēli?',
      dntDesc: 'Tā kā savā pārlūkprogramma jūs aktivizējāt iestatījumu “Nesekot” (DNT), mēs jūsu ierīcei nepievienojam nevienu analītisko sīkdatni. Ja pārdomājat, deaktivizējiet pārlūkprogrammas DNT iestatījumu un atsvaidziniet kešatmiņu.',
      ariaLabel: 'Šajā tīmekļa vietnē izmantoto sīkdatņu pārvaldība'
    },
    mt: {
      lang: 'mt',
      optOutDesc: "Fuq il-bażi tal-informazzjoni għad-dispożizzjoni tagħna, jidher li inti rrifjutat il-cookies analitiċi tagħna. Jekk tbiddel fehmtek, tista' tattiva l-għażla li ġejja:",
      optInLabel: 'Naċċetta l-cookies analitiċi',
      optInDesc: "Fuq il-bażi tal-informazzjoni għad-dispożizzjoni tagħna, jidher li inti aċċettajt il-cookies analitiċi tagħna. Jekk tbiddel fehmtek, tista' tattiva l-għażla li ġejja:",
      optOutLabel: 'Nirrifjuta l-cookies analitiċi ',
      chooseDesc: "Fuq il-bażi tal-informazzjoni għad-dispożizzjoni tagħna, jidher li inti rrifjutajt il-cookies analitiċi tagħna. Konsegwentement, ma qegħidniex cookies fuq l-apparat tiegħek. Tista' jekk jogħġbok tesprimi b'mod espliċitu l-għażla tiegħek?",
      dntDesc: 'Minħabba li attivajt il-konfigurazzjoni "Do Not Track" (DNT) tal-brawżer tiegħek, mhux se nżidu cookies analitiċi fuq l-apparat tiegħek. Jekk tbiddel fehmtek, jekk jogħġbok iddiżattiva l-konfigurazzjoni tad-DNT tal-brawżer tiegħek u aġġorna l-memorja tal-cache tiegħek.',
      ariaLabel: "Cookies f'dan is-sit"
    },
    nl: {
      lang: 'nl',
      optOutDesc: 'Volgens de informatie waarover wij beschikken, heeft u onze analytische cookies geweigerd. Als u van mening verandert, kunt u de volgende optie activeren:',
      optInLabel: 'Ik accepteer analytische cookies',
      optInDesc: 'Volgens de informatie waarover wij beschikken, heeft u onze analytische cookies geaccepteerd. Als u van mening verandert, kunt u de volgende optie activeren:',
      optOutLabel: 'Ik weiger analytische cookies',
      chooseDesc: 'Volgens de informatie waarover wij beschikken, heeft u onze analytische cookies noch geaccepteerd, nog geweigerd. We hebben dan ook geen cookies op uw apparaat geplaatst. Kunt u uw keuze uitdrukkelijke bevestigen?',
      dntDesc: 'Omdat u de “Do Not Track”-optie in uw browser heeft ingeschakeld, plaatsen we geen analytische cookies op uw apparaat. Als u van mening verandert, gelieve dan de “Do Not Track”-optie in uw browser uit te schakelen en het cachegeheugen te wissen.',
      ariaLabel: 'Cookiebeheer voor deze website'
    },
    pl: {
      lang: 'pl',
      optOutDesc: 'Na podstawie informacji, którymi dysponujemy, wydaje się, że nie zgadzasz się na stosowanie analitycznych plików cookie. Jeśli zmienisz zdanie, możesz dokonać następującego wyboru:',
      optInLabel: 'Zgadzam się na stosowanie analitycznych plików cookie',
      optInDesc: 'Na podstawie informacji, którymi dysponujemy, wydaje się, że zgadzasz się na stosowanie analitycznych plików cookie. Jeśli zmienisz zdanie, możesz dokonać następującego wyboru:',
      optOutLabel: 'Nie zgadzam się na stosowanie analitycznych plików cookie',
      chooseDesc: 'Na podstawie informacji, którymi dysponujemy, wydaje się, że nie dokonałeś wyboru w odniesieniu do stosowania analitycznych plików cookie. W związku z tym nie dodaliśmy żadnych analitycznych plików cookie do twojego urządzenia. Czy możesz dokonać wyraźnego wyboru?',
      dntDesc: 'W związku z włączeniem funkcji „Bez śledzenia” w twojej przeglądarce nie dodajemy żadnego analitycznego pliku cookie do twojego urządzenia. W przypadku zmiany zdania proszę wyłączyć funkcję „Bez śledzenia” w ustawieniach przeglądarki i odświeżyć pamięć podręczną.',
      ariaLabel: 'Zarządzanie plikami cookie na tej stronie'
    },
    pt: {
      lang: 'pt',
      optOutDesc: 'Segundo a informação de que dispomos, parece ter recusado os nossos cookies analíticos. Se mudar de ideias, poderá ativar a seguinte escolha:',
      optInLabel: 'Aceito cookies analíticos',
      optInDesc: 'Segundo a informação de que dispomos, parece ter aceite os nossos cookies analíticos. Se mudar de ideias, poderá ativar a seguinte escolha:',
      optOutLabel: 'Recuso cookies analíticos',
      chooseDesc: 'Segundo a informação de que dispomos, parece não ter aceite nem recusado os nossos cookies analíticos. Como tal, não instalámos nenhum cookie analítico no seu dispositivo. Pode indicar explicitamente a sua escolha?',
      dntDesc: 'Uma vez que ativou a opção «não monitorizar» (Do Not Track - DNT) do seu navegador, não instalámos nenhum cookie analítico no seu dispositivo. Se mudar de ideias, desative a opção de DNT do seu navegador e atualize a cache.',
      ariaLabel: 'Gestão de cookies neste website'
    },
    ro: {
      lang: 'ro',
      optOutDesc: 'Pe baza informațiilor de care dispunem, se pare că ați refuzat cookie-urile noastre de analiză. Dacă vă răzgândiți, puteți activa următoarea opțiune:',
      optInLabel: 'Accept cookie-urile de analiză',
      optInDesc: 'Pe baza informațiilor de care dispunem, se pare că ați acceptat cookie-urile noastre de analiză. Dacă vă răzgândiți, puteți activa următoarea opțiune:',
      optOutLabel: 'Refuz cookie-urile de analiză',
      chooseDesc: 'Pe baza informațiilor de care dispunem, se pare că nu ați acceptat și nici nu ați refuzat cookie-urile noastre de analiză. Prin urmare, nu am folosit niciun cookie pe dispozitivul dvs. Vă rugăm să vă exprimați în mod explicit opțiunea.',
      dntDesc: 'Deoarece ați activat setarea „Do Not Track” (DNT) a browserului, nu adăugăm niciun cookie de analiză pe dispozitivul dvs. Dacă vă răzgândiți, vă rugăm să dezactivați setarea DNT a browserului dvs. și să actualizați memoria cache.',
      ariaLabel: 'Gestionarea cookie-urilor pe acest site'
    },
    sk: {
      lang: 'sk',
      optOutDesc: 'Na základe nám dostupných informácií ste odmietli používanie analytických súborov cookie. Ak zmeníte názor, môžete aktivovať ich používanie kliknutím na:',
      optInLabel: 'Súhlasím s používaním analytických súborov cookie.',
      optInDesc: 'Na základe nám dostupných informácií ste súhlasili s používaním analytických súborov cookie. Ak zmeníte názor, môžete deaktivovať ich používanie kliknutím na:',
      optOutLabel: 'Nesúhlasím s používaním analytických súborov cookie.',
      chooseDesc: 'Na základe nám dostupných informácií ste neurobili žiadne rozhodnutie týkajúce sa používania analytických súborov cookie. Preto na vašom zariadení nebudú použité. Vyjadrite svoj výslovný súhlas alebo nesúhlas výberom jednej z možností:',
      dntDesc: 'Keďže ste si v prehliadači aktivovali nastavenie „Do Not Track“ (DNT – nesledovať), Európsky parlament do vášho zariadenia žiadne analytické súbory cookie neposiela. Ak zmeníte názor, v prehliadači si deaktivujte nastavenie DNT a obnovte vyrovnávaciu pamäť.',
      ariaLabel: 'Spravovanie súborov cookie na tomto webovom sídle'
    },
    sl: {
      lang: 'sl',
      optOutDesc: 'Na podlagi razpoložljivih informacij sklepamo, da ste zavrnili naše analitične piškotke. Če si premislite, lahko aktivirate naslednjo nastavitev:',
      optInLabel: 'Sprejmi analitične piškotke',
      optInDesc: 'Na podlagi razpoložljivih informacij sklepamo, da ste sprejeli naše analitične piškotke. Če si premislite, lahko aktivirate naslednjo nastavitev:',
      optOutLabel: 'Zavrni analitične piškotke',
      chooseDesc: 'Na podlagi razpoložljivih informacij sklepamo, da niste niti sprejeli niti zavrnili naših analitičnih piškotkov. Na vašo napravo zato nismo namestili nobenih piškotkov. Prosimo vas, da izrecno navedete svojo izbiro.',
      dntDesc: 'Ker ste aktivirali nastavitev brskalnika „Ne sledi“ (DNT), na vašo napravo ne bomo dodali analitičnih piškotkov. Če si premislite, morate v brskalniku deaktivirati nastavitev DNT in osvežiti predpomnilnik.',
      ariaLabel: 'Upravljanje piškotkov na tem spletišču'
    },
    sv: {
      lang: 'sv',
      optOutDesc: 'Utifrån den information vi har tycks du ha valt att avvisa våra analytiska kakor. Om du ändrar dig kan du aktivera följande alternativ:',
      optInLabel: 'Jag godkänner analytiska kakor',
      optInDesc: 'Utifrån den information vi har tycks du ha valt att godkänna våra analytiska kakor. Om du ändrar dig kan du aktivera följande alternativ:',
      optOutLabel: 'Jag avvisar analytiska kakor',
      chooseDesc: 'Utifrån den information vi har tycks du varken ha godkänt eller avvisat våra analytiska kakor. Vi har därför inte placerat några sådana kakor på din enhet. Vänligen ange uttryckligen ditt val',
      dntDesc: 'Eftersom du har aktiverat ”Spåra inte”-inställningen i din webbläsare har vi inte placerat några analytiska kakor på din enhet. Om du ändrar dig kan du avaktivera ”Spåra inte”-inställningen i din webbläsare och uppdatera din cache.',
      ariaLabel: 'Hantering av kakor på den här webbplatsen'
    }
  };

  /** @jsx jsx */
  /* globals define */

  const PLACEHOLDER_SELECTOR$1 = '#ep-opt-js';
  const descriptionLabels = {
    [OPTED_IN]: 'optInDesc',
    [OPTED_OUT]: 'optOutDesc',
    [NO_CHOICE]: 'chooseDesc'
  };
  const descriptionLabel = _ref => {
    let {
      lang,
      status
    } = _ref;
    return translations$1(lang)[descriptionLabels[status]];
  };
  const labels = lang => {
    const {
      optInLabel,
      optOutLabel
    } = translations$1(lang);
    return {
      optInLabel,
      optOutLabel
    };
  };
  const Update = effecters => (state, status) => [{
    ...state,
    status
  }, [effecters]];
  const OnChange = effecters => (_, event) => [Update(effecters),
  // eslint-disable-line new-cap
  event.target.value];
  const widget = _ref2 => {
    let {
      lang,
      optInLabel,
      optOutLabel,
      OptIn,
      OptOut
    } = _ref2;
    return _ref3 => {
      let {
        status
      } = _ref3;
      return jsx("div", {
        class: "ep_gridcolumn-content",
        id: "ep-opt-js"
      }, jsx("form", {
        action: "",
        id: "ep_opt",
        class: "ep_opt-form"
      }, jsx("fieldset", null, jsx("div", {
        class: "ep-a_text"
      }, jsx("p", null, descriptionLabel({
        lang,
        status
      }))), jsx("div", {
        class: "ep_cookies-form-field"
      }, jsx("input", {
        id: "a11y-issue-1",
        name: "cookies-validation",
        type: "radio",
        value: OPTED_OUT,
        checked: status === OPTED_OUT,
        onChange: OptOut
      }), jsx("label", {
        htmlFor: "a11y-issue-1"
      }, optOutLabel)), jsx("div", {
        class: "ep_cookies-form-field"
      }, jsx("input", {
        id: "a11y-issue-2",
        name: "cookies-validation",
        type: "radio",
        value: OPTED_IN,
        checked: status === OPTED_IN,
        onChange: OptIn
      }), jsx("label", {
        htmlFor: "a11y-issue-2"
      }, optInLabel)))));
    };
  };
  const buildWidget = _ref4 => {
    let {
      lang,
      OptIn,
      OptOut
    } = _ref4;
    return widget({
      lang,
      ...labels(lang),
      OptIn,
      OptOut
    });
  };
  const widgetHandler = _ref5 => {
    let {
      status,
      optInFx,
      optOutFx
    } = _ref5;
    const props = {
      lang: lang(),
      OptIn: OnChange(optInFx),
      // eslint-disable-line new-cap
      OptOut: OnChange(optOutFx) // eslint-disable-line new-cap
    };
    const displayWidget = () => {
      app({
        init: {
          status
        },
        view: buildWidget(props),
        node: findInBody(PLACEHOLDER_SELECTOR$1)
      });
    };
    if (typeof define === 'function' && define.amd) {
      define('privacy-policy', () => ({
        addOptIO: displayWidget
      }));
    } else {
      displayWidget();
    }
  };
  const widgetController = () => {
    const [status, {
      optInFx,
      optOutFx
    }] = cookieHandler();
    if (findInBody(PLACEHOLDER_SELECTOR$1)) {
      widgetHandler({
        status,
        optInFx,
        optOutFx
      });
      return true;
    }
    return false;
  };

  const translations = lang => data[lang] || data.en;
  const data = {
    en: {
      lang: 'en',
      url: 'together.eu',
      title: "Managing cookies on Parliament's website",
      body: [h('p', {}, text('Dear visitor,')), h('p', {}, text('We use analytics cookies to offer you a better browsing experience. You have the choice to refuse or accept them.'))],
      textBottom1: 'For any information on the other cookies and server logs we use, we invite you to read our ',
      textBottom2: ', our ',
      textBottom3: ' and our ',
      linkLabels: {
        'data-protection': 'data protection policy',
        'cookies-policy': 'cookies policy',
        'cookies-inventory': 'cookies inventory.',
        'privacy-policy': 'privacy policy'
      },
      accept: 'I accept analytics cookies',
      refuse: 'I refuse analytics cookies',
      more: 'More',
      tooltip: 'Read more'
    },
    uk: {
      lang: 'uk',
      title: 'Управління файлами cookie на вебсайті Парламенту',
      body: [h('p', {}, text('Шановний відвідувачу,')), h('p', {}, text('Ми використовуємо аналітичні файли cookie, щоб покращити для Вас якість використання вебсайту. Прийняти чи відмовитися від них -- вирішувати Вам.'))],
      textBottom1: 'Для отримання більш детальної інформації про інші файли cookie та журнали серверу, які ми використовуємо, просимо ознайомитися з нашою  ',
      textBottom2: ', нашою ',
      textBottom3: ' та нашою ',
      linkLabels: {
        'data-protection': 'політикою захисту даних',
        'cookies-policy': 'політикою щодо файлів cookie',
        'cookies-inventory': 'реєстром файлів cookie.',
        'privacy-policy': 'політикою конфіденційності'
      },
      accept: 'Я приймаю аналітичні файли cookie.',
      refuse: 'Я відмовляюся від аналітичних файлів cookie.',
      more: 'Більше',
      tooltip: 'Детальніше'
    },
    bg: {
      lang: 'bg',
      title: 'Управлението на „бисквитките“ (cookies) на интернет сайта на Европейския парламент',
      body: [h('p', {}, text('Уважаеми посетители,')), h('p', {}, text('Използваме аналитични бисквитки, за да Ви предложим по-добро сърфиране. Имате право да ги отхвърлите или приемете.'))],
      textBottom1: 'За информация относно другите използвани от нас бисквитки и сървърни регистрационни файлове, Ви поканваме да прочетете за нашата ',
      textBottom2: ', нашата ',
      textBottom3: ' и за нашия ',
      linkLabels: {
        'data-protection': 'политика за защита на данните',
        'cookies-policy': 'политика за бисквитките',
        'cookies-inventory': 'списък на бисквитките.',
        'privacy-policy': 'политика за поверителност на личните данни'
      },
      accept: 'Приемам аналитичните бисквитки',
      refuse: 'Отхвърлям аналитичните бисквитки',
      more: 'Повече',
      tooltip: 'Продължение'
    },
    cs: {
      lang: 'cs',
      title: 'Používání souborů cookies na internetových stránkách Evropského parlamentu',
      body: [h('p', {}, text('Vážení návštěvníci,')), h('p', {}, text('ke zlepšení kvality prohlížení našich webových stránek používáme analytické cookies. Máte možnost je přijmout nebo odmítnout.'))],
      textBottom1: 'Další informace o ostatních cookies a záznamech na serveru, které používáme, naleznete na těchto stránkách: ',
      textBottom2: ', ',
      textBottom3: ' a ',
      linkLabels: {
        'data-protection': 'ochrana osobních údajů',
        'cookies-policy': 'zásady používání cookies',
        'cookies-inventory': 'inventář cookies.',
        'privacy-policy': 'politika ochrany osobních údajů'
      },
      accept: 'Souhlasím se zasíláním analytických cookies',
      refuse: 'Nesouhlasím se zasíláním analytických cookies',
      more: 'více',
      tooltip: 'Přečtěte si více'
    },
    da: {
      lang: 'da',
      title: 'Håndtering af cookies på Europa-Parlamentets websted',
      body: [h('p', {}, text('Kære besøgende')), h('p', {}, text('Vi bruger analysecookies for at tilbyde dig en bedre browsingoplevelse. Du kan vælge at afvise eller acceptere dem.'))],
      textBottom1: 'For alle oplysninger om de øvrige cookies og serverlogfiler, vi bruger, opfordrer vi dig til at læse vores ',
      textBottom2: ', vores ',
      textBottom3: ' og vores ',
      linkLabels: {
        'data-protection': 'databeskyttelsespolitik',
        'cookies-policy': 'cookiepolitik',
        'cookies-inventory': 'cookieoversigt.',
        'privacy-policy': 'Privatlivspolitik'
      },
      accept: 'Jeg accepterer analysecookies',
      refuse: 'Jeg afviser analysecookies',
      more: 'Mere',
      tooltip: 'Læs mere'
    },
    de: {
      lang: 'de',
      title: 'Verwendung von Cookies auf der Website des Europäischen Parlaments',
      body: [h('p', {}, text('Guten Tag!')), h('p', {}, text('Das Europäische Parlament setzt Analyse-Cookies, um die Qualität des Besuchs seiner Website zu verbessern. Sie können diese Cookies ablehnen oder akzeptieren.'))],
      textBottom1: 'Weitere Informationen über die anderen Cookies und die Serverprotokolle, die vom Europäischen Parlament verwendet werden, finden Sie unter ',
      textBottom2: ', ',
      textBottom3: ' und im ',
      linkLabels: {
        'data-protection': 'Schutz personenbezogener Daten',
        'cookies-policy': 'Cookies und Datenschutz',
        'cookies-inventory': 'Cookie-Verzeichnis.',
        'privacy-policy': 'datenschutzbestimmungen'
      },
      accept: 'Analyse-Cookies akzeptieren',
      refuse: 'Analyse-Cookies ablehnen',
      more: 'Mehr',
      tooltip: 'Fortsetzung lesen'
    },
    el: {
      lang: 'el',
      title: 'Πώς χρησιμοποιούνται τα cookies στον ιστότοπο του Ευρωπαϊκού Κοινοβουλίου',
      body: [h('p', {}, text('Αγαπητέ επισκέπτη,')), h('p', {}, text('Χρησιμοποιούμε cookies ανάλυσης για να σας προσφέρουμε καλύτερη εμπειρία περιήγησης . Έχετε την επιλογή να τα αρνηθείτε ή να τα αποδεχθείτε.'))],
      textBottom1: 'Για οποιαδήποτε πληροφορία σχετικά με τα άλλα cookies και αρχεία καταγραφής διακομιστών που χρησιμοποιούμε, σας καλούμε να διαβάσετε την πολιτική μας για την ',
      textBottom2: ', την ',
      textBottom3: ' και τον ',
      linkLabels: {
        'data-protection': 'προστασία των δεδομένων',
        'cookies-policy': 'πολιτική μας για τα cookies',
        'cookies-inventory': 'κατάλογο των cookies μας.',
        'privacy-policy': 'πολιτική απορρήτου'
      },
      accept: 'Αποδέχομαι τα cookies ανάλυσης',
      refuse: 'Απορρίπτω τα cookies ανάλυσης',
      more: 'Περισσότερα',
      tooltip: 'Διαβάστε τη συνέχεια'
    },
    es: {
      lang: 'es',
      title: 'La gestión de las cookies en el sitio del Parlamento Europeo',
      body: [h('p', {}, text('Estimado/a visitante:')), h('p', {}, text('Utilizamos cookies de análisis para ofrecerle una mejor experiencia de navegación. Tiene la opción de rechazarlas o de aceptarlas.'))],
      textBottom1: 'Para cualquier información sobre las otras cookies y los servidores que utilizamos, le rogamos lea nuestra política de ',
      textBottom2: ', nuestra ',
      textBottom3: ' y nuestro ',
      linkLabels: {
        'data-protection': 'Protección de los datos personales',
        'cookies-policy': 'Política de cookies',
        'cookies-inventory': 'Inventario de cookies.',
        'privacy-policy': 'política de privacidad'
      },
      accept: 'Acepto las cookies de análisis.',
      refuse: 'Rechazo las cookies de análisis.',
      more: 'Más',
      tooltip: 'Más...'
    },
    et: {
      lang: 'et',
      title: 'Küpsiste haldamine Euroopa Parlamendi saidil',
      body: [h('p', {}, text('Austatud külastaja')), h('p', {}, text('Parema sirvimiskogemuse pakkumiseks kasutame analüüsiküpsiseid. Teil on võimalus neist keelduda või nendega nõustuda.'))],
      textBottom1: 'Teabe saamiseks muude küpsiste ja serverilogide kohta, mida me kasutame, soovitame tutvuda meie ',
      textBottom2: ', ',
      textBottom3: ' ja ',
      linkLabels: {
        'data-protection': 'privaatsuspoliitika ja andmekaitsepõhimõtetega',
        'cookies-policy': 'küpsiste kasutamise põhimõtetega',
        'cookies-inventory': 'küpsiste loeteluga.',
        'privacy-policy': 'andmekaitsepõhimõtted'
      },
      accept: 'Nõustun analüüsiküpsistega',
      refuse: 'Keeldun analüüsiküpsistest',
      more: 'Lisateave',
      tooltip: 'Loe lähemalt'
    },
    fi: {
      lang: 'fi',
      title: 'Evästeiden hallinta Euroopan parlamentin verkkosivustolla',
      body: [h('p', {}, text('Tiedoksi sivuston käyttäjälle')), h('p', {}, text('Käytämme analytiikkaevästeitä käyttäjäkokemuksesi parantamiseen. Voit estää tai sallia ne.'))],
      textBottom1: 'Tietoa käyttämistämme muista evästeistä ja palvelinlokeista: ',
      textBottom2: ', ',
      textBottom3: ' ja ',
      linkLabels: {
        'data-protection': 'tietosuojakäytäntömme',
        'cookies-policy': 'evästekäytäntömme',
        'cookies-inventory': 'evästehakemistomme',
        'privacy-policy': 'tietosuojakäytäntö'
      },
      accept: 'Hyväksyn analytiikkaevästeet',
      refuse: 'En hyväksy analytiikkaevästeitä',
      more: 'Lisää',
      tooltip: 'Lue lisää'
    },
    fr: {
      lang: 'fr',
      title: 'La gestion des cookies sur le site du Parlement européen',
      body: [h('p', {}, text('Cher visiteur,')), h('p', {}, text('Nous utilisons des cookies analytiques pour vous offrir une meilleure expérience de navigation. Vous pouvez les refuser ou les accepter.'))],
      textBottom1: 'Pour obtenir des informations sur les autres cookies et les journaux de serveur que nous utilisons, veuillez lire notre ',
      textBottom2: ', notre ',
      textBottom3: ' et notre ',
      linkLabels: {
        'data-protection': 'politique de protection des données',
        'cookies-policy': 'politique d’utilisation des cookies',
        'cookies-inventory': 'inventaire des cookies.',
        'privacy-policy': 'politique de confidentialité'
      },
      accept: 'J’accepte les cookies analytiques',
      refuse: 'Je refuse les cookies analytiques',
      more: 'Plus d’options',
      tooltip: 'Lire la suite'
    },
    ga: {
      lang: 'ga',
      title: 'Bainistiú fianán ar láithreán gréasáin Pharlaimint na hEorpa',
      body: [h('p', {}, text('A chuairteoir, a chara,')), h('p', {}, text('Úsáidimid fianáin anailísíochta chun eispéireas brabhsála níos fearr a thairiscint duit. Tá an rogha agat iad a dhiúltú nó glacadh leo.'))],
      textBottom1: 'Le haghaidh aon fhaisnéis faoi na fianáin agus na logaí freastalaí eile a úsáidimid, iarraimid ort go léifeá ár ',
      textBottom2: ', ár ',
      textBottom3: ' agus ár ',
      linkLabels: {
        'data-protection': 'mbeartas cosanta sonraí',
        'cookies-policy': 'mbeartas fianán',
        'cookies-inventory': 'bhfardal fianán.',
        'privacy-policy': 'beartas príobháideachais'
      },
      accept: 'Glacaim le fianáin anailísíochta',
      refuse: 'Diúltaím fianáin anailísíochta',
      more: 'Níos mó',
      tooltip: 'Read more'
    },
    hr: {
      lang: 'hr',
      title: 'Upravljanje kolačićima na internetskoj stranici Europskog parlamenta',
      body: [h('p', {}, text('Poštovani posjetitelji,')), h('p', {}, text('Koristimo analitičke kolačiće kako bismo vam omogućili bolje pretraživanje. Kolačiće možete odbiti ili prihvatiti.'))],
      textBottom1: 'Sve informacije o drugim kolačićima i zapisnicima poslužitelja kojima se koristimo možete pronaći u našoj ',
      textBottom2: ', ',
      textBottom3: ' i ',
      linkLabels: {
        'data-protection': 'politici zaštite podataka',
        'cookies-policy': 'politici kolačića',
        'cookies-inventory': 'popisu kolačića.',
        'privacy-policy': 'politika zaštite privatnosti'
      },
      accept: 'Prihvaćam analitičke kolačiće',
      refuse: 'Ne prihvaćam analitičke kolačiće',
      more: 'Više',
      tooltip: 'Pročitaj više'
    },
    hu: {
      lang: 'hu',
      title: 'A cookie-k használata az Európai Parlament honlapján',
      body: [h('p', {}, text('Tisztelt Látogató!')), h('p', {}, text('Elemzési célú sütiket használunk, hogy jobb böngészési élményt nyújtsunk Önnek. Lehetősége van arra, hogy elutasítsa vagy elfogadja őket.'))],
      textBottom1: 'Az általunk használt többi sütivel és szervernaplóval kapcsolatos információkért, kérjük, olvassa el ',
      textBottom2: ', ',
      textBottom3: ' és ',
      linkLabels: {
        'data-protection': 'adatvédelmi szabályzatunkat',
        'cookies-policy': 'sütikre vonatkozó szabályzatunkat',
        'cookies-inventory': 'sütijegyzékünket.',
        'privacy-policy': 'adatvédelmi szabályzat'
      },
      accept: 'Elfogadom az elemzési célú sütiket',
      refuse: 'Elutasítom az elemzési célú sütiket',
      more: 'További információk',
      tooltip: 'Tovább'
    },
    it: {
      lang: 'it',
      title: 'La gestione dei cookie sul sito del Parlamento europeo',
      body: [h('p', {}, text('Gentile visitatore,')), h('p', {}, text('utilizziamo cookie analitici per migliorare la tua esperienza di navigazione. Puoi scegliere se rifiutarli o accettarli.'))],
      textBottom1: 'Per informazioni sugli altri cookie e i log di server che utilizziamo ti invitiamo a leggere la nostra ',
      textBottom2: ', la nostra ',
      textBottom3: ' e il nostro ',
      linkLabels: {
        'data-protection': 'politica in materia di protezione dei dati personali',
        'cookies-policy': 'politica in materia di cookie',
        'cookies-inventory': 'inventario dei cookie.',
        'privacy-policy': 'informativa sulla privacy'
      },
      accept: 'Accetto i cookie analitici',
      refuse: 'Rifiuto i cookie analitici',
      more: 'Altre opzioni',
      tooltip: 'Seguito'
    },
    lt: {
      lang: 'lt',
      title: 'Slapukų tvarkymas Europos Parlamento svetainėje',
      body: [h('p', {}, text('Gerbiamas lankytojau,')), h('p', {}, text('naudojame analitinius slapukus, kad jums būtų patogiau naršyti. Galite sutikti arba nesutikti, kad jie būtų naudojami.'))],
      textBottom1: 'Informaciją apie kitus mūsų naudojamus slapukus ir serverio žurnalus rasite perskaitę mūsų ',
      textBottom2: ', ',
      textBottom3: ' ir ',
      linkLabels: {
        'data-protection': 'duomenų apsaugos politiką',
        'cookies-policy': 'slapukų politiką',
        'cookies-inventory': 'slapukų aprašą.',
        'privacy-policy': 'privatumo politika'
      },
      accept: 'Sutinku, kad būtų naudojami analitiniai slapukai',
      refuse: 'Nesutinku, kad būtų naudojami analitiniai slapukai',
      more: 'Daugiau',
      tooltip: 'Skaityti daugiau'
    },
    lv: {
      lang: 'lv',
      title: 'Sīkdatņu pārvaldība Eiropas Parlamenta tīmekļa vietnē',
      body: [h('p', {}, text('Godātais apmeklētāj,')), h('p', {}, text('Mēs izmantojam analītiskās sīkdatnes, lai jums nodrošinātu labāku pārlūkošanas pieredzi. Jūs varat tās noraidīt vai pieņemt'))],
      textBottom1: 'Ar papildu informāciju par citām mūsu izmantotajām sīkdatnēm un serveru ierakstiem  aicinām iepazīties sadaļās par ',
      textBottom2: ', mūsu ',
      textBottom3: ' un ',
      linkLabels: {
        'data-protection': 'personas datu aizsardzības politiku',
        'cookies-policy': 'sīkdatņu politiku',
        'cookies-inventory': 'sīkdatņu sarakstu.',
        'privacy-policy': 'privātuma politika'
      },
      accept: 'Es piekrītu analītisko sīkdatņu izmantošanai',
      refuse: 'Es atsakos no analītiskajām sīkdatnēm',
      more: 'Vairāk',
      tooltip: 'Lasīt tālāk'
    },
    mt: {
      lang: 'mt',
      title: 'Il-ġestjoni tal-cookies fis-sit tal-Parlament Ewropew',
      body: [h('p', {}, text('Għażiż(a) viżitatur/viżitatriċi,')), h('p', {}, text("Aħna nużaw cookies analitiċi biex noffrulek esperjenza ta' bbrawżjar aħjar. Għandek l-għażla li tirrifjuta jew li taċċettahom."))],
      textBottom1: 'Għal kwalunkwe informazzjoni dwar cookies oħra u l-logs tas-servers li nużaw, nistednuk taqra ',
      textBottom2: ', ',
      textBottom3: ' u ',
      linkLabels: {
        'data-protection': 'l-politika tagħna dwar il-protezzjoni tad-data',
        'cookies-policy': 'il-politika tagħna dwar il-cookies',
        'cookies-inventory': 'l-inventarju tagħna dwar il-cookies.',
        'privacy-policy': 'politika tal-privatezza'
      },
      accept: 'Naċċetta l-cookies analitiċi',
      refuse: 'Nirrifjuta l-cookies analitiċi',
      more: 'Aktar',
      tooltip: 'Read more'
    },
    nl: {
      lang: 'nl',
      title: 'Cookies op de website van het Europees Parlement',
      body: [h('p', {}, text('Geachte bezoeker,')), h('p', {}, text('Wij gebruiken analytische cookies om uw surfervaring te verbeteren. U kunt deze cookies accepteren of weigeren.'))],
      textBottom1: 'Nadere informatie over andere cookies en serverlogs die we gebruiken kunt u vinden in ons ',
      textBottom2: ', ons ',
      textBottom3: ' en onze lijst van ',
      linkLabels: {
        'data-protection': 'gegevensbeschermingsbeleid',
        'cookies-policy': 'cookiebeleid',
        'cookies-inventory': 'cookies.',
        'privacy-policy': 'privacybeleid'
      },
      accept: 'Ik accepteer analytische cookies',
      refuse: 'Ik weiger analytische cookies',
      more: 'Meer',
      tooltip: 'Lees meer'
    },
    pl: {
      lang: 'pl',
      title: 'Zarządzanie ciasteczkami na stronie Parlamentu Europejskiego',
      body: [h('p', {}, text('Drogi użytkowniku!')), h('p', {}, text('W celu zapewnienia wyższej jakości korzystania z naszej strony internetowej używamy analitycznych plików cookie. Możesz zdecydować, czy zgadzasz się na ich stosowanie, czy też nie.'))],
      textBottom1: 'W celu uzyskania wszelkich informacji na temat innych używanych przez nas plików cookie i rejestrów aktywności sieciowej zapraszamy do zapoznania się z naszą ',
      textBottom2: ', naszą ',
      textBottom3: ' i naszym ',
      linkLabels: {
        'data-protection': 'Polityką ochrony prywatności',
        'cookies-policy': 'Polityką dotyczącą plików cookie',
        'cookies-inventory': 'Wykazem plików cookie.',
        'privacy-policy': 'polityka prywatności'
      },
      accept: 'Zgadzam się na stosowanie analitycznych plików cookie.',
      refuse: 'Nie zgadzam się na stosowanie analitycznych plików cookie.',
      more: 'Więcej',
      tooltip: 'Przeczytaj więcej'
    },
    pt: {
      lang: 'pt',
      title: 'A gestão dos cookies no sítio Web do Parlamento Europeu.',
      body: [h('p', {}, text('Caro(a) visitante,')), h('p', {}, text('Utilizamos cookies analíticos para lhe oferecer uma melhor experiência de navegação. Tem a opção de recusá-los ou aceitá-los.'))],
      textBottom1: 'Para mais informações sobre os outros cookies e registos de servidores que utilizamos, queira consultar a nossa ',
      textBottom2: ', a nossa ',
      textBottom3: ' e o nosso ',
      linkLabels: {
        'data-protection': 'política de proteção de dados',
        'cookies-policy': 'política relativa aos cookies',
        'cookies-inventory': 'inventário de cookies.',
        'privacy-policy': 'política de confidencialidade'
      },
      accept: 'Aceito cookies analíticos',
      refuse: 'Recuso cookies analíticos',
      more: 'Mais',
      tooltip: 'Ler mais'
    },
    ro: {
      lang: 'ro',
      title: 'Gestionarea modulelor cookie pe site-ul Parlamentului European',
      body: [h('p', {}, text('Dragi vizitatori,')), h('p', {}, text('Utilizăm cookie-uri de analiză pentru a vă oferi o experiență de navigare mai bună. Puteți alege să le refuzați sau să le acceptați.'))],
      textBottom1: 'Pentru informații suplimentare despre alte cookie-uri și jurnale de server pe care le folosim, vă invităm să citiți ',
      textBottom2: ', ',
      textBottom3: ' și ',
      linkLabels: {
        'data-protection': 'politica de protecție a datelor',
        'cookies-policy': 'politica privind cookie-urile',
        'cookies-inventory': 'inventarul cookie-urilor.',
        'privacy-policy': 'politica de confidențialitate'
      },
      accept: 'Accept cookie-urile de analiză',
      refuse: 'Refuz cookie-urile de analiză',
      more: 'Detalii',
      tooltip: 'Mai mult'
    },
    sk: {
      lang: 'sk',
      title: 'Správa súborov cookies na webovej stránke Európskeho parlamentu',
      body: [h('p', {}, text('Vážený návštevník,')), h('p', {}, text('Európsky parlament používa analytické súbory cookie, aby vám umožnil jednoduchšie prehliadanie. Môžete sa rozhodnúť, či s ich používaním budete súhlasiť alebo nie.'))],
      textBottom1: 'Viac o ostatných súboroch cookie a serverových logoch, ktoré používa Európsky parlament, si môžete prečítať na stránkach ',
      textBottom2: ', ',
      textBottom3: ' a ',
      linkLabels: {
        'data-protection': 'politika ochrany údajov',
        'cookies-policy': 'politika používania súborov cookie',
        'cookies-inventory': 'zoznam používaných súborov cookie.',
        'privacy-policy': 'ochrana súkromia'
      },
      accept: 'Súhlasím s používaním analytických súborov cookie.',
      refuse: 'Nesúhlasím s používaním analytických súborov cookie.',
      more: 'Viac',
      tooltip: 'Čítať ďalej'
    },
    sl: {
      lang: 'sl',
      title: 'Uporaba piškotkov na spletišču Evropskega parlamenta',
      body: [h('p', {}, text('Spoštovani obiskovalci,')), h('p', {}, text('analitične piškotke uporabljamo, da bi vam omogočili učinkovitejše brskanje. Lahko jih zavrnete ali sprejmete.'))],
      textBottom1: 'Za vse informacije o drugih piškotkih in strežniških dnevnikih, ki jih uporabljamo, vas vabimo, da si preberete našo ',
      textBottom2: ', našo ',
      textBottom3: ' in naš ',
      linkLabels: {
        'data-protection': 'politiko varstva podatkov',
        'cookies-policy': 'politiko piškotkov',
        'cookies-inventory': 'seznam piškotkov.',
        'privacy-policy': 'pravilnik o zasebnosti'
      },
      accept: 'Sprejmi analitične piškotke',
      refuse: 'Zavrni analitične piškotke',
      more: 'Več',
      tooltip: 'Preberite več'
    },
    sv: {
      lang: 'sv',
      title: 'Hur används kakor (cookies), på Europaparlamentets webbplats?',
      body: [h('p', {}, text('Hej,')), h('p', {}, text('vi använder analytiska kakor för att du lättare ska kunna navigera på våra webbplatser. Du kan välja att avvisa eller godkänna dem.'))],
      textBottom1: 'För information om övriga kakor och serverloggar som vi använder kan du läsa vår ',
      textBottom2: ', vår ',
      textBottom3: ' och vår ',
      linkLabels: {
        'data-protection': 'policy för skydd av personuppgifter',
        'cookies-policy': 'policy för kakor',
        'cookies-inventory': 'genomgång av kakor.',
        'privacy-policy': 'integritetspolicy'
      },
      accept: 'Jag godkänner analytiska kakor',
      refuse: 'Jag avvisar analytiska kakor',
      more: 'Mer',
      tooltip: 'Läs mer'
    }
  };

  const linkLabels = {
    en: {
      'cookies-inventory': 'cookies inventory',
      'cookies-policy': 'cookies policy',
      'data-protection-notice': 'data protection notice'
    },
    bg: {
      'cookies-inventory': 'списък на бисквитките',
      'cookies-policy': 'политика относно бисквитките',
      'data-protection-notice': 'информация за политиката за защита на личните данни'
    },
    hr: {
      'cookies-inventory': 'popis kolačića',
      'cookies-policy': 'politika o kolačićima',
      'data-protection-notice': 'napomena o zaštiti podataka'
    },
    cs: {
      'cookies-inventory': 'inventář cookies',
      'cookies-policy': 'zásady používání cookies',
      'data-protection-notice': 'prohlášení o ochraně údajů'
    },
    da: {
      'cookies-inventory': 'cookieoversigt',
      'cookies-policy': 'cookiepolitik',
      'data-protection-notice': 'meddelelse om databeskyttelse'
    },
    et: {
      'cookies-inventory': 'küpsiste loetelu',
      'cookies-policy': 'küpsiste kasutamise põhimõtted',
      'data-protection-notice': 'andmekaitseteade'
    },
    fi: {
      'cookies-inventory': 'evästehakemisto',
      'cookies-policy': 'evästekäytäntö',
      'data-protection-notice': 'tietosuojailmoitus'
    },
    fr: {
      'cookies-inventory': 'inventaire des cookies',
      'cookies-policy': 'politique d’utilisation des cookies',
      'data-protection-notice': 'avis relatif à la protection des données'
    },
    ga: {
      'cookies-inventory': 'fardal na bhfianán',
      'cookies-policy': 'beartas maidir le fianáin',
      'data-protection-notice': 'fógra um chosaint sonraí'
    },
    de: {
      'cookies-inventory': 'cookie-verzeichnis',
      'cookies-policy': 'cookie-leitlinien',
      'data-protection-notice': 'erklärung zum datenschutz'
    },
    el: {
      'cookies-inventory': 'κατάλογο cookies',
      'cookies-policy': 'πολιτική cookies',
      'data-protection-notice': 'σημείωμα περί προστασίας των δεδομένων'
    },
    hu: {
      'cookies-inventory': 'sütijegyzék',
      'cookies-policy': 'a sütik használatára vonatkozó szabályzat',
      'data-protection-notice': 'adatvédelmi nyilatkozat'
    },
    it: {
      'cookies-inventory': 'inventario dei cookie',
      'cookies-policy': "politica sull'uso dei cookie",
      'data-protection-notice': 'informativa sulla protezione dei dati'
    },
    lv: {
      'cookies-inventory': 'sīkdatņu saraksts',
      'cookies-policy': 'sīkdatņu politika',
      'data-protection-notice': 'paziņojums par datu aizsardzību'
    },
    lt: {
      'cookies-inventory': 'slapukų aprašas',
      'cookies-policy': 'slapukų politika',
      'data-protection-notice': 'įspėjimas apie duomenų apsaugą'
    },
    mt: {
      'cookies-inventory': 'inventarju tal-cookies',
      'cookies-policy': 'il-politika dwar il-cookies',
      'data-protection-notice': 'avviż dwar il-protezzjoni tad-data'
    },
    nl: {
      'cookies-inventory': 'cookies',
      'cookies-policy': 'cookiebeleid',
      'data-protection-notice': 'mededeling gegevensbescherming'
    },
    pl: {
      'cookies-inventory': 'wykaz plików cookie',
      'cookies-policy': 'polityka dotycząca plików cookie',
      'data-protection-notice': 'informacja o ochronie danych'
    },
    pt: {
      'cookies-inventory': 'inventário de cookies',
      'cookies-policy': 'política relativa aos cookies',
      'data-protection-notice': 'declaração relativa à proteção de dados'
    },
    ro: {
      'cookies-inventory': 'inventarul modulelor cookie',
      'cookies-policy': 'politica privind modulele cookie',
      'data-protection-notice': 'aviz privind protecția datelor'
    },
    sk: {
      'cookies-inventory': 'zoznam používaných súborov cookie',
      'cookies-policy': 'podmienky používania súborov cookie',
      'data-protection-notice': 'oznámenie o ochrane údajov'
    },
    sl: {
      'cookies-inventory': 'seznam piškotkov',
      'cookies-policy': 'politika piškotkov',
      'data-protection-notice': 'obvestilo o varstvu podatkov'
    },
    es: {
      'cookies-inventory': 'inventario de cookies',
      'cookies-policy': 'política de cookies',
      'data-protection-notice': 'aviso de protección de datos'
    },
    sv: {
      'cookies-inventory': 'genomgång av kakor',
      'cookies-policy': 'policy för kakor',
      'data-protection-notice': 'meddelande om skydd av personuppgifter'
    }
  };

  /** @jsx jsx */

  const link = (url, label) => jsx("a", {
    href: url,
    style: {
      textDecoration: 'underline',
      color: 'inherit'
    },
    className: "cc-link-default"
  }, label);

  /** @jsx jsx */

  const labelKeys = {
    dp: 'data-protection-notice',
    cp: 'cookies-policy',
    ci: 'cookies-inventory'
  };
  const keys = {
    dp: 'data-protection',
    cp: 'cookies-policy',
    ci: 'cookies-inventory'
  };
  const urlBuilder = _ref => {
    let {
      lang,
      slug
    } = _ref;
    return `https://www.europarl.europa.eu/privacy-policy/${lang}/${slug}`;
  };
  const linksBuilder = url => _ref2 => {
    let {
      lang,
      dataMoreLink
    } = _ref2;
    const {
      textBottom1,
      textBottom2,
      textBottom3
    } = translations(lang);
    const labels = linkLabels[lang];
    const firstLink = [textBottom1, link(dataMoreLink || url({
      lang,
      slug: keys.dp
    }), labels[labelKeys.dp])];
    return dataMoreLink ? jsx("p", null, firstLink) : jsx("p", null, firstLink, ' ', [textBottom2, link(url({
      lang,
      slug: keys.cp
    }), labels[labelKeys.cp])], ' ', [textBottom3, link(url({
      lang,
      slug: keys.ci
    }), labels[labelKeys.ci])], ' ');
  };
  const links = linksBuilder(urlBuilder);
  const tag = _ => '';

  /** @jsx jsx */

  const PLACEHOLDER_SELECTOR = `#${PLACEHOLDER_ID}`;
  const POPUP_ID = 'cookie-policy';
  const POPUP_SELECTOR = `#${POPUP_ID}`;
  const POPUP_CONTAINER_SELECTOR = `${POPUP_SELECTOR}`;
  const COOKIE_POLICY_DESCRIPTION_TOP = 'cookie-policy-description-top';
  const COOKIE_POLICY_DESCRIPTION_TOP_SELECTOR = `#${COOKIE_POLICY_DESCRIPTION_TOP}`;
  const linkBuilder = {
    [domainTokens.default]: links
  };
  const domainTag = {
    [domainTokens.default]: tag
  };
  const button = (label, handler) => jsx("button", {
    className: "epjs_agree",
    type: "button",
    onclick: handler
  }, jsx("span", null, label));
  const popup = props => {
    const {
      popupTag,
      title,
      body,
      accept,
      refuse,
      links,
      Accept,
      Refuse
    } = props;
    return _ref => {
      let {
        displayed
      } = _ref;
      return jsx("section", {
        class: `epjs_cookiepolicy ${displayed ? 'epjs_displayed' : ''}`,
        id: POPUP_ID,
        ariaLabel: title
      }, jsx("div", {
        className: "cookie-consent-popup-container"
      }, popupTag, jsx("div", {
        className: "cookie-consent-popup-wrapper"
      }, jsx("div", {
        className: "epjs_text",
        tabIndex: "-1"
      }, jsx("div", {
        id: COOKIE_POLICY_DESCRIPTION_TOP
      }, body), jsx("div", {
        id: "cookie-policy-description-bottom"
      }, links)), jsx("div", {
        className: "epjs_buttons"
      }, button(refuse, Refuse), button(accept, Accept)))));
    };
  };
  const buildPopup = _ref2 => {
    let {
      lang,
      Accept,
      Refuse
    } = _ref2;
    const {
      title,
      body,
      accept,
      refuse
    } = translations(lang);
    const dataset = scriptDataset(JS_AND_CSS_BASENAME);
    const dataMoreLink = dataset.moreLink;
    const domainToken = domainTokens.default;
    const links = linkBuilder[domainToken]({
      lang,
      dataMoreLink
    });
    const popupTag = domainTag[domainToken](lang);
    return popup({
      popupTag,
      title,
      body,
      accept,
      refuse,
      links,
      Accept,
      Refuse
    });
  };
  const slidePopupIn = (dispatch, options) => {
    requestAnimationFrame(() => {
      setDataAttribute('body', 'jsactive', 'true');
      dispatch(options.action);
    });
  };
  const displayPopupFx = () => [slidePopupIn, {
    action: slideIn
  }];
  const onCssLoadError = _ => {
    console.log('privacy-policy: could not load cookie consent popup css');
    // remove();
  };
  const loadCss = onLoad => {
    injectInHead(createCssLink(cssUrlFromScript(JS_AND_CSS_BASENAME), onLoad, onCssLoadError));
  };
  const onDismissal = state => [setListener, {
    type: transitionEndEventName(),
    selector: POPUP_CONTAINER_SELECTOR,
    dispatchable: [state, removePopupFx(POPUP_SELECTOR)]
  }];
  const onAppearance = state => [setListener, {
    type: transitionEndEventName(),
    selector: POPUP_CONTAINER_SELECTOR,
    dispatchable: [state, setFocusFx(COOKIE_POLICY_DESCRIPTION_TOP_SELECTOR)]
  }];
  const popupHandler = _ref3 => {
    let {
      optInFx,
      optOutFx
    } = _ref3;
    const props = {
      lang: lang(),
      Accept: slideOut(optInFx),
      Refuse: slideOut(optOutFx)
    };
    const displayPopup = () => app({
      init: [{
        displayed: false
      }, displayPopupFx()],
      view: buildPopup(props),
      subscriptions: state => [
      // set listener to remove popup at end of slideout animation
      state.dismissed && onDismissal(state),
      // set listener to set focus at the end of slidein animation
      state.displayed && onAppearance(state)],
      node: findInBody(PLACEHOLDER_SELECTOR)
    });
    if (findCssLink(JS_AND_CSS_BASENAME)) {
      displayPopup();
    } else {
      loadCss(displayPopup);
    }
  };
  const popupController = () => {
    if (widgetController()) {
      // indicate that widget was displayed
      // and that no further popup should be displayed
      return true;
    }
    const [consentStatus, consentFx] = cookieHandler();
    if (consentStatus === NO_CHOICE) {
      insertPopupPlaceholderIfNeeded();
      popupHandler(consentFx);
      // indicate that the popup was displayed
      // and that no further popup should be displayed
      return true;
    }
  };

  popupController();

  exports.popupController = popupController;

}));
//# sourceMappingURL=privacy-policy.js.map
