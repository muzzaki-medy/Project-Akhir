// Slide menu dari kanan
const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
});

// Tutup menu otomatis saat klik link
document.querySelectorAll('.side-menu a').forEach(link => {
  link.addEventListener('click', () => {
    sideMenu.classList.remove('open');
  });
});

// Animasi fade in saat load
document.body.classList.add('fade-in');
