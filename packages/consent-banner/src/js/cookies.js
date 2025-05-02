/* globals define */

import Cookies from 'js-cookie';

import {
  trackerUrl,
  injectTracker,
  removeScript,
  normalizedDomain,
  scriptDataset,
} from './dom.js';

import {
  OPTED_IN,
  OPTED_OUT,
  DNTED,
  NO_CHOICE,
  JS_AND_CSS_BASENAME,
  domainTokens,
} from './constants.js';

export const DNT_YES = 'yes';
export const DNT_ON = '1';

// Cookie time to live: 13 months in days
export const COOKIE_TTL = 365 + 31;

export const COOKIE_INFO = {
  [domainTokens.default]: {
    name: 'europarlcookiepolicysagreement',
    optin: '1',
    optout: '0',
  },
};

export const COOKIE_DATA = {};

export const cookie = (prop) => {
  if (!COOKIE_DATA.info) {
    COOKIE_DATA.info =
      COOKIE_INFO[
        scriptDataset(JS_AND_CSS_BASENAME).domainToken || domainTokens.default
      ];
  }

  return COOKIE_DATA.info[prop];
};

export const noop = () => {};

export const removeATICookies = () => {
  for (const cookie of ATICookies) {
    Cookies.remove(cookie, { sameSite: 'strict' });
  }
};

/* eslint-disable eqeqeq */
export const isDNT = () =>
  navigator.doNotTrack == DNT_YES ||
  navigator.doNotTrack == DNT_ON ||
  navigator.msDoNotTrack == DNT_ON ||
  window.doNotTrack == DNT_ON;
/* eslint-enable eqeqeq */

export const ATICookies = [
  'atidvisitor',
  'atreman',
  'atredir',
  'atsession',
  'atuserid',
  'attvtreman',
  'attvtsession',
  'atwebosession',
];

export const setCookie = (value) => {
  // The value of the cookie should be :
  // 1 : the visitor opted in
  // 0 : the visitor opted out
  Cookies.set(cookie('name'), value, {
    expires: COOKIE_TTL,
    domain: normalizedDomain(),
    sameSite: 'strict',
  });
};

export const optInFx = () => {
  setCookie(cookie('optin'));
  loadTrackers();
};

export const optOutFx = () => {
  setCookie(cookie('optout'));
  cleanupTrackers();
};

export const optedIn = () => Cookies.get(cookie('name')) === cookie('optin');
export const optedOut = () => Cookies.get(cookie('name')) === cookie('optout');

export const status = () =>
  isDNT() ? DNTED : optedIn() ? OPTED_IN : optedOut() ? OPTED_OUT : NO_CHOICE;

export const cleanupTrackers = () => {
  removeScript(trackerUrl(JS_AND_CSS_BASENAME));
  removeATICookies();
};

export const loadTrackers = () => {
  injectTracker(JS_AND_CSS_BASENAME, 'WEBA');
};

export const fakeTrackerModuleFactory = () => ({
  staticinfography: noop,
  refresh: noop,
  scan: noop,
});

export const trackerModuleIdFromUrl = (url) =>
  url.split('/').pop().split('.').shift();

export const registerTrackerAMDShim = () => {
  if (typeof define === 'function' && define.amd) {
    // Some feature (e.g. continuous loading, infographics depends depend on the trackers
    define(
      trackerModuleIdFromUrl(trackerUrl(JS_AND_CSS_BASENAME)),
      [],
      fakeTrackerModuleFactory
    );
  }
};

export const logDNTStatus = () => {
  if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack) {
    if (isDNT()) {
      console.log('DNT enabled');
    } else {
      console.log('DNT disabled');
    }
  } else {
    console.log('DNT not supported');
  }
};

export const handlers = {
  [DNTED]() {
    cleanupTrackers();
    registerTrackerAMDShim();
    console.log('Cookie consent: User has DNT enabled');
    return [DNTED, {}];
  },
  [OPTED_OUT]() {
    cleanupTrackers();
    registerTrackerAMDShim();
    console.log('Cookie consent: User does NOT want to be tracked.');
    return [
      OPTED_OUT,
      {
        optInFx,
        optOutFx,
      },
    ];
  },
  [OPTED_IN]() {
    loadTrackers();
    console.log('Cookie consent: User has opted in, trackers activated.');
    return [
      OPTED_IN,
      {
        optInFx,
        optOutFx,
      },
    ];
  },
  [NO_CHOICE]() {
    console.log('Cookie consent: User has not yet expressed choice.');
    return [
      NO_CHOICE,
      {
        optInFx,
        optOutFx,
      },
    ];
  },
};

export const cookieHandler = () => handlers[status()]();

export { OPTED_IN, OPTED_OUT } from './constants.js';
