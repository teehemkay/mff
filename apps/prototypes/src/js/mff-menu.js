// Desktop menu - custom code
const boutons = document.querySelectorAll('[data-button]');
const contenus = document.querySelectorAll('[data-content]');

boutons.forEach((bouton) => {
  bouton.addEventListener('click', () => {
    const contenuId = bouton.getAttribute('data-controls');
    const contenu = document.getElementById(contenuId);
    const isExpanded = bouton.getAttribute('aria-expanded') === 'true';

    // Fermer tous les autres contenus
    contenus.forEach((contenu) => {
      const boutonAssocie = document.querySelector(
        '[data-controls="' + contenu.id + '"]'
      );
      if (boutonAssocie !== bouton) {
        boutonAssocie.setAttribute('aria-expanded', 'false');
        contenu.classList.add('hidden');
      }
    });

    // Ouvrir ou fermer le contenu du bouton cliqué
    bouton.setAttribute('aria-expanded', !isExpanded);
    contenu.classList.toggle('hidden');
  });
});
//End desktop menu

// Mobile menu [Fernando's version]
let mainMenuButton = document.getElementById('mainMenuButton');
let r = document.getElementById('r');
let er = document.getElementById('er');
let nr = document.getElementById('nr');
let tr = document.getElementById('tr');
let navWrapper = document.getElementById('navWrapper');

let divBack = document.getElementById('divBack');
let backButton = document.getElementById('back');
let menuTitle = document.getElementById('menuTitle');
let divMenuTitle = document.getElementById('divMenuTitle');

let header = document.getElementById('header');
let main = document.getElementById('mainContent');

var mainList = document.getElementById('mainList');
var resultsList = document.getElementById('resultsList');
var euResultsList = document.getElementById('euResultsList');
var natResultsList = document.getElementById('natResultsList');
var toolsList = document.getElementById('toolsList');

document.body.addEventListener('keydown', closeOnEscape, false); // close nav on ESC
mainMenuButton?.addEventListener('click', displayMenu, false); // Use optional chaining
r?.addEventListener('click', displayMenu, false);
er?.addEventListener('click', displayMenu, false);
nr?.addEventListener('click', displayMenu, false);
tr?.addEventListener('click', displayMenu, false);
backButton?.addEventListener('click', goBack, false);

let resultsText = 'Election Results';
let euResultsText = 'European Results';
let natResultsText = 'National Results';
let toolsText = 'Tools Results';

let navigHint = ' - Submenu. Click or Enter to go to the previous menu.';
let resultsTextA11yLabel = resultsText + navigHint;
let euResultsTextA11yLabel = euResultsText + navigHint;
let natResultsTextA11yLabel = natResultsText + navigHint;
let toolsTextA11yLabel = toolsText + navigHint;

function closeOnEscape(e) {
  // Check if navWrapper exists before accessing attributes
  if (e.keyCode == 27 && navWrapper && navWrapper.hasAttribute('aria-modal')) {
    mainMenuButton?.click(); // Use optional chaining
  }
}

function goBack(e) {
  e.preventDefault();
  // Add checks for existence of elements before manipulating them
  if (!e.target || !e.target.attributes['data-from']) return;

  switch (
    e.target.attributes['data-from'].value // coming From
  ) {
    case 'r':
      if (mainList) {
        for (let child of mainList.children) {
          child.classList.remove('none');
        }
        mainList.removeAttribute('role'); // ul
        mainList.lastElementChild?.removeAttribute('role'); // li with optional chaining
      }
      if (resultsList) resultsList.classList.add('none');

      let backButtonR = document.getElementById('back');
      backButtonR?.remove(); // Use optional chaining
      if (divMenuTitle) divMenuTitle.innerHTML = '';

      r?.setAttribute('data-expanded', 'false'); // Use optional chaining
      r?.classList.remove('none');
      mainMenuButton?.classList.remove('none');

      setTimeout(() => {
        mainMenuButton?.focus(); // Use optional chaining
      }, 10);

      mainMenuButton?.setAttribute('aria-label', 'Close main navigation menu');
      mainMenuButton?.setAttribute('data-expanded', 'true');

      break; // case r

    case 'er':
      console.log('click ER back');

      if (resultsList) {
        for (let child of resultsList.children) {
          child.classList.remove('none');
          child.removeAttribute('role');
        }
        resultsList.removeAttribute('role');
      }

      if (euResultsList) euResultsList.removeAttribute('role'); // ul

      er?.setAttribute('data-expanded', 'false'); // Use optional chaining
      er?.classList.remove('none');

      r?.click(); // Use optional chaining
      break; // case er

    case 'nr':
      console.log('click NR back');
      if (resultsList) {
        for (let child of resultsList.children) {
          child.classList.remove('none');
          child.removeAttribute('role');
        }
        resultsList.removeAttribute('role');
      }

      if (natResultsList) {
        natResultsList.removeAttribute('role'); // ul
        natResultsList.lastElementChild?.removeAttribute('role'); // li
      }

      nr?.setAttribute('data-expanded', 'false'); // Use optional chaining
      nr?.classList.remove('none');

      r?.click(); // Use optional chaining
      break; // case nr

    case 'tr':
      console.log('click TR back');
      if (resultsList) {
        for (let child of resultsList.children) {
          child.classList.remove('none');
          child.removeAttribute('role');
        }
        resultsList.removeAttribute('role');
      }

      if (toolsList) {
        toolsList.removeAttribute('role'); // ul
        toolsList.lastElementChild?.removeAttribute('role'); // li
      }

      tr?.setAttribute('data-expanded', 'false'); // Use optional chaining
      tr?.classList.remove('none');

      r?.click(); // Use optional chaining
      break; // case tr
  } // sw
} // fn

