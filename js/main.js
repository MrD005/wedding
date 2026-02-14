/* ============================================
   WEDDING INVITATION — Main JS
   ============================================ */
(function () {
  'use strict';

  /* ----- 1. MUSIC PLAYER ----- */
  function initMusic() {
    const btn = document.getElementById('musicBtn');
    const audio = document.getElementById('bgMusic');
    const playIcon = btn.querySelector('.music-icon--play');
    const pauseIcon = btn.querySelector('.music-icon--pause');
    let playing = false;

    btn.addEventListener('click', function () {
      if (playing) {
        audio.pause();
        playIcon.style.display = '';
        pauseIcon.style.display = 'none';
      } else {
        audio.play().catch(function () {});
        playIcon.style.display = 'none';
        pauseIcon.style.display = '';
      }
      playing = !playing;
    });
  }

  /* ----- 2. STARS GENERATION ----- */
  function initStars() {
    const container = document.getElementById('heroStars');
    if (!container) return;
    var count = Math.min(window.innerWidth / 4, 120);
    for (var i = 0; i < count; i++) {
      var star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 55 + '%';
      var size = Math.random() * 2.5 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.setProperty('--duration', (Math.random() * 4 + 2) + 's');
      star.style.setProperty('--max-opacity', (Math.random() * 0.5 + 0.3).toFixed(2));
      star.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(star);
    }
  }

  /* ----- 3. SCROLL REVEAL ----- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ----- 4. HERO PARALLAX SCROLL ----- */
  function initParallax() {
    var hero = document.getElementById('hero');
    var content = hero ? hero.querySelector('.hero__content') : null;
    var moon = hero ? hero.querySelector('.hero__moon') : null;
    if (!content) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY;
          var h = hero.offsetHeight;
          var p = Math.min(y / h, 1);
          content.style.opacity = 1 - p * 1.5;
          content.style.transform = 'translateY(' + (y * 0.25) + 'px)';
          if (moon) moon.style.transform = 'translateX(-50%) translateY(' + (y * 0.1) + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ----- 5. COUNTDOWN ----- */
  function initCountdown() {
    // *** Set your wedding date here ***
    var target = new Date('2026-03-10T19:00:00+05:30').getTime();
    var dEl = document.getElementById('cDays');
    var hEl = document.getElementById('cHours');
    var mEl = document.getElementById('cMinutes');
    if (!dEl) return;

    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    function update() {
      var diff = target - Date.now();
      if (diff <= 0) { dEl.textContent = '00'; hEl.textContent = '00'; mEl.textContent = '00'; return; }
      dEl.textContent = pad(Math.floor(diff / 86400000));
      hEl.textContent = pad(Math.floor((diff % 86400000) / 3600000));
      mEl.textContent = pad(Math.floor((diff % 3600000) / 60000));
    }
    update();
    setInterval(update, 60000);
  }

  /* ----- 6. CAROUSEL ----- */
  function initCarousel() {
    var track = document.getElementById('coupleTrack');
    var slides = track ? track.querySelectorAll('.couple__slide') : [];
    var prev = document.getElementById('prevBtn');
    var next = document.getElementById('nextBtn');
    if (!track || !slides.length) return;

    var idx = 0;
    var total = slides.length;

    function go(i) {
      idx = ((i % total) + total) % total;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    }

    if (prev) prev.addEventListener('click', function () { go(idx - 1); });
    if (next) next.addEventListener('click', function () { go(idx + 1); });

    // Auto advance
    var timer = setInterval(function () { go(idx + 1); }, 5000);
    var carousel = document.getElementById('coupleCarousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', function () { clearInterval(timer); });
      carousel.addEventListener('mouseleave', function () {
        timer = setInterval(function () { go(idx + 1); }, 5000);
      });
    }

    // Touch swipe
    var startX = 0;
    track.addEventListener('touchstart', function (e) {
      startX = e.changedTouches[0].screenX;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      var d = startX - e.changedTouches[0].screenX;
      if (Math.abs(d) > 50) go(d > 0 ? idx + 1 : idx - 1);
    }, { passive: true });
  }

  /* ----- 7. ADD reveal CLASS TO SECTIONS ----- */
  function addRevealClasses() {
    var selectors = [
      '.invitation__ganesha', '.invitation__content',
      '.events__card', '.location__content',
      '.couple__header', '.couple__gallery', '.couple__message',
      '.rsvp__heading', '.rsvp__btn',
      '.info__title', '.info__subtitle', '.info__card',
      '.social__heading', '.social__link',
      '.countdown__heading', '.countdown__timer', '.countdown__message'
    ];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.classList.add('reveal');
      });
    });
  }

  /* ----- INIT ----- */
  document.addEventListener('DOMContentLoaded', function () {
    initMusic();
    initStars();
    addRevealClasses();
    initReveal();
    initParallax();
    initCountdown();
    initCarousel();
  });
})();
