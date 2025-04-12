export const erSubMenuItem = ({ key, label, url }) => (
  <li key={key}>
    <a className="header_links" href={url}>
      {label}
    </a>
  </li>
);

export const Menu = ({ isMenuOpen, menuItems }) => {
  const {
    headings: [overview, europeanResults, nationalResults, tools],
    items: [
      overviewItems,
      europeanResultsItems,
      nationalResultsItems,
      toolsItems,
    ],
  } = menuItems;

  return (
    <div
      id="er-menu-items"
      className={`submenu-content${isMenuOpen ? '' : ' hidden'}`}>
      <div className="menu-inner-wrapper max-w-[1000px] mx-auto">
        <div className="column">
          <span className="sub-nav-heading">{overview}</span>
          <ul className="sub-nav">{overviewItems.map(erSubMenuItem)}</ul>
          <span className="sub-nav-heading">{europeanResults}</span>
          <ul className="sub-nav">{europeanResultsItems.map(erSubMenuItem)}</ul>
          <span className="sub-nav-heading">{nationalResults}</span>
          <ul className="sub-nav">{nationalResultsItems.map(erSubMenuItem)}</ul>
        </div>
        <div className="column !ml-auto">
          <span className="sub-nav-heading">{tools}</span>
          <ul className="column_countries sub-nav">
            {toolsItems.map(erSubMenuItem)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
