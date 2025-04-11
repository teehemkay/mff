// Desktop menu - custom code
const boutons = document.querySelectorAll('[data-button]');
const contenus = document.querySelectorAll('[data-content]');

boutons.forEach(bouton => {
  bouton.addEventListener('click', () => {
    const contenuId = bouton.getAttribute('data-controls');
    const contenu = document.getElementById(contenuId);
    const isExpanded = bouton.getAttribute('aria-expanded') === 'true';

    // Fermer tous les autres contenus
    contenus.forEach(contenu => {
      const boutonAssocie = document.querySelector('[data-controls="' + contenu.id + '"]');
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
