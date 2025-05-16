// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('cosmos-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

// Get seed from URL
const params = new URLSearchParams(window.location.search);
const seed = params.get('seed') || 'default';
Math.seedrandom(seed);

// Generate star system
const star = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
scene.add(star);

const planets = [];
for (let i = 0; i < 3; i++) {
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(Math.random() * 2 + 1, 16, 16),
    new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff })
  );
  planet.position.x = 10 + i * 10;
  planets.push({ mesh: planet, orbit: 10 + i * 10, angle: Math.random() * Math.PI * 2 });
  scene.add(planet);
}

// Generate story
const stories = [
  `Born from ${seed}'s will, this system shines with hope.`,
  `In ${seed}'s cosmos, planets dance to ancient rhythms.`,
  `Guided by ${seed}, stars whisper tales of eternity.`
];
document.getElementById('system-name').textContent = `${seed}'s Star System`;
document.getElementById('system-story').textContent = stories[Math.floor(Math.random() * stories.length)];

// Animation loop
function animate() {
  planets.forEach(planet => {
    planet.angle += 0.01;
    planet.mesh.position.x = Math.cos(planet.angle) * planet.orbit;
    planet.mesh.position.z = Math.sin(planet.angle) * planet.orbit;
  });
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Share and download
document.getElementById('share-btn').addEventListener('click', () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => alert('Link copied!'));
});

document.getElementById('download-btn').addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = renderer.domElement.toDataURL('image/png');
  link.download = `${seed}-cosmos.png`;
  link.click();
});

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
