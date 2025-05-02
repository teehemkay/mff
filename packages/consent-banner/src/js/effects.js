import { findInBody, removeElement, setFocus } from './dom.js';

export const slideIn = (_) => ({ displayed: true, dismissed: false });
export const slideOut = (effecters) => (_) => [
  { displayed: false, dismissed: true },
  [effecters],
];

export const setListener = (dispatch, props) => {
  const element = findInBody(props.selector);
  const listener = (event) =>
    requestAnimationFrame(() => dispatch(props.dispatchable, event));

  if (element) {
    element.addEventListener(props.type, listener);
    return () => element.removeEventListener(props.type, listener);
  }

  return () => {};
};

export const removePopup = (dispatch, options) => {
  requestAnimationFrame(() => {
    removeElement(options.selector);
    dispatch(() => undefined);
  });
};

export const removePopupFx = (selector) => [removePopup, { selector }];

export const setFocusOnElement = (/* dispatch */ _, options) => {
  requestAnimationFrame(() => {
    setFocus(options.selector);
  });
};

export const setFocusFx = (selector) => [setFocusOnElement, { selector }];
