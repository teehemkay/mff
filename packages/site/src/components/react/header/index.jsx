'use client';

import { useEffect, useState } from 'react';

import PageMenuDesktop from './page-menu-desktop.jsx';
import PageMenuDesktopItems from './page-menu-desktop-items.jsx';
import PageMenuMobile from './page-menu-mobile.jsx';
import { LanguageMenuButton, LanguageMenuItems } from './language-menu.jsx';

export const hearingsLink = ({ lang, currentPage, label, path }) => {
  const liAttributes = currentPage === path ? { className: 'current' } : {};
  const aAttributes =
    currentPage === path
      ? { 'aria-current': 'page', href: `/${path}/${lang}/` }
      : { href: `/${path}/${lang}/` };

  return (
    /* eslint-disable react/jsx-no-target-blank */
    <li {...liAttributes}>
      <a rel="noreferrer" {...aAttributes}>
        {label}
      </a>
    </li>
    /* eslint-enable react/jsx-no-target-blank */
  );
};

export const Header = ({
  lang,
  epLogo,
  hearingsLabel,
  hearingsPath,
  currentPage,
  pageLinks,
  pageLinksMobile,
  languageLinks,
  pageMenuProps,
  languageMenuProps,
}) => {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [erMenuOpen, setERMenuOpen] = useState(false);

  const toggleLangMenu = () => {
    if (erMenuOpen) {
      toggleERMenu();
    }

    setLangMenuOpen(!langMenuOpen);
  };

  const toggleERMenu = () => {
    if (langMenuOpen) {
      toggleLangMenu();
    }

    if (erMenuOpen) {
      document.querySelector('button#lang-menu').removeAttribute('tabindex');
    } else {
      document.querySelector('button#lang-menu').setAttribute('tabindex', '-1');
    }

    setERMenuOpen(!erMenuOpen);
  };

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.keyCode === 27) {
        if (erMenuOpen) {
          toggleERMenu();
          document.querySelector('button#er-menu').focus();
        }

        if (langMenuOpen) {
          toggleLangMenu();
          document.querySelector('button#lang-menu').focus();
        }
      }
    };

    document.body.addEventListener('keyup', closeOnEscape);

    return () => document.body.removeEventListener('keyup', closeOnEscape);
  });

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1080px)');

    const resetERMenu = (s) => {
      if (s.matches && erMenuOpen) {
        toggleERMenu();
      }
    };

    query.addEventListener('change', resetERMenu);

    return () => query.removeEventListener('change', resetERMenu);
  });

  const pageMenuMobileProps = {
    ...pageMenuProps.electionResultsMenuItems,
    ...pageMenuProps.mobile,
  };

  const fHearingsPageLink = false;

  return (
    <header id="header" className="min-h-[72px] shadow-md">
      <div className="lg:max-w-6xl lg:mx-auto relative flex flex-wrap items-center justify-between py-2">
        {epLogo}
        <div className="flex items-center ml-auto justify-end pb-0">
          <PageMenuDesktop
            isMenuOpen={erMenuOpen}
            handleClick={toggleERMenu}
            {...pageMenuProps}>
            {pageLinks}
            {fHearingsPageLink &&
              hearingsLink({
                lang,
                currentPage,
                label: hearingsLabel,
                path: hearingsPath,
              })}
          </PageMenuDesktop>

          <PageMenuMobile {...pageMenuMobileProps}>
            {pageLinksMobile}
            {fHearingsPageLink &&
              hearingsLink({
                lang,
                currentPage,
                label: hearingsLabel,
                path: hearingsPath,
              })}
          </PageMenuMobile>

          <LanguageMenuButton
            {...languageMenuProps}
            isMenuOpen={langMenuOpen}
            handleClick={toggleLangMenu}
          />
        </div>
      </div>

      <PageMenuDesktopItems
        isMenuOpen={erMenuOpen}
        menuItems={pageMenuProps.electionResultsMenuItems}
      />

      <LanguageMenuItems isMenuOpen={langMenuOpen}>
        {languageLinks}
      </LanguageMenuItems>
    </header>
  );
};

export default Header;
