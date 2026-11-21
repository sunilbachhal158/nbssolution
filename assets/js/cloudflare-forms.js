/* NBS Solution - Cloudflare Worker form handler */
(() => {
  const WORKER_API_URL = 'https://nbs-solution-forms.nbssolution.workers.dev';
  document.addEventListener('submit', async (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || form.id !== 'contact-form') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const button = form.querySelector('[type="submit"]');
    const messageBox = form.parentElement.querySelector('#form-messages') || form.querySelector('#form-messages');
    const showMessage = (message, ok) => {
      if (!messageBox) return;
      messageBox.textContent = message;
      messageBox.setAttribute('role', 'status');
      messageBox.style.color = ok ? '#198754' : '#dc3545';
      messageBox.style.marginTop = '12px';
    };
    if (WORKER_API_URL.includes('PASTE_YOUR')) {
      showMessage('Form setup pending: Cloudflare Worker URL configure karna baaki hai.', false);
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name || !data.email || !data.message) {
      showMessage('Please fill in your name, email and message.', false); return;
    }
    if (button) { button.disabled = true; button.dataset.originalText = button.textContent; button.textContent = 'Sending...'; }
    showMessage('', true);
    try {
      const response = await fetch(WORKER_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Unable to send your message. Please try again.');
      form.reset(); showMessage('Thank you! Your enquiry has been sent successfully.', true);
    } catch (error) { showMessage(error.message || 'Something went wrong. Please try again.', false); }
    finally { if (button) { button.disabled = false; button.textContent = button.dataset.originalText || 'Send Message'; } }
  }, true);
})();