function displayMenu(e) {
  e.preventDefault();

  // Ensure elements exist before manipulating
  if (
    !navWrapper ||
    !main ||
    !header ||
    !mainMenuButton ||
    !mainList ||
    !divMenuTitle ||
    !divBack
  )
    return;

  // if the menu is displayed we change and block a few things
  navWrapper.setAttribute('role', 'dialog');
  navWrapper.setAttribute('aria-modal', 'true');
  navWrapper.setAttribute('aria-label', 'Navigation');

  main.classList.add('none');
  header.setAttribute('role', 'presentation');

  switch (e.target.id) {
    case 'mainMenuButton':
      let currentMainMenuButton = document.getElementById('mainMenuButton'); // Re-fetch in case it was replaced

      if (
        !currentMainMenuButton.attributes['data-expanded'] ||
        currentMainMenuButton.attributes['data-expanded'].value == 'true'
      ) {
        currentMainMenuButton.setAttribute('data-expanded', 'false');
        currentMainMenuButton.setAttribute(
          'aria-label',
          'Open main navigation menu (opens in a dialog)'
        );
        currentMainMenuButton.innerHTML = 'Menu'; // Or keep SVG if preferred

        header.removeAttribute('role');
        document
          .querySelectorAll('li')
          .forEach((el) => el.removeAttribute('role'));
        document
          .querySelectorAll('ul')
          .forEach((el) => el.removeAttribute('role'));
        document
          .querySelectorAll('a[role="button"]')
          .forEach((el) => el.setAttribute('data-expanded', 'false'));

        mainList.classList.add('none');
        if (resultsList) resultsList.classList.add('none'); // Add check
        r?.classList.remove('none');
        er?.classList.remove('none');
        nr?.classList.remove('none');
        tr?.classList.remove('none');

        divMenuTitle.innerHTML = '';
        divBack.innerHTML = '';

        navWrapper.setAttribute('role', 'navigation');
        navWrapper.removeAttribute('aria-modal');
        navWrapper.setAttribute('aria-label', 'Main navigation');

        main.classList.remove('none');

        setTimeout(() => {
          currentMainMenuButton.focus();
          // Simplified iOS/Mac check
          if (navigator.vendor && navigator.vendor.includes('Apple')) {
            console.log('apple');
            setTimeout(() => {
              currentMainMenuButton.blur();
            }, 500);
          } else {
            console.log('No apple');
          }
        }, 50);
      } else {
        // Ensure divmainMenuButton exists
        let divmainMenuButton = document.getElementById('divmainMenuButton');
        if (!divmainMenuButton) return;

        // Remove old button if exists
        currentMainMenuButton?.remove();

        // Create and prepend new button
        let newMainMenuButton = document.createElement('a');
        newMainMenuButton.setAttribute('data-expanded', 'true');
        newMainMenuButton.setAttribute('id', 'mainMenuButton');
        newMainMenuButton.setAttribute('role', 'button');
        newMainMenuButton.setAttribute(
          'aria-label',
          'Close main navigation menu'
        );
        newMainMenuButton.setAttribute('href', '#');
        newMainMenuButton.innerHTML = 'X'; // Or keep original SVG close icon if preferred
        divmainMenuButton.prepend(newMainMenuButton);
        newMainMenuButton.addEventListener('click', displayMenu, false);

        // Update global reference
        mainMenuButton = newMainMenuButton;

        setTimeout(() => {
          newMainMenuButton.focus();
        }, 50);
        mainList.classList.remove('none');
        document
          .querySelectorAll('.main')
          .forEach((el) => el.classList.remove('none'));
      }
      break;

    case 'r': // election results
      if (!r || !resultsList || !divMenuTitle || !divBack) return; // Check required elements

      if (r.attributes['data-expanded'].value == 'false') {
        resultsList.classList.remove('none');
        r.setAttribute('data-expanded', 'true');
        document
          .querySelectorAll('.main')
          .forEach((el) => el.classList.add('none'));

        divMenuTitle.innerHTML = resultsText;

        let backButtonR = document.getElementById('back');
        backButtonR?.remove();
        backButtonR = document.createElement('a');
        // ... set attributes for backButtonR ...
        backButtonR.setAttribute('data-expanded', 'true');
        backButtonR.setAttribute('id', 'back');
        backButtonR.setAttribute('role', 'button');
        backButtonR.setAttribute('aria-label', resultsTextA11yLabel);
        backButtonR.setAttribute('data-from', 'r');
        backButtonR.setAttribute('href', '#');
        backButtonR.appendChild(document.createTextNode('<')); // Use SVG later if preferred
        divBack.prepend(backButtonR);
        backButtonR.addEventListener('click', goBack, false);

        setTimeout(() => {
          backButtonR.focus();
        }, 50);

        mainList.setAttribute('role', 'presentation');
        mainList.lastElementChild?.setAttribute('role', 'presentation');

        document
          .querySelectorAll('.level2')
          .forEach((el) => el.classList.remove('none'));

        if (euResultsList) euResultsList.classList.add('none');
        if (natResultsList) natResultsList.classList.add('none');
        if (toolsList) toolsList.classList.add('none');

        r.classList.add('none');

        mainMenuButton?.setAttribute(
          'aria-label',
          'Close main navigation menu'
        );
        mainMenuButton?.removeAttribute('data-expanded');
      } else {
        let backButtonInstance = document.getElementById('back');
        backButtonInstance?.remove();
        divMenuTitle.innerHTML = '';
      }
      break;

    // Cases 'er', 'nr', 'tr' need similar checks for element existence
    // before accessing attributes or methods.
    // Simplified example for 'er':
    case 'er':
      if (
        !er ||
        !euResultsList ||
        !resultsList ||
        !divMenuTitle ||
        !divBack ||
        !r
      )
        return;

      if (er.attributes['data-expanded'].value == 'false') {
        euResultsList.classList.remove('none'); // ul

        document.querySelectorAll('.level2').forEach(function (el) {
          if (el == er.parentElement) {
            er.parentElement.setAttribute('role', 'presentation');
          } else {
            el.classList.add('none');
          }
        });

        let backButtonER = document.getElementById('back');
        backButtonER?.remove();
        backButtonER = document.createElement('a');
        // ... set attributes for backButtonER ...
        backButtonER.setAttribute('data-expanded', 'true');
        backButtonER.setAttribute('id', 'back');
        backButtonER.setAttribute('role', 'button');
        backButtonER.setAttribute('aria-label', euResultsTextA11yLabel);
        backButtonER.setAttribute('data-from', 'er');
        backButtonER.setAttribute('href', '#');
        backButtonER.appendChild(document.createTextNode('<'));
        divBack.prepend(backButtonER);
        backButtonER.addEventListener('click', goBack, false);

        setTimeout(() => {
          backButtonER.focus();
        }, 50);

        resultsList.setAttribute('role', 'presentation');
        mainList.lastElementChild?.setAttribute('role', 'presentation');

        er.classList.add('none');
        divMenuTitle.innerHTML = euResultsText;

        mainMenuButton?.setAttribute(
          'aria-label',
          'Close main navigation menu'
        );
        mainMenuButton?.removeAttribute('data-expanded');
      } else {
        er.setAttribute('data-expanded', 'false');
        euResultsList.classList.add('none');
      }
      r.setAttribute('data-expanded', 'false');
      break;

    // Implement similar robust checks for 'nr' and 'tr'
    case 'nr':
      if (
        !nr ||
        !natResultsList ||
        !resultsList ||
        !divMenuTitle ||
        !divBack ||
        !r
      )
        return;
      // ... rest of nr logic with checks ...
      if (nr.attributes['data-expanded'].value == 'false') {
        natResultsList.classList.remove('none');

        document.querySelectorAll('.level2').forEach(function (el) {
          if (el == nr.parentElement) {
            nr.parentElement.setAttribute('role', 'presentation');
          } else {
            el.classList.add('none');
          }
        });

        let backButtonNR = document.getElementById('back');
        backButtonNR?.remove();
        backButtonNR = document.createElement('a');
        // ... set attributes for backButtonNR ...
        backButtonNR.setAttribute('data-expanded', 'true');
        backButtonNR.setAttribute('id', 'back');
        backButtonNR.setAttribute('role', 'button');
        backButtonNR.setAttribute('aria-label', natResultsTextA11yLabel);
        backButtonNR.setAttribute('data-from', 'nr');
        backButtonNR.setAttribute('href', '#');
        backButtonNR.appendChild(document.createTextNode('<'));
        divBack.prepend(backButtonNR);
        backButtonNR.addEventListener('click', goBack, false);

        setTimeout(() => {
          backButtonNR.focus();
        }, 50);

        resultsList.setAttribute('role', 'presentation');
        mainList.lastElementChild?.setAttribute('role', 'presentation');

        nr.classList.add('none');
        divMenuTitle.innerHTML = natResultsText;

        mainMenuButton?.setAttribute(
          'aria-label',
          'Close main navigation menu'
        );
        mainMenuButton?.removeAttribute('data-expanded');
      } else {
        nr.setAttribute('data-expanded', 'false');
        natResultsList.classList.add('none');
      }
      r.setAttribute('data-expanded', 'false');
      break;

    case 'tr':
      if (!tr || !toolsList || !resultsList || !divMenuTitle || !divBack || !r)
        return;
      // ... rest of tr logic with checks ...
      if (tr.attributes['data-expanded'].value == 'false') {
        toolsList.classList.remove('none');

        document.querySelectorAll('.level2').forEach(function (el) {
          if (el == tr.parentElement) {
            tr.parentElement.setAttribute('role', 'presentation');
          } else {
            el.classList.add('none');
          }
        });

        let backButtonTR = document.getElementById('back');
        backButtonTR?.remove();
        backButtonTR = document.createElement('a');
        // ... set attributes for backButtonTR ...
        backButtonTR.setAttribute('data-expanded', 'true');
        backButtonTR.setAttribute('id', 'back');
        backButtonTR.setAttribute('role', 'button');
        backButtonTR.setAttribute('aria-label', toolsTextA11yLabel); // Use correct label
        backButtonTR.setAttribute('data-from', 'tr');
        backButtonTR.setAttribute('href', '#');
        backButtonTR.appendChild(document.createTextNode('<'));
        divBack.prepend(backButtonTR);
        backButtonTR.addEventListener('click', goBack, false);

        setTimeout(() => {
          backButtonTR.focus();
        }, 50);

        resultsList.setAttribute('role', 'presentation');
        mainList.lastElementChild?.setAttribute('role', 'presentation');

        tr.classList.add('none');
        divMenuTitle.innerHTML = toolsText; // Use correct title

        mainMenuButton?.setAttribute(
          'aria-label',
          'Close main navigation menu'
        );
        mainMenuButton?.removeAttribute('data-expanded');
      } else {
        tr.setAttribute('data-expanded', 'false');
        toolsList.classList.add('none');
      }
      r.setAttribute('data-expanded', 'false');
      break;
  } // switch
} // displayMenu function

