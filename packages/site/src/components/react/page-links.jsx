export const PageLink = ({ liAttributes, aAttributes, label }) => {
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

export const linkMaker =
  ({ currentPage, makePageHref, liAttributes }) =>
  ({ key, label }) => {
    const href = makePageHref(key);
    const aAttributes =
      key === currentPage
        ? {
            href,
            className: 'current',
            'aria-current': 'page',
          }
        : { href };

    return <PageLink key={key} {...{ liAttributes, aAttributes, label }} />;
  };

export const headerLinkMaker =
  ({ currentPage, makePageHref }) =>
  ({ key, label }) => {
    const href = makePageHref(key);
    const liAttributes = key === currentPage ? { className: 'current' } : {};
    const aAttributes =
      key === currentPage
        ? {
            href,
            'aria-current': 'page',
          }
        : { href };

    return <PageLink key={key} {...{ liAttributes, aAttributes, label }} />;
  };

export const PageLinks = ({ makePageLink, pageLabels }) => {
  return <>{pageLabels.map(makePageLink)}</>;
};

export default PageLinks;
