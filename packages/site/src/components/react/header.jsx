import { basePath, langHrefMaker, pageHrefMaker } from '../js/client-utils.js';

import EPLogo from './ep-logo.jsx';
import Header from './header/index.jsx';

import PageLinks, { linkMaker, headerLinkMaker } from './page-links.jsx';

import LanguageLinks, { languageLinkMaker } from './language-links.jsx';

export const HearingHeader = ({
  lang,
  currentPage,
  hearingsLabel,
  hearingsPath,
  languages,
  epLogoAltText,
  pageLabels,
  headerProps,
}) => {
  const logoURL = `/${basePath}/assets/img/logos/logo-ep-${lang}.svg`;

  const epLogo = <EPLogo lang={lang} altText={epLogoAltText} url={logoURL} />;

  const makePageHref = pageHrefMaker(lang);

  const makeHeaderPageLink = headerLinkMaker({
    currentPage: null,
    makePageHref,
  });

  const makeHeaderPageLinkMobile = linkMaker({
    currentPage: null,
    makePageHref,
    liAttributes: { className: 'level1 main' },
  });

  const pageLinks = (
    <PageLinks makePageLink={makeHeaderPageLink} pageLabels={pageLabels} />
  );

  const pageLinksMobile = (
    <PageLinks
      makePageLink={makeHeaderPageLinkMobile}
      pageLabels={pageLabels}
    />
  );

  const makeLangHref = langHrefMaker(currentPage);
  const languageLinks = (
    <LanguageLinks
      languages={languages}
      makeLanguageLink={languageLinkMaker({
        lang,
        makeLangHref,
      })}
    />
  );
  return (
    <Header
      {...{
        lang,
        epLogo,
        pageLinks,
        hearingsLabel,
        hearingsPath,
        currentPage,
        pageLinksMobile,
        languageLinks,
        ...headerProps,
      }}
    />
  );
};

export default HearingHeader;
