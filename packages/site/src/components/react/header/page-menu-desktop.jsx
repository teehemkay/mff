export const ERMenuItem = ({ title, isMenuOpen, handleClick }) => (
  <li>
    <div className="relative">
      <button
        type="button"
        id="er-menu"
        className="er-menu"
        aria-expanded={isMenuOpen}
        aria-controls="er-menu-items"
        onClick={handleClick}>
        <span className="inline-block pt-0.5 mr-2">{title}</span>
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
            strokeWidth="3"
          />
        </svg>
      </button>
    </div>
  </li>
);

export const PageMenu = ({
  mainNav,
  menu,
  electionResultsMenuItems,
  isMenuOpen,
  handleClick,
  children,
}) => {
  const title = electionResultsMenuItems.title;

  return (
    <div className="desktop-menu flex justify-end">
      <nav role="navigation" aria-label={mainNav} className="default-menu">
        <div className="desktop-menu-display">
          <ul className="navList lg:mr-1">
            {children}
            <ERMenuItem {...{ menu, isMenuOpen, handleClick, title }} />
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default PageMenu;
