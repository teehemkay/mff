// Desktop menu - custom code
const boutons = document.querySelectorAll('[data-button]');
const contenus = document.querySelectorAll('[data-content]');

for (const bouton of boutons) {
  bouton.addEventListener('click', () => {
    const contenuId = bouton.dataset.controls;
    const contenu = document.querySelector(`#${contenuId}`);
    const isExpanded = bouton.getAttribute('aria-expanded') === 'true';

    // Fermer tous les autres contenus
    for (const contenu of contenus) {
      const boutonAssocie = document.querySelector(
        '[data-controls="' + contenu.id + '"]'
      );
      if (boutonAssocie !== bouton) {
        boutonAssocie.setAttribute('aria-expanded', 'false');
        contenu.classList.add('hidden');
      }
    }

    // Ouvrir ou fermer le contenu du bouton cliqué
    bouton.setAttribute('aria-expanded', !isExpanded);
    contenu.classList.toggle('hidden');
  });
}
// End desktop menu

// Mobile menu [Fernando's version]
let mainMenuButton = document.querySelector('#mainMenuButton');
const r = document.querySelector('#r');
const er = document.querySelector('#er');
const nr = document.querySelector('#nr');
const tr = document.querySelector('#tr');
const navWrapper = document.querySelector('#navWrapper');

const divBack = document.querySelector('#divBack');
const backButton = document.querySelector('#back');
const menuTitle = document.querySelector('#menuTitle');
const divMenuTitle = document.querySelector('#divMenuTitle');

const header = document.querySelector('#header');
const main = document.querySelector('#mainContent');

const mainList = document.querySelector('#mainList');
const resultsList = document.querySelector('#resultsList');
const euResultsList = document.querySelector('#euResultsList');
const natResultsList = document.querySelector('#natResultsList');
const toolsList = document.querySelector('#toolsList');

document.body.addEventListener('keydown', closeOnEscape, false); // close nav on ESC
mainMenuButton.addEventListener('click', displayMenu, false);
r.addEventListener('click', displayMenu, false);
er.addEventListener('click', displayMenu, false);
nr.addEventListener('click', displayMenu, false);
tr.addEventListener('click', displayMenu, false);
backButton.addEventListener('click', goBack, false);

const resultsText = 'Election Results';
const euResultsText = 'European Results';
const natResultsText = 'National Results';
const toolsText = 'Tools Results';

const navigHint = ' - Submenu. Click or Enter to go to the previous menu.';
const resultsTextA11yLabel = resultsText + navigHint;
const euResultsTextA11yLabel = euResultsText + navigHint;
const natResultsTextA11yLabel = natResultsText + navigHint;
const toolsTextA11yLabel = toolsText + navigHint;

function closeOnEscape(e) {
  if (e.keyCode === 27 && navWrapper.hasAttribute('aria-modal')) {
    mainMenuButton.click();
  }
}

function goBack(e) {
  e.preventDefault();
  switch (
    e.target.attributes['data-from'].value // coming From
  ) {
    case 'r': {
      for (const child of mainList.children) {
        child.classList.remove('none');
      }

      resultsList.classList.add('none');

      const backButton = document.querySelector('#back');
      backButton.remove();
      divMenuTitle.innerHTML = '';

      mainList.removeAttribute('role'); // ul
      mainList.lastElementChild.removeAttribute('role'); // li

      r.dataset.expanded = 'false';
      r.classList.remove('none');
      mainMenuButton.classList.remove('none');

      setTimeout(() => {
        mainMenuButton.focus();
      }, '10');

      mainMenuButton.setAttribute('aria-label', 'Close main navigation menu');
      mainMenuButton.dataset.expanded = 'true';

      break;
    } // case r

    case 'er': {
      console.log('click ER back');

      for (const child of resultsList.children) {
        child.classList.remove('none');
        child.removeAttribute('role');
      }

      resultsList.removeAttribute('role');

      euResultsList.removeAttribute('role'); // ul

      er.dataset.expanded = 'false';
      er.classList.remove('none');

      r.click();
      break;
    } // case er

    case 'nr': {
      console.log('click NR back');
      for (const child of resultsList.children) {
        child.classList.remove('none');
        child.removeAttribute('role');
      }

      resultsList.removeAttribute('role');

      natResultsList.removeAttribute('role'); // ul
      natResultsList.lastElementChild.removeAttribute('role'); // li

      nr.dataset.expanded = 'false';
      nr.classList.remove('none');

      r.click();
      break;
    } // case er

    case 'tr': {
      console.log('click TR back');
      for (const child of resultsList.children) {
        child.classList.remove('none');
        child.removeAttribute('role');
      }

      toolsList.removeAttribute('role');

      toolsList.removeAttribute('role'); // ul
      toolsList.lastElementChild.removeAttribute('role'); // li

      tr.dataset.expanded = 'false';
      tr.classList.remove('none');

      r.click();
      break;
    } // case er
  } // sw
} // fn

