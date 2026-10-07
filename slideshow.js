// A simple slideshow for the assignment's interactive activity.
const slides = [...document.querySelectorAll('.slide')];
const controls = document.querySelector('.slide-controls');
const previous = document.querySelector('#previous-slide');
const next = document.querySelector('#next-slide');
const status = document.querySelector('#slide-status');
let current = 0;

function showSlide() {
  slides.forEach((slide, index) => { slide.hidden = index !== current; });
  status.textContent = `${current + 1} of ${slides.length}`;
  previous.disabled = current === 0;
  next.disabled = current === slides.length - 1;
}

if (slides.length && controls) {
  controls.hidden = false;
  previous.addEventListener('click', () => { if (current > 0) current--; showSlide(); });
  next.addEventListener('click', () => { if (current < slides.length - 1) current++; showSlide(); });
  showSlide();
}
