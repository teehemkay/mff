const copyToClipboard = async (event) => {
  try {
    const button = event.currentTarget;
    if (!button) {
      return;
    }

    const id = button.dataset.id;
    const feedbackContainer = document.querySelector(
      `#container-copy-feedback-${id}`
    );
    const feedback = document.querySelector(`#copy-feedback-${id}`);
    const feedbackSrOnly = document.querySelector(
      `#copy-feedback-sr-only-${id}`
    );

    await navigator.clipboard.writeText(button.dataset.url);

    feedbackContainer.classList.toggle('hidden');
    feedback.classList.remove('fx--fadeOut');
    feedback.classList.add('fx--fadeIn');
    feedbackSrOnly.textContent = feedback.textContent;

    setTimeout(() => {
      feedback.classList.remove('fx--fadeIn');
      feedback.classList.add('fx--fadeOut');
      feedbackContainer.classList.toggle('hidden');
      feedbackSrOnly.textContent = '';
    }, 3000);
  } catch (error) {
    console.error(`Failed to copy: ${error}`);
  }
};

document.querySelectorAll('.copy-url-button').forEach((button) => {
  button.addEventListener('click', copyToClipboard);
});
