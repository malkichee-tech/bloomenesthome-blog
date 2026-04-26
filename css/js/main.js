const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    hamburger?.classList.remove('active');
  });
});

const catPills = document.querySelectorAll('.cat-pill');
const postCards = document.querySelectorAll('.post-card[data-category]');

catPills.forEach(pill => {
  pill.addEventListener('click', () => {
    catPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const cat = pill.dataset.cat;
    postCards.forEach(card => {
      if (cat === 'all' || card.dataset.category === cat) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => { card.style.display = 'none'; }, 250);
      }
    });
  });
});

const searchInput = document.getElementById('blog-search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    postCards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const body  = card.querySelector('p')?.textContent.toLowerCase()  || '';
      if (!query || title.includes(query) || body.includes(query)) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; }, 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => { card.style.display = 'none'; }, 200);
      }
    });
  });
}

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#8A9E7E';
    newsletterForm.querySelector('input').value = '';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
  });
}

const progressBar = document.getElementById('reading-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  });
}

const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.style.opacity = window.scrollY > 400 ? '1' : '0';
    backToTop.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.post-card, .featured-post').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `
  .fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
  #reading-progress { position: fixed; top: 0; left: 0; height: 3px; width: 0%; background: linear-gradient(to right, #C9867C, #D4A853); z-index: 9999; transition: width 0.1s linear; }
  #back-to-top { position: fixed; bottom: 2rem; right: 2rem; width: 44px; height: 44px; background: #6B4F3A; color: #fff; border-radius: 50%; border: none; cursor: pointer; font-size: 1.2rem; opacity: 0; pointer-events: none; transition: opacity 0.3s, transform 0.2s; box-shadow: 0 4px 15px rgba(107,79,58,0.3); display: flex; align-items: center; justify-content: center; }
  #back-to-top:hover { transform: translateY(-3px); }
`;
document.head.appendChild(style);
