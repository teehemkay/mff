export const makeLabel = ({ id, native }) => `${id.toUpperCase()} - ${native}`;

export const LanguageLink = ({ attributes, id, label, href }) => (
  /* eslint-disable react/jsx-no-target-blank */
  <li>
    <a lang={id} hrefLang={id} href={href} {...attributes}>
      {label}
    </a>
  </li>
  /* eslint-enable react/jsx-no-target-blank */
);

export const languageLinkMaker =
  ({ lang, makeLangHref }) =>
  ({ id, native }) => {
    const attributes =
      id === lang ? { className: 'current', 'aria-current': 'true' } : {};
    const label = makeLabel({ id, native });
    const href = makeLangHref(id);

    return <LanguageLink key={id} {...{ attributes, id, label, href }} />;
  };

export const LanguageLinks = ({ languages, makeLanguageLink }) => {
  return <>{languages.map(makeLanguageLink)}</>;
};

export default LanguageLinks;
