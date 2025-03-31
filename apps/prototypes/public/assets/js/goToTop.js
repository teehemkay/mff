/* eslint-env browser */

// The *absolute* value of SCROLLPOSITION indicates the postion
// to be reached by the widow top. Its *sign* indicates the
// scrolling direction: negative when scrolling down and positive
// when scrolling up.
// If present, the FOCUSON designates the element to receive focus
// upon completion of the scrolling.
const scrollTo = (scrollPosition, focusOn) => () => {
  const delta = window.pageYOffset - Math.abs(scrollPosition);
  // Similar to SCROLLPOSITION, DELTA's sign indicates the scrolling direction
  const keepScrolling = scrollPosition < 0 ? delta < 0 : delta > 0;
  // The ratio of the current delta that we will scroll
  // Increase its value for a smoother / slower scroll or decrease it for a
  // faster / less smooth scroll.
  const scrollRatio = 10;
  // Always move by at least 1 pixel to avoid asymptotic proximity to SCROLLPOSITION
  // but never actually reaching it.
  const scrollAmount = delta < 0 ? Math.floor(delta / scrollRatio) : Math.ceil(delta / scrollRatio);

  // Use requestAnimationFrame for smooth scrolling
  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  if (keepScrolling) {
    window.requestAnimationFrame(scrollTo(scrollPosition, focusOn));
    window.scrollTo(0, window.pageYOffset - scrollAmount);
  } else if (focusOn) {
    // We've reached scrollPosition, we set the focus as required
    focusOn.focus();
  }
};
const topOfPage = (scrollPosition, focusOn) => {
  // SMOOTH SCROLL TOP OF THE PAGE

  // Set a variable for our button element.
  const scrollToTopButton = document.querySelector('.js-top');
  if (!scrollToTopButton) {
    return;
  }

  // Let's set up a function that shows our scroll-to-top button if we scroll beyond the height of the initial window.
  const scrollFunc = () => {
    // Get the current scroll value
    const y = window.scrollY;
    // If the scroll value is greater than the window height, let's add a class to the scroll-to-top button to show it!
    scrollToTopButton.className = y > 860 ? 'top-link show' : 'top-link hide';
  };
  window.addEventListener('scroll', scrollFunc);

  // When the button is clicked, run our Scrollto function above!
  scrollToTopButton.addEventListener('click', function scrollTop(event) {
    event.preventDefault();
    scrollTo(scrollPosition, focusOn)();
  });
};
const runJs = () => {
  const kNav = document.querySelector('#mainContent');
  kNav.setAttribute('tabindex', '-1');
  const kScrollTop = kNav.offsetTop;
  topOfPage(kScrollTop, kNav);
};
window.addEventListener('DOMContentLoaded', runJs);//# sourceMappingURL=goToTop.js.map
