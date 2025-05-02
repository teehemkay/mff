import { h, text } from 'hyperapp';

export const textify = (x) =>
  typeof x === 'string' || typeof x === 'number' ? text(x) : x;

export const jsx = (type, props, ...children) =>
  typeof type === 'function'
    ? type(props, children)
    : h(type, props || {}, children.flat().map(textify));
