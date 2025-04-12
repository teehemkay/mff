'use client';

import { useState, useEffect, useRef } from 'react';

export const backSVG = (
  <svg x="0px" y="0px" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <rect
      width={24}
      height={24}
      style={{
        fill: 'none',
      }}
    />
    <path
      d="M16.2,4.5L9.1,12l3.5,3.6l3.7,3.9"
      style={{
        fill: 'none',
        stroke: '#FFFFFF',
        strokeWidth: 2,
      }}
    />
  </svg>
);

export const closeSVG = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="none"
    aria-hidden="true">
    <g fill="#fff" stroke="#fff" strokeWidth="1" opacity="0.2">
      <rect width="24" height="24" stroke="none" />
      <rect x="0.5" y="0.5" width="23" height="23" fill="none" />
    </g>
    <g transform="translate(-395.835 -487.415)">
      <g transform="translate(400.835 492.415)">
        <path d="M0,0,14,14" fill="none" stroke="#0c4da2" strokeWidth="2" />
      </g>
      <g transform="translate(400.835 492.415)">
        <path
          d="M-9,0-23,14"
          transform="translate(23)"
          fill="none"
          stroke="#0c4da2"
          strokeWidth="2"
        />
      </g>
    </g>
  </svg>
);

export const chevronSVG = (
  <svg
    className="inline-block w-[15px] h-[9px]"
    viewBox="0 0 21.741 12.602"
    aria-hidden="true"
    focusable="false">
    <path
      id="Arrow"
      d="M0,.055,9.8,9.442,14.545,4.9,19.666,0"
      transform="translate(1.037 1.083)"
      fill="none"
      stroke="#024ea2"
      strokeWidth={3}
    />
  </svg>
);

export const showPages = ({ title, children, handleMenu }) => (
  <ul className="main-menu flex flex-wrap items-center mx-3 my-2">
    {children}
    <li className="level1 button">
      <a
        role="button"
        data-expanded="false"
        href="#"
        onClick={handleMenu({ level: 1 })}>
        <span className="mr-3 pointer-events-none">{title}</span>
        {chevronSVG}
      </a>
    </li>
  </ul>
);

export const sectionItem =
  ({ headings, handleMenu }) =>
  (key) => (
    <li key={key} className="level2 button">
      <a
        data-expanded="false"
        role="button"
        href="#"
        onClick={handleMenu({ level: 2, key })}>
        <span className="mr-3 pointer-events-none">{headings[key]}</span>
        {chevronSVG}
      </a>
    </li>
  );

export const showSections = ({ overview, headings, handleMenu }) => (
  <ul
    className="main-menu flex flex-wrap items-center mx-3 my-2"
    role="presentation">
    <li className="level1 button" role="presentation">
      <a role="button" className="none" data-expanded="true" href="#" />
      <ul>
        <li className="level2">
          <a href={overview.url}>{overview.label}</a>
        </li>
        {[1, 3, 2].map(sectionItem({ headings, handleMenu }))}
      </ul>
    </li>
  </ul>
);

export const urlItem = ({ key, label, url }) => (
  <li key={key}>
    <a href={url}>{label}</a>
  </li>
);

export const showSection = (items) => {
  return (
    <ul
      className="main-menu flex flex-wrap items-center mx-3 my-2"
      role="presentation">
      <li className="level1 button" role="presentation">
        <a role="button" className="none" data-expanded="true" href="#" />
        <ul>{items.map(urlItem)}</ul>
      </li>
    </ul>
  );
};

