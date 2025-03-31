/* global gsap:readonly, ScrollTrigger:readonly */

// Hero movie - Custom code

// Créez une instance de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// vars
const ambianceVideo = document.querySelector('.ambiance-video');
const btnPlay = document.querySelector('.btn-play');
// const rwdMedia = document.querySelector('.rwd-media');
const AmbianceVideobg = document.querySelector('.ambiance-video-container');
const desktopvideoMarker = document.querySelector('.hero-desktop.marker-nav');
gsap.set(ambianceVideo, {
  cursor: 'pointer'
});
gsap.set(ambianceVideo, {
  height: '50vh'
});
gsap.set(desktopvideoMarker, {
  display: 'none'
});

// Définir la timeline principale
const tlMaster = gsap.timeline({
  paused: true
});
tlMaster.to(ambianceVideo, {
  height: 'calc(100vh - 64px)',
  duration: 1,
  ease: 'expo.inOut'
}, 0 // Start at time 0
);
tlMaster.fromTo(desktopvideoMarker, {
  display: 'none'
},
// Start from hidden state
{
  display: 'block',
  duration: 1
  // startAtTime: -1
}, 0.5
// Start at time 0
);
//tlMaster.play();

// Click on play video button
AmbianceVideobg.addEventListener('click', () => {
  tlMaster.play();

  // On fait un callback onComplete pour effectuer le scroll APRES avoir lancé la tlMaster GSAP
  tlMaster.eventCallback("onComplete", () => {
    //btn play is set to hidden when clicked
    gsap.to(btnPlay, {
      display: 'none'
    });

    // Effectuer le scroll de ...px vers le haut
    window.scrollTo({
      top: 300,
      behavior: 'smooth' // défilement fluide
    });
  });
});

// Scrolling stars
/*const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.stars',
    start: 'top center',
    scrub: 15,
  },
});

tl.to('.star-only', {
  rotation: 360,
  transformOrigin: '50% 50%',
  ease: 'linear',
});*/

/* Stars animation with Lottie (json) */
lottie.loadAnimation({
  container: document.getElementById('stars-motion'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '../assets/js/rotating_stars.json' // Chemin vers le fichier JSON Lottie
});
lottie.setSpeed(0.25); // Changer la la valeur de la vitesse
lottie.setDirection(-1); // Changer la direction

// Expand / collapse component

const boutons = document.querySelectorAll('[data-button]');
const contenus = document.querySelectorAll('[data-content]');
for (const bouton of boutons) {
  bouton.addEventListener('click', () => {
    const contenuId = bouton.dataset.controls;
    const contenu = document.querySelector(`#${contenuId}`);
    const isExpanded = bouton.getAttribute('aria-expanded') === 'true';

    // Fermer tous les autres contenus
    for (const contenu of contenus) {
      const boutonAssocie = document.querySelector('[data-controls="' + contenu.id + '"]');
      if (boutonAssocie !== bouton) {
        boutonAssocie.setAttribute('aria-expanded', 'false');
        contenu.classList.add('hidden');
      }
    }

    // Ouvrir ou fermer le contenu du bouton cliqué
    bouton.setAttribute('aria-expanded', !isExpanded);
    contenu.classList.toggle('hidden');

    // Si le contenu est ouvert, déplacer le focus sur le premier élément focusable
    /* if (!isExpanded) {
      const firstFocusableElement = contenu.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }*/
  });
}

// Ajouter un écouteur d'événements pour gérer la navigation au clavier
document.addEventListener('keydown', event => {
  if (event.key === 'Tab' && event.shiftKey) {
    for (const bouton of boutons) {
      const contenuId = bouton.dataset.controls;
      const contenu = document.querySelector(`#${contenuId}`);
      const firstFocusableElement = contenu.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (document.activeElement === firstFocusableElement) {
        bouton.focus();
        event.preventDefault();
      }
    }
  }
});

// Switch btn component

for (const button of Array.from(document.querySelectorAll('button.Toggle'))) {
  button.addEventListener('click', _ => {
    if (button.getAttribute('aria-pressed') === 'true') {
      button.removeAttribute('aria-pressed');
    } else {
      button.setAttribute('aria-pressed', 'true');
    }
  });
}//# sourceMappingURL=hero.js.map
