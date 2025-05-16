const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your message! (This is a demo, so it’s not sent.)');
  form.reset();
});
