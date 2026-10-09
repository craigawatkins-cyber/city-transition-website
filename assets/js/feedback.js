/* Feedback form on the About page.
   Sends the form in the background so the visitor stays on the page.
   Without JavaScript the form still works: it posts normally and the
   form service shows its own confirmation page. */
(function () {
  'use strict';

  var form = document.getElementById('feedback-form');
  var status = document.getElementById('feedback-status');
  if (!form || !status || !window.fetch || !window.FormData) return;

  var button = form.querySelector('button[type="submit"]');

  function show(message, kind) {
    status.textContent = message;
    status.className = 'feedback-status' + (kind ? ' is-' + kind : '');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    button.disabled = true;
    show('Sending…');

    fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then(function (response) {
        return response.json().then(function (data) {
          if (!response.ok || !data.success) throw new Error('rejected');
          form.reset();
          show('Thank you. Your feedback has been sent.', 'ok');
        });
      })
      .catch(function () {
        show('Sorry, your feedback could not be sent. Please try again in a few minutes.', 'error');
      })
      .then(function () {
        button.disabled = false;
      });
  });
})();
