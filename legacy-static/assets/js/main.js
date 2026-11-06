(() => {
  // Sticky header shadow
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = document.querySelector('.header__burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Hero hotspot -> product card (click to toggle, hover on desktop)
  const dot = document.querySelector('.hotspot');
  const card = document.getElementById('hero-card');
  const media = document.querySelector('.hero__media');
  const setCard = (open) => {
    card.hidden = !open;
    dot.setAttribute('aria-expanded', open);
  };
  dot.addEventListener('click', (e) => { e.stopPropagation(); setCard(card.hidden); });
  if (matchMedia('(hover: hover)').matches) {
    dot.addEventListener('mouseenter', () => setCard(true));
    media.addEventListener('mouseleave', () => setCard(false));
  }
  document.addEventListener('click', (e) => { if (!card.contains(e.target)) setCard(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setCard(false); });

  // About image stack — auto cross-fade with caption + dots
  const items = [...document.querySelectorAll('.stack__item')];
  const dots = [...document.querySelectorAll('.stack__dots button')];
  const caption = document.querySelector('.stack__caption');
  let index = 0;
  let timer;
  const show = (i) => {
    index = (i + items.length) % items.length;
    items.forEach((el, n) => el.classList.toggle('is-active', n === index));
    dots.forEach((el, n) => {
      el.classList.toggle('is-active', n === index);
      el.setAttribute('aria-selected', n === index);
    });
    caption.style.opacity = 0;
    setTimeout(() => { caption.textContent = items[index].dataset.caption; caption.style.opacity = 1; }, 250);
  };
  const play = () => { clearInterval(timer); timer = setInterval(() => show(index + 1), 3800); };
  dots.forEach((d, n) => d.addEventListener('click', () => { show(n); play(); }));
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) play();

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 90}ms`;
    io.observe(el);
  });
})();
