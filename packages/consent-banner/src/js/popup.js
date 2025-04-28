/** @jsx jsx */

import { app } from 'hyperapp';

// eslint-disable-next-line no-unused-vars
import { jsx } from './jsx.js';

import {
  PLACEHOLDER_ID,
  lang,
  findInBody,
  findCssLink,
  setDataAttribute,
  scriptDataset,
  injectInHead,
  insertPopupPlaceholderIfNeeded,
  createCssLink,
  cssUrlFromScript,
  transitionEndEventName,
} from './dom.js';

import {
  slideIn,
  slideOut,
  setListener,
  setFocusFx,
  removePopupFx,
} from './effects.js';

import { cookieHandler } from './cookies.js';
import { widgetController } from './widget.js';

import {
  links as defaultLinks,
  tag as defaultDomainTag,
} from './domain-default.js';

import { translations } from './translations.js';
import { JS_AND_CSS_BASENAME, NO_CHOICE, domainTokens } from './constants.js';

export const PLACEHOLDER_SELECTOR = `#${PLACEHOLDER_ID}`;
export const POPUP_ID = 'cookie-policy';
export const POPUP_SELECTOR = `#${POPUP_ID}`;
export const POPUP_CONTAINER_SELECTOR = `${POPUP_SELECTOR}`;
export const COOKIE_POLICY_DESCRIPTION_TOP = 'cookie-policy-description-top';
export const COOKIE_POLICY_DESCRIPTION_TOP_SELECTOR = `#${COOKIE_POLICY_DESCRIPTION_TOP}`;

export const linkBuilder = {
  [domainTokens.default]: defaultLinks,
};

export const domainTag = {
  [domainTokens.default]: defaultDomainTag,
};

export const button = (label, handler) => (
  <button className="epjs_agree" type="button" onclick={handler}>
    <span>{label}</span>
  </button>
);

export const popup = (props) => {
  const { popupTag, title, body, accept, refuse, links, Accept, Refuse } =
    props;
  return ({ displayed }) => (
    <section
      class={`epjs_cookiepolicy ${displayed ? 'epjs_displayed' : ''}`}
      id={POPUP_ID}
      ariaLabel={title}>
      <div className="cookie-consent-popup-container">
        {popupTag}
        <div className="cookie-consent-popup-wrapper">
          <div className="epjs_text" tabIndex="-1">
            <div id={COOKIE_POLICY_DESCRIPTION_TOP}>{body}</div>
            <div id="cookie-policy-description-bottom">{links}</div>
          </div>
          <div className="epjs_buttons">
            {button(refuse, Refuse)}
            {button(accept, Accept)}
          </div>
        </div>
      </div>
    </section>
  );
};

export const buildPopup = ({ lang, Accept, Refuse }) => {
  const { title, body, accept, refuse } = translations(lang);

  const dataset = scriptDataset(JS_AND_CSS_BASENAME);
  const dataMoreLink = dataset.moreLink;

  const domainToken = domainTokens.default;

  const links = linkBuilder[domainToken]({ lang, dataMoreLink });
  const popupTag = domainTag[domainToken](lang);

  return popup({
    lang,
    popupTag,
    title,
    body,
    accept,
    refuse,
    links,
    Accept,
    Refuse,
  });
};

export const slidePopupIn = (dispatch, options) => {
  requestAnimationFrame(() => {
    setDataAttribute('body', 'jsactive', 'true');
    dispatch(options.action);
  });
};

export const displayPopupFx = () => [
  slidePopupIn,
  {
    action: slideIn,
  },
];

export const onCssLoadError = (_) => {
  console.log('privacy-policy: could not load cookie consent popup css');
  // remove();
};

export const loadCss = (onLoad) => {
  injectInHead(
    createCssLink(cssUrlFromScript(JS_AND_CSS_BASENAME), onLoad, onCssLoadError)
  );
};

export const onDismissal = (state) => [
  setListener,
  {
    type: transitionEndEventName(),
    selector: POPUP_CONTAINER_SELECTOR,
    dispatchable: [state, removePopupFx(POPUP_SELECTOR)],
  },
];

export const onAppearance = (state) => [
  setListener,
  {
    type: transitionEndEventName(),
    selector: POPUP_CONTAINER_SELECTOR,
    dispatchable: [state, setFocusFx(COOKIE_POLICY_DESCRIPTION_TOP_SELECTOR)],
  },
];

export const popupHandler = ({ optInFx, optOutFx }) => {
  const props = {
    lang: lang(),
    Accept: slideOut(optInFx),
    Refuse: slideOut(optOutFx),
  };

  const displayPopup = () =>
    app({
      init: [{ displayed: false }, displayPopupFx()],
      view: buildPopup(props),
      subscriptions: (state) => [
        // set listener to remove popup at end of slideout animation
        state.dismissed && onDismissal(state),
        // set listener to set focus at the end of slidein animation
        state.displayed && onAppearance(state),
      ],
      node: findInBody(PLACEHOLDER_SELECTOR),
    });

  if (findCssLink(JS_AND_CSS_BASENAME)) {
    displayPopup();
  } else {
    loadCss(displayPopup);
  }
};

export const popupController = () => {
  if (widgetController()) {
    // indicate that widthe was displayed
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

export default popupController;

export { slideOut } from './effects.js';