function displayMenu(e) {
  e.preventDefault();

  // if the menu is diplayed we change and block a few things
  navWrapper.setAttribute('role', 'dialog');
  navWrapper.setAttribute('aria-modal', 'true');
  navWrapper.setAttribute('aria-label', 'Navigation');

  main.classList.add('none');
  header.setAttribute('role', 'presentation');

  switch (e.target.id) {
    case 'mainMenuButton': {
      mainMenuButton = document.querySelector('#mainMenuButton');

      if (
        !mainMenuButton.attributes['data-expanded'] ||
        mainMenuButton.attributes['data-expanded'].value === 'true'
      ) {
        mainMenuButton.dataset.expanded = 'false';
        mainMenuButton.setAttribute(
          'aria-label',
          'Open main navigation menu (opens in a dialog)'
        );
        mainMenuButton.innerHTML = 'Menu';

        // remove role presentation
        header.removeAttribute('role');
        for (const el of document.querySelectorAll('li')) {
          el.removeAttribute('role');
        } // forEach

        for (const el of document.querySelectorAll('ul')) {
          el.removeAttribute('role');
        } // forEach

        for (const el of document.querySelectorAll('a[role="button"]')) {
          el.dataset.expanded = 'false';
        } // forEach

        // none to all lists
        mainList.classList.add('none');
        resultsList.classList.add('none');
        r.classList.remove('none');
        er.classList.remove('none');
        nr.classList.remove('none');
        tr.classList.remove('none');

        // clear Title of Menu
        divMenuTitle.innerHTML = '';
        divBack.innerHTML = '';

        // Go back to normal page
        navWrapper.setAttribute('role', 'navigation');
        navWrapper.removeAttribute('aria-modal');
        navWrapper.setAttribute('aria-label', 'Main navigation');

        main.classList.remove('none');

        /* setTimeout(() => {
            mainMenuButton.focus();
          }, "50");*/

        setTimeout(() => {
          mainMenuButton.focus();
          if (
            /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            navigator.platform.toUpperCase().includes('MAC')
          ) {
            console.log('apple');
            setTimeout(() => {
              mainMenuButton.blur();
            }, '500');
          } else {
            console.log('No apple');
          }
        }, '50');
      } else {
        mainMenuButton = document.querySelector('#mainMenuButton'); // I have to remove and create for issue in NVDA
        if (mainMenuButton) {
          mainMenuButton.remove();
        }

        mainMenuButton = document.createElement('a');
        mainMenuButton.dataset.expanded = 'true';
        mainMenuButton.setAttribute('id', 'mainMenuButton');
        mainMenuButton.setAttribute('role', 'button');
        mainMenuButton.setAttribute('aria-label', 'Close main navigation menu');
        mainMenuButton.setAttribute('href', '#');
        mainMenuButton.innerHTML = 'X';

        divmainMenuButton.prepend(mainMenuButton);
        mainMenuButton.addEventListener('click', displayMenu, false);

        setTimeout(() => {
          mainMenuButton.focus();
        }, '50');
        mainList.classList.remove('none');
        for (const el of document.querySelectorAll('.main')) {
          el.classList.remove('none');
        } // forEach
      }

      break;
    }

    case 'r': {
      // election results
      console.log('Menu - Results');
      if (e.target.attributes['data-expanded'].value === 'false') {
        console.log('Menu - Results true');
        e.target.nextElementSibling.classList.remove('none');
        e.target.dataset.expanded = 'true';
        for (const el of document.querySelectorAll('.main')) {
          el.classList.add('none');
        } // forEach

        divMenuTitle.innerHTML = resultsText;

        let backButton = document.querySelector('#back'); // I have to remove and create for issue in NVDA
        if (backButton) {
          backButton.remove();
        }

        backButton = document.createElement('a');
        backButton.dataset.expanded = 'true';
        backButton.setAttribute('id', 'back');
        backButton.setAttribute('role', 'button');
        backButton.setAttribute('aria-label', resultsTextA11yLabel);
        backButton.dataset.from = 'r';
        backButton.setAttribute('href', '#');
        backButton.append(document.createTextNode('\u003C'));
        divBack.prepend(backButton);
        backButton.addEventListener('click', goBack, false);

        setTimeout(() => {
          backButton.focus();
        }, '50');

        mainList.setAttribute('role', 'presentation'); // ul
        mainList.lastElementChild.setAttribute('role', 'presentation'); // li

        for (const el of document.querySelectorAll('.level2')) {
          el.classList.remove('none'); // other level 2
        } // forEach

        euResultsList.classList.add('none');
        natResultsList.classList.add('none');
        toolsList.classList.add('none');

        r.classList.add('none');

        mainMenuButton.setAttribute('aria-label', 'Close main navigation menu');
        delete mainMenuButton.dataset.expanded;
      } else {
        // else
        backButton.remove();
        divMenuTitle.innerHTML = '';
        console.log('enter');
      }

      break;
    }

    case 'er': {
      console.log('Menu - EU results');
      if (e.target.attributes['data-expanded'].value === 'false') {
        e.target.nextElementSibling.classList.remove('none'); // ul

        for (const el of document.querySelectorAll('.level2')) {
          if (el === e.target.parentElement) {
            e.target.parentElement.setAttribute('role', 'presentation'); // li above
          } else {
            el.classList.add('none'); // other level 2
          }
        } // forEach

        let backButton = document.querySelector('#back'); // I have to remove and create for issue in NVDA
        backButton.remove();
        backButton = document.createElement('a');
        backButton.dataset.expanded = 'true';
        backButton.setAttribute('id', 'back');
        backButton.setAttribute('role', 'button');
        backButton.setAttribute('aria-label', euResultsTextA11yLabel);
        backButton.dataset.from = 'er';
        backButton.setAttribute('href', '#');
        backButton.append(document.createTextNode('\u003C'));
        divBack.prepend(backButton);
        backButton.addEventListener('click', goBack, false);

        setTimeout(() => {
          backButton.focus();
        }, '50');

        // menuTitle.classList.remove('none');
        resultsList.setAttribute('role', 'presentation'); // ul
        mainList.lastElementChild.setAttribute('role', 'presentation'); // li

        er.classList.add('none');

        const ele = document.querySelector('#divMenuTitle');
        ele.innerHTML = euResultsText;

        mainMenuButton.setAttribute('aria-label', 'Close main navigation menu');
        delete mainMenuButton.dataset.expanded;
      } else {
        // if
        e.target.dataset.expanded = 'false';
        e.target.nextElementSibling.classList.add('none');
      }

      r.dataset.expanded = 'false';
      break;
    }

    case 'nr': {
      console.log('Menu - Nat results');
      if (e.target.attributes['data-expanded'].value === 'false') {
        e.target.nextElementSibling.classList.remove('none'); // ul

        for (const el of document.querySelectorAll('.level2')) {
          if (el === e.target.parentElement) {
            e.target.parentElement.setAttribute('role', 'presentation'); // li above
          } else {
            el.classList.add('none'); // other level 2
          }
        } // forEach

        let backButton = document.querySelector('#back'); // I have to remove and create for issue in NVDA
        backButton.remove();
        backButton = document.createElement('a');
        backButton.dataset.expanded = 'true';
        backButton.setAttribute('id', 'back');
        backButton.setAttribute('role', 'button');
        backButton.setAttribute('aria-label', natResultsTextA11yLabel);
        backButton.dataset.from = 'nr';
        backButton.setAttribute('href', '#');
        backButton.append(document.createTextNode('\u003C'));
        divBack.prepend(backButton);
        backButton.addEventListener('click', goBack, false);

        // menuTitle.classList.remove('none');
        resultsList.setAttribute('role', 'presentation'); // ul
        mainList.lastElementChild.setAttribute('role', 'presentation'); // li

        nr.classList.add('none');

        const ele = document.querySelector('#divMenuTitle');
        ele.innerHTML = natResultsText;

        mainMenuButton.setAttribute('aria-label', 'Close main navigation menu');
        delete mainMenuButton.dataset.expanded;

        setTimeout(() => {
          backButton.focus();
        }, '50');
      } else {
        // if
        e.target.dataset.expanded = 'false';
        e.target.nextElementSibling.classList.add('none');
      }

      r.dataset.expanded = 'false';
      break;
    }

    case 'tr': {
      console.log('Menu - Tools list');
      if (e.target.attributes['data-expanded'].value === 'false') {
        e.target.nextElementSibling.classList.remove('none'); // ul

        for (const el of document.querySelectorAll('.level2')) {
          if (el === e.target.parentElement) {
            e.target.parentElement.setAttribute('role', 'presentation'); // li above
          } else {
            el.classList.add('none'); // other level 2
          }
        } // forEach

        let backButton = document.querySelector('#back'); // I have to remove and create for issue in NVDA
        backButton.remove();
        backButton = document.createElement('a');
        backButton.dataset.expanded = 'true';
        backButton.setAttribute('id', 'back');
        backButton.setAttribute('role', 'button');
        backButton.setAttribute('aria-label', natResultsTextA11yLabel);
        backButton.dataset.from = 'tr';
        backButton.setAttribute('href', '#');
        backButton.append(document.createTextNode('\u003C'));
        divBack.prepend(backButton);
        backButton.addEventListener('click', goBack, false);

        // menuTitle.classList.remove('none');
        resultsList.setAttribute('role', 'presentation'); // ul
        mainList.lastElementChild.setAttribute('role', 'presentation'); // li

        tr.classList.add('none');

        const ele = document.querySelector('#divMenuTitle');
        ele.innerHTML = natResultsText;

        mainMenuButton.setAttribute('aria-label', 'Close main navigation menu');
        delete mainMenuButton.dataset.expanded;

        setTimeout(() => {
          backButton.focus();
        }, '50');
      } else {
        // if
        e.target.dataset.expanded = 'false';
        e.target.nextElementSibling.classList.add('none');
      }

      r.dataset.expanded = 'false';
      break;
    }
  }
} // fn

// dropdown menu content in desktop
// const contenuElement = document.querySelector('#contenu');
// const erMenuElement = document.querySelector('#er-menu');

// Définissez aria-expanded à "false" par défaut pour les deux éléments
/* erMenuElement.setAttribute("aria-expanded", "false");
  contenuElement.setAttribute("aria-expanded", "false");*/

// Ajoutez la classe "hidden" à l'élément "contenu" par défaut
// contenuElement.classList.add('hidden');

// const mediaQuery = window.matchMedia('(max-width: 1080px)');

// function handleMediaQueryChange(event) {
//   erMenuElement.setAttribute('aria-expanded', event.matches ? 'true' : 'false');
//   contenuElement.classList.toggle('hidden', event.matches ? 'true' : 'false');
// }

// mediaQuery.addListener(handleMediaQueryChange);

// // Déclenchement initial pour appliquer les états par défaut
// handleMediaQueryChange(mediaQuery);
