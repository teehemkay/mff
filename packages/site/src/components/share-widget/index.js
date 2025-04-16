'use client';

import { useId, useRef, useState } from 'react';

import ShareOnFacebook from '../share-on-facebook/index.js';
import ShareOnTwitter from '../share-on-twitter/index.js';
import ShareOnLinkedIn from '../share-on-linkedin/index.js';
import ShareOnWhatsApp from '../share-on-whatsapp/index.js';
import CopyUrlButton from '../copy-url-button/index.js';

export const shareOn =
  ({ shareLabel, socialNetworkLabels }) =>
  (socialNetwork) =>
    `${shareLabel} ${socialNetworkLabels[socialNetwork]}`;

export const shareWidgetBuilder =
  ({ baseUrl, twitterVia, shareLabel, socialNetworkLabels, copyURLProps }) =>
  ({ segment, title }) => {
    const url = `${baseUrl}${segment}`;
    const props = {
      url,
      title,
      twitterVia,
      shareOn: shareOn({ shareLabel, socialNetworkLabels }),
    };

    const { urlCopiedToClipboard } = copyURLProps;
    const qaItem = useId();
    const [isExpanded, setIsExpanded] = useState(false);
    const ref = useRef(null);
    const toggleItem = () => {
      setIsExpanded(!isExpanded);

      ref.current.style.opacity = isExpanded ? '1' : '0';

      setTimeout(() => {
        ref.current.style.opacity = isExpanded ? '0' : '1';
      }, 10);
    };

    const [copiedToClipboard, setCopiedToClipboard] = useState(false);

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(url);
        setCopiedToClipboard(true);
        setTimeout(() => {
          setCopiedToClipboard(false);
        }, 3000);
      } catch (error) {
        console.error(`Failed to copy [${url}]: ${error}`);
      }
    };

    return (
      <div className="expand-social-share expand-container flex flex-col mt-5 relative">
        <div className="mb-3">
          <button
            type="button"
            className="expand-button items-center text-lg2 cursor-pointer border-0 flex text-blue-default underline hover:decoration-2 focus:decoration-2 focus:outline focus:outline-offset-2 focus:outline-2"
            aria-label={`${shareLabel} - ${title}`}
            aria-expanded={isExpanded}
            aria-controls={qaItem}
            onClick={toggleItem}>
            <svg
              x="0px"
              y="0px"
              viewBox="0 0 20.59 26.52"
              className="global-share-icon fill-blue-default w-5 h-5 mr-1"
              focusable="false"
              aria-hidden="true">
              <g transform="translate(-6891.308 1800)">
                <circle className="st0" cx="6895.09" cy="-1786.24" r="3.5" />
                <circle className="st0" cx="6907.09" cy="-1780.24" r="3.5" />
                <circle className="st0" cx="6907.09" cy="-1793.24" r="3.5" />
                <rect
                  x="6900.88"
                  y="-1788.38"
                  transform="matrix(0.454 -0.891 0.891 0.454 5356.8716 5175.8408)"
                  width="1.41"
                  height="10.86"
                />
                <rect
                  x="6896.16"
                  y="-1790.83"
                  transform="matrix(0.891 -0.454 0.454 0.891 1564.9807 2938.2065)"
                  width="10.86"
                  height="1.41"
                />
              </g>
            </svg>
            <span className="text-lg">{shareLabel}</span>
          </button>
        </div>
        <div className="block">
          <ul
            ref={ref}
            id={qaItem}
            className={`social-list expand-container-content block pt-4 ${
              isExpanded ? '' : 'hidden'
            }`}>
            <li>
              <ShareOnFacebook {...props} />
            </li>
            <li>
              <ShareOnTwitter {...props} />
            </li>
            <li>
              <ShareOnLinkedIn {...props} />
            </li>
            <li>
              <ShareOnWhatsApp {...props} />
            </li>
            <li>
              {' '}
              <CopyUrlButton
                copyToClipboard={copyToClipboard}
                {...copyURLProps}
              />
            </li>
          </ul>
        </div>
        <div
          aria-hidden="true"
          className={`copied-txt mt-2 ${copiedToClipboard ? '' : 'hidden'}`}>
          <span
            className={`${copiedToClipboard ? 'fx--fadeIn' : 'fx--fadeOut'}`}>
            {urlCopiedToClipboard}
          </span>
        </div>
        <div className="sr-only" role="status">
          {copiedToClipboard ? urlCopiedToClipboard : ''}
        </div>
      </div>
    );
  };

export default shareWidgetBuilder;
