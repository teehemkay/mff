/** @jsx jsx */

import { jsx } from './jsx.js';

export const domainTokens = {
  default: 'europarl',
};

export const link = (url, label) => (
  <a
    href={url}
    style={{ textDecoration: 'underline', color: 'inherit' }}
    className="cc-link-default">
    {label}
  </a>
);

export const domainTag = (label) => (
  <div className="epjs_tag-url">
    <span className="tag-url">{label}</span>
  </div>
);
