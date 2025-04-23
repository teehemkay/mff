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
  const expandLabel = button.dataset.l10nExpand;
  const collapseLabel = button.dataset.l10nCollapse;

  button.setAttribute('aria-expanded', !isExpanded);
  target.classList.toggle('hidden');

  if (isExpanded) {
    if (expandLabel) {
      button.setAttribute('aria-label', expandLabel); // Update label
    }

    target.style.opacity = '1';
    target.style.transition = 'opacity 0.3s ease-out'; // Add transition

    setTimeout(() => {
      target.style.opacity = '0';
      target.removeAttribute('style');
    }, 10);
  } else {
    if (collapseLabel) {
      button.setAttribute('aria-label', collapseLabel); // Update label
    }

    target.style.opacity = '0';
    target.style.transition = 'opacity 0.3s ease-out'; // Add transition

    setTimeout(() => {
      target.style.opacity = '1';
      target.removeAttribute('style');
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

  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  const expandLabel = button.dataset.l10nExpand;
  const collapseLabel = button.dataset.l10nCollapse;

  if (isExpanded) {
    target.classList.remove('hidden');

    if (collapseLabel) {
      button.setAttribute('aria-label', collapseLabel); // Update label
    }
  } else {
    target.classList.add('hidden');

    if (expandLabel) {
      button.setAttribute('aria-label', expandLabel); // Update label
    }
  }

  button.addEventListener('click', toggleContent);
});
