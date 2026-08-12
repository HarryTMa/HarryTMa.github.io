(function () {
  'use strict';

  var root = document.documentElement;

  // ---- Email obfuscation --------------------------------------------------
  var emailEl = document.getElementById('email-link');
  if (emailEl) {
    var addr = emailEl.getAttribute('data-user') + '@' + emailEl.getAttribute('data-domain');
    emailEl.textContent = addr;
    emailEl.setAttribute('href', 'mailto:' + addr);
  }

  // ---- Theme toggle -------------------------------------------------------
  var themeBtn = document.getElementById('toggle-theme');
  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // ---- Language toggle ----------------------------------------------------
  var langBtn = document.getElementById('toggle-lang');
  langBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-lang') === 'en' ? 'cn' : 'en';
    root.setAttribute('data-lang', next);
    root.setAttribute('lang', next === 'cn' ? 'zh-CN' : 'en');
    try { localStorage.setItem('lang', next); } catch (e) {}
  });

  // ---- Reveal on scroll ---------------------------------------------------
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('revealed'); });
  }
})();
