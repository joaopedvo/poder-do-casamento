(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const played = new WeakSet();
  const running = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const title = entry.target;
      if (!entry.isIntersecting || !title.closest('.page.active')) continue;
      observer.unobserve(title);
      played.add(title);
      if (reduced.matches) continue;
      const animation = title.animate([
        {opacity: 0, transform: 'translateY(26px)', filter: 'blur(4px)'},
        {opacity: 1, transform: 'translateY(0)', filter: 'blur(0)'}
      ], {duration: title.matches('h1') ? 950 : 800, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'none'});
      running.add(animation);
      animation.finished.then(() => running.delete(animation), () => running.delete(animation));
    }
  }, {threshold: .12, rootMargin: '0px 0px -24px 0px'});
  function prepare() {
    document.querySelectorAll('.page.active h1,.page.active h2,.page.active h3,.page.active h4').forEach(title => {
      if (!played.has(title)) observer.observe(title);
    });
  }
  const watch = new MutationObserver(prepare);
  document.querySelectorAll('.page').forEach(page => watch.observe(page, {attributes: true, attributeFilter: ['class']}));
  reduced.addEventListener('change', () => {
    if (reduced.matches) running.forEach(animation => animation.cancel());
  });
  prepare();
})();
