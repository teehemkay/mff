// Expand/Collapse component logic (specific to this page instance)
const expandContainers = document.querySelectorAll(
  '#mainContent .expand-container'
); // Scope to main content

const toggleContent = (event) => {
  const button = event.currentTarget;

  const targetId = button.getAttribute('aria-controls');
  const target = document.querySelector(`#${targetId}`);
  if (!target) {
    return;
  }
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  button.setAttribute('aria-expanded', !isExpanded);
  target.classList.toggle('hidden');

  if (isExpanded) {
    button.setAttribute('aria-label', button.dataset.l10nExpand); // Update label
    target.style.opacity = '1';
    target.style.transition = 'opacity 0.3s ease-out'; // Add transition
    setTimeout(() => {
      target.style.opacity = '0';
      // Optionally hide after transition: setTimeout(() => { target.classList.add('hidden'); }, 300);
    }, 10);
    // If not using opacity transition, just toggle hidden:
    // target.classList.add('hidden');
  } else {
    button.setAttribute('aria-label', button.dataset.l10nCollapse); // Update label
    container.dataset.initialState = 'expanded'; // Update state if needed
    target.style.opacity = '0';
    target.style.transition = 'opacity 0.3s ease-out'; // Add transition
    setTimeout(() => {
      target.style.opacity = '1';
    }, 10);
  }
};

expandContainers.forEach((container) => {
  const button = container.querySelector('.expand-button');
  if (!button) {
    return;
  }

  const targetId = button.getAttribute('aria-controls');
  const target = document.querySelector(`#${targetId}`);
  if (!target) {
    return;
  }

  const isExpanded = button.getAttribute('aria-expanded') === 'true'; // Default to false

  if (isExpanded) {
    target.classList.remove('hidden');
    button.setAttribute('aria-label', button.dataset.l10nCollapse);
  } else {
    target.classList.add('hidden');
    button.setAttribute('aria-label', button.dataset.l10nCollapse);
  }

  button.addEventListener('click', toggleContent);
});
