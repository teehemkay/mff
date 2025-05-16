/** @jsx jsx */
/* globals define */

import { app } from 'hyperapp';

import { jsx } from './jsx.js';
import { lang, findInBody } from './dom.js';

import { cookieHandler } from './cookies.js';
import { translations } from './widget-translations.js';
import { OPTED_IN, OPTED_OUT, NO_CHOICE } from './constants.js';

export const PLACEHOLDER_SELECTOR = '#ep-opt-js';

export const descriptionLabels = {
  [OPTED_IN]: 'optInDesc',
  [OPTED_OUT]: 'optOutDesc',
  [NO_CHOICE]: 'chooseDesc',
};

export const descriptionLabel = ({ lang, status }) =>
  translations(lang)[descriptionLabels[status]];

export const labels = (lang) => {
  const { optInLabel, optOutLabel } = translations(lang);
  return { optInLabel, optOutLabel };
};

export const Update = (effecters) => (state, status) => [
  {
    ...state,
    status,
  },
  [effecters],
];

export const OnChange = (effecters) => (_, event) => [
  Update(effecters), // eslint-disable-line new-cap
  event.target.value,
];

export const widget =
  ({ lang, optInLabel, optOutLabel, OptIn, OptOut }) =>
  ({ status }) => (
    <div class="ep_gridcolumn-content" id="ep-opt-js">
      <form action="" id="ep_opt" class="ep_opt-form">
        <fieldset>
          <div class="ep-a_text">
            <p>{descriptionLabel({ lang, status })}</p>
          </div>
          <div class="ep_cookies-form-field">
              <input
                id="a11y-issue-1"
                name="cookies-validation"
                type="radio"
                value={OPTED_OUT}
                checked={status === OPTED_OUT}
                onChange={OptOut}
              />
              <label htmlFor="a11y-issue-1">{optOutLabel}</label>
            </div>
            <div class="ep_cookies-form-field">
              <input
                id="a11y-issue-2"
                name="cookies-validation"
                type="radio"
                value={OPTED_IN}
                checked={status === OPTED_IN}
                onChange={OptIn}
              />
              <label htmlFor="a11y-issue-2">{optInLabel}</label>
            </div>
        </fieldset>
      </form>
    </div>
  );

export const buildWidget = ({ lang, OptIn, OptOut }) =>
  widget({
    lang,
    ...labels(lang),
    OptIn,
    OptOut,
  });

export const widgetHandler = ({ status, optInFx, optOutFx }) => {
  const props = {
    status,
    lang: lang(),
    OptIn: OnChange(optInFx), // eslint-disable-line new-cap
    OptOut: OnChange(optOutFx), // eslint-disable-line new-cap
  };

  const displayWidget = () => {
    app({
      init: { status },
      view: buildWidget(props),
      node: findInBody(PLACEHOLDER_SELECTOR),
    });
  };

  if (typeof define === 'function' && define.amd) {
    define('privacy-policy', () => ({
      addOptIO: displayWidget,
    }));
  } else {
    displayWidget();
  }
};

export const widgetController = () => {
  const [status, { optInFx, optOutFx }] = cookieHandler();

  if (findInBody(PLACEHOLDER_SELECTOR)) {
    widgetHandler({ status, optInFx, optOutFx });
    return true;
  }

  return false;
};

export default widgetController;
