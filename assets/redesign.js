(() => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const selector = '.page.active .hero-copy > :not(h1), .page.active section:not(.hero) .eyebrow, .page.active section:not(.hero) .lead, .page.active section:not(.hero) .btns';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add('is-visible');
      observer.unobserve(target);
    });
  }, { rootMargin: '0px 0px -7% 0px', threshold: .08 });
  function prepare() {
    document.querySelectorAll(selector).forEach((element) => {
      if (element.dataset.reveal) return;
      element.dataset.reveal = '';
      observer.observe(element);
    });
  }
  prepare();
  document.documentElement.classList.add('js-motion');
  const pages = document.querySelectorAll('.page');
  const watch = new MutationObserver(prepare);
  pages.forEach((page) => watch.observe(page, { attributes: true, attributeFilter: ['class'] }));
})();
