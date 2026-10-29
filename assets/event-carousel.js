(() => {
  const section = document.querySelector('.event-carousel');
  if (!section) return;
  const track = section.querySelector('.event-carousel-track');
  track.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
  const clone = track.firstElementChild.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  clone.querySelectorAll('img').forEach(img => { img.alt = ''; });
  track.append(clone);
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function setPaused(paused) {
    section.classList.toggle('is-paused', paused);
  }
  setPaused(motion.matches);
  motion.addEventListener('change', event => setPaused(event.matches));
})();
