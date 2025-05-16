gsap.from('.animate-in', {
  opacity: 0,
  y: 20,
  stagger: 0.2,
  duration: 1,
  ease: 'power2.out'
});

const form = document.getElementById('cosmic-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const intention = document.getElementById('intention').value;
  const seed = name + intention;
  window.location.href = `cosmos.html?seed=${encodeURIComponent(seed)}`;
});
