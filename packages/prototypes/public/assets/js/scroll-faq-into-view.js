// Determine elementID
const idFromPathname = (pathname) => {
  const segments = pathname.split('/').filter((segment) => segment !== '');

  if (segments.length !== 3) {
    console.warn(`Wrong number of path segment (should be 3): ${pathname}`);

    return null;
  }

  const segment = segments[segments.length - 1];

  // test that it's a FAQ ID
  return /^q\d+$/.test(segment) ? segment : null;
};

/**
 * Scrolls an element into the center of the viewport if its ID
 * is found in the URL path (/.../.../q<number>/), using only const.
 */
export const scrollTargetFromUrlToMiddle = () => {
  const elementID = idFromPathname(window.location.pathname);
  if (!elementID) {
    console.log(`No ID found in ${window.location.pathname}.`);
    return;
  }

  const faqID = `#content-${elementID}`;
  const element = document.querySelector(faqID);

  if (!element) {
    console.log(`Element with ID "${faqID}" found in URL but not on page.`);
    return;
  }

  element.scrollIntoView({
    behavior: 'smooth', // Or 'auto'
    block: 'center',
  });
  console.log(`Scrolled to element with ID: ${elementID}`);
};

// Option 1: Using DOMContentLoaded (fires sooner)
document.addEventListener('DOMContentLoaded', scrollTargetFromUrlToMiddle);
