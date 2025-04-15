// Determine elementId
const idFromPathname = (pathname) => {
  const segments = pathname.split('/').filter((segment) => segment !== '');

  if (segments.length !== 3) {
    console.warn(`Wrong number of path segment (should be 3): ${pathname}`);

    return null;
  }

  const segment = segments[segments.length - 1];

  // test that it's a FAQ ID
  /^q\d+$/.test(segment) ? segment : null;
};

/**
 * Scrolls an element into the center of the viewport if its ID
 * is found in the URL path (/.../.../q<number>/), using only const.
 */
export const scrollTargetFromUrlToMiddle = () => {
  const elementId = idFromPathname(window.location.pathname);
  if (!elementId) {
    console.warn(`No ID found in ${window.location.pathname}.`);
  }

  const element = document.getElementById(elementId);

  if (!element) {
    console.warn(
      `Element with ID "${elementId}" found in URL but not on page.`
    );
  }

  element.scrollIntoView({
    behavior: 'smooth', // Or 'auto'
    block: 'center',
  });
  console.log(`Scrolled to element with ID: ${elementId}`);
};

// Option 1: Using DOMContentLoaded (fires sooner)
document.addEventListener('DOMContentLoaded', scrollTargetFromUrlToMiddle);
