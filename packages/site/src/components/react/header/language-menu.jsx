export const LanguageMenuButton = ({
  lang,
  languages,
  switchLanguage,
  isMenuOpen,
  handleClick,
}) => {
  const langLabel = languages.find((language) => language.id === lang)?.native;

  return (
    <nav
      role="navigation"
      aria-label={switchLanguage}
      className="lang-nav flex justify-end">
      <div className="expand-collapse">
        <button
          type="button"
          id="lang-menu"
          className="nav-button flex items-center rounded-md border border-1 border-solid border-black-greymiddle focus:outline focus:outline-2 focus:outline-blue-focus px-2.5 py-1 mr-2 sm:mr-3"
          aria-expanded={isMenuOpen}
          aria-controls="language-list"
          onClick={handleClick}>
          <span className="inline-block text-base font-EPGammaRegular pt-0.5 mr-3">
            {lang.toUpperCase()}
            <span className="sr-only"> - {langLabel}</span>
          </span>
          <svg
            className="inline-block w-[15px] h-[9px]"
            viewBox="0 0 21.741 12.602"
            aria-hidden="true"
            focusable="false">
            <path
              d="M0,.055,9.8,9.442,14.545,4.9,19.666,0"
              transform="translate(1.037 1.083)"
              fill="none"
              stroke="#024ea2"
              strokeWidth="3"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export const LanguageMenuItems = ({ isMenuOpen, children }) => {
  return (
    <div
      id="language-list"
      className={`submenu-content${isMenuOpen ? '' : ' hidden'}`}>
      <ul className="lang-content block px-6 mx-auto max-w-[1100px]">
        {children}
      </ul>
    </div>
  );
};

export default LanguageMenuButton;
