// menu mobilne
(function () {
  var h = document.querySelector('.naglowek'), b = h.querySelector('.burger');
  b.addEventListener('click', function () {
    var o = h.classList.toggle('otwarte');
    b.setAttribute('aria-expanded', o);
    b.setAttribute('aria-label', o ? 'Zamknij menu' : 'Otwórz menu');
    document.body.style.overflow = o ? 'hidden' : '';
  });
  h.querySelectorAll('.menu a').forEach(function (a) {
    a.addEventListener('click', function () {
      h.classList.remove('otwarte'); b.setAttribute('aria-expanded', false); document.body.style.overflow = '';
    });
  });
})();

// karuzela ofert: palec, mysz, strzałki
(function () {
  var t = document.getElementById('tor'); if (!t) return;
  function krok() { var k = t.querySelector('.oferta'); return k ? k.getBoundingClientRect().width + 20 : 320; }
  document.querySelectorAll('.strzalki button').forEach(function (b) {
    b.addEventListener('click', function () { t.scrollBy({ left: krok() * +b.dataset.kier, behavior: 'smooth' }); });
  });
  var x0 = 0, s0 = 0, wcisk = false, ruch = false;
  t.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse') return;
    wcisk = true; ruch = false; x0 = e.clientX; s0 = t.scrollLeft;
  });
  window.addEventListener('pointermove', function (e) {
    if (!wcisk) return;
    var d = e.clientX - x0;
    if (Math.abs(d) > 4) { ruch = true; t.classList.add('ciagnie'); }
    t.scrollLeft = s0 - d;
  });
  window.addEventListener('pointerup', function () {
    if (!wcisk) return; wcisk = false;
    if (ruch) {
      var k = krok(), cel = Math.round(t.scrollLeft / k) * k;
      t.classList.remove('ciagnie'); t.scrollTo({ left: cel, behavior: 'smooth' });
    }
  });
  t.addEventListener('click', function (e) { if (ruch) { e.preventDefault(); e.stopPropagation(); ruch = false; } }, true);
})();

// pasek na telefonie dopiero po przewinięciu za pierwszy ekran
(function () {
  var m = document.getElementById('mob'), hero = document.querySelector('.hero');
  if (!m || !hero || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(function (w) { m.classList.toggle('widac', !w[0].isIntersecting); }).observe(hero);
})();

// mapa Google dopiero po kliknięciu
(function () {
  var b = document.getElementById('mapa-btn'); if (!b) return;
  b.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.src = 'https://www.google.com/maps?q=Rynek+18,+39-200+D%C4%99bica&z=17&output=embed';
    f.title = 'Mapa dojazdu: Rynek 18, Dębica'; f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
    document.getElementById('mapa').appendChild(f); b.remove();
  });
})();

// formularz pokazowy
(function () {
  var f = document.getElementById('formularz'); if (!f) return;
  f.addEventListener('submit', function (e) { e.preventDefault(); document.getElementById('komunikat').hidden = false; });
  document.getElementById('rok').textContent = new Date().getFullYear();
})();