// Initial setup check (ensure elements exist before using them)
if (
  !mainMenuButton ||
  !navWrapper ||
  !header ||
  !main ||
  !mainList ||
  !r ||
  !er ||
  !nr ||
  !tr ||
  !divBack ||
  !divMenuTitle
) {
  console.error('One or more essential menu elements not found in the DOM.');
}

// dropdown menu content in desktop
const contenuElement = document.getElementById('contenu');
const erMenuElement = document.getElementById('er-menu');

// Ensure elements exist before proceeding
if (contenuElement && erMenuElement) {
  // Définissez aria-expanded à "false" par défaut pour les deux éléments
  /*erMenuElement.setAttribute("aria-expanded", "false"); // Commented out, seems managed by menu-desktop.js now
  contenuElement.setAttribute("aria-expanded", "false");*/ // This attribute doesn't belong on the content div

  // Ajoutez la classe "hidden" à l'élément "contenu" par défaut
  contenuElement.classList.add('hidden'); // This is likely handled by menu-desktop.js initially

  // This media query logic seems redundant if menu-desktop.js handles visibility
  // based on clicks. It might be intended for initial load based on screen size,
  // or for resizing behavior independent of clicks. Review its necessity.
  // If kept, ensure it doesn't conflict with menu-desktop.js state.

  /* // Potential redundancy, consider removing or adapting
  const mediaQuery = window.matchMedia("(max-width: 1080px)");

  function handleMediaQueryChange(event) {
    // This might conflict with the click handler setting aria-expanded
    erMenuElement.setAttribute("aria-expanded", event.matches ? "true" : "false");
    // This might conflict with the click handler adding/removing 'hidden'
    contenuElement.classList.toggle("hidden", event.matches ? "true" : "false");
  }

  mediaQuery.addListener(handleMediaQueryChange);

  // Déclenchement initial pour appliquer les états par défaut
  handleMediaQueryChange(mediaQuery);
  */
} else {
  console.warn("Dropdown elements ('contenu' or 'er-menu') not found.");
}
