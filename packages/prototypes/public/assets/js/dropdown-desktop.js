// dropdown menu content in desktop
const contenuElement = document.getElementById("contenu");
const erMenuElement = document.getElementById("er-menu");

// Ensure elements exist before proceeding
if (contenuElement && erMenuElement) {
  // Définissez aria-expanded à "false" par défaut pour les deux éléments
  /*erMenuElement.setAttribute("aria-expanded", "false"); // Commented out, seems managed by menu-desktop.js now
  contenuElement.setAttribute("aria-expanded", "false");*/ // This attribute doesn't belong on the content div

  // Ajoutez la classe "hidden" à l'élément "contenu" par défaut
  contenuElement.classList.add("hidden"); // This is likely handled by menu-desktop.js initially

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