export const Menu = ({
  mainNav,
  menu,
  subMenu,
  openMenu,
  closeMenu,
  previousMenu,
  title,
  headings,
  items,
  children,
}) => {
  const [state, setState] = useState({ open: false, level: -1, key: -1 });

  const shouldEnableBackButton = ({ open, level }) => open && level > 0;

  const backButtonLabel = ({ level, key }) =>
    level === 1 ? title : key === -1 ? '' : headings[key];

  const backButtonA11yLabel = ({ open, level, key }) =>
    shouldEnableBackButton({ open, level })
      ? `${backButtonLabel({
          level,
          key,
        })} - ${subMenu}. ${previousMenu}.`
      : '';

  const backButtonClass = (state) =>
    `backBtn${shouldEnableBackButton(state) ? '' : ' none'}`;

  const backButtonIcon = (state) =>
    shouldEnableBackButton(state) ? backSVG : '';

  const handleMenu =
    ({ level, key }) =>
    (event) => {
      event.preventDefault();

      setState({ open: open || true, level, key: key || -1 });
    };

  const menuButtonRef = useRef(null);
  const backButtonRef = useRef(null);

  const showMenu = ({ level, key }) => {
    switch (level) {
      case 0: {
        return showPages({ title, children, handleMenu });
      }

      case 1: {
        return showSections({
          overview: items[0][0],
          headings,
          handleMenu,
        });
      }

      case 2: {
        return showSection(items[key]);
      }

      default: {
        return null;
      }
    }
  };

  const toggleMobileMenu = (event) => {
    event.preventDefault();

    const mainNav = document.querySelector('nav#mainNav');
    const mainDiv = document.querySelector('main#mainContent');
    const header = document.querySelector('header#header');
    const footer = document.querySelector('footer.footer');

    const logo = header.querySelector('.logo');
    const languageNavigation = header.querySelector('nav.lang-nav');

    const { open } = state;

    if (open) {
      // closing the menu
      header.removeAttribute('role');
      mainNav.classList.remove('none');
      mainDiv.classList.remove('none');
      footer.classList.remove('none');
      logo.classList.remove('none');
      languageNavigation.classList.remove('none');

      setState({ open: !open, level: -1, key: -1 });

      document.querySelector('a#mainMenuButton').focus();
    } else {
      // opening  the menu
      header.setAttribute('role', 'presentation');
      mainNav.classList.add('none');
      mainDiv.classList.add('none');
      footer.classList.add('none');
      logo.classList.add('none');
      languageNavigation.classList.add('none');

      setState({ open: !open, level: 0, key: -1 });
    }
  };

  const backButtonHandler = ({ level }) =>
    handleMenu({
      level: shouldEnableBackButton(state) ? level - 1 : -1,
      key: -1,
    });

  const { open } = state;

  useEffect(() => {
    if (state.open) {
      if (state.level > 0) {
        backButtonRef?.current.focus();
      } else {
        menuButtonRef?.current.focus();
      }
    }
  }, [state, backButtonRef, menuButtonRef]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.keyCode === 27) {
        toggleMobileMenu(event);
      }
    };

    if (state.open) {
      document.body.addEventListener('keyup', closeOnEscape);
    }

    return () => document.body.removeEventListener('keydown', closeOnEscape);
  });

  const navWrapperProps = open ? { 'aria-modal': true } : {};

  return (
    <div className="mobile-menu flex justify-end">
      <div
        id="navWrapper"
        className="navWrapper"
        role={open ? 'dialog' : 'navigation'}
        aria-label={mainNav}
        {...navWrapperProps}>
        <div className="divNavigation" id="divNavigation">
          <div id="divBack" className="divBack">
            <a
              ref={backButtonRef}
              href="#"
              id="back"
              role="button"
              data-expanded={shouldEnableBackButton(state)}
              aria-label={backButtonA11yLabel(state)}
              className={backButtonClass(state)}
              onClick={backButtonHandler(state)}>
              {backButtonIcon(state)}
            </a>
          </div>
          <div id="divMenuTitle" className="divMenuTitle" aria-hidden="true">
            {backButtonLabel(state)}
          </div>
          <div id="divmainMenuButton" className="divmainMenuButton">
            <a
              ref={menuButtonRef}
              id="mainMenuButton"
              role="button"
              href=""
              aria-label={open ? closeMenu : openMenu}
              data-expanded={open ? 'true' : 'false'}
              onClick={toggleMobileMenu}>
              {open ? closeSVG : menu}
              {open ? null : (
                <svg
                  className="inline-block ml-3 w-[15px] h-[9px]"
                  viewBox="0 0 21.741 12.602"
                  aria-hidden="true"
                  focusable="false">
                  <path
                    id="Arrow"
                    d="M0,.055,9.8,9.442,14.545,4.9,19.666,0"
                    transform="translate(1.037 1.083)"
                    fill="none"
                    stroke="#024ea2"
                    strokeWidth="3"></path>
                </svg>
              )}
            </a>
          </div>
        </div>
        {open ? showMenu(state) : null}
      </div>
    </div>
  );
};

export default Menu;
