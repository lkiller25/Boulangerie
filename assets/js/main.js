/* La Fournée Martégale — interactions
   - menu mobile
   - lien de navigation actif
   - apparition au défilement (IntersectionObserver)
   - ligne du jour mise en évidence dans les horaires
   - formulaire de commande (sans back-end : ouvre le client mail)
   - année courante dans le pied de page
*/
(function () {
  'use strict';

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Lien actif ---------- */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .footer-col a').forEach(function (a) {
    var target = a.getAttribute('href').split('#')[0];
    if (target && target === here) { a.classList.add('is-active'); }
  });

  /* ---------- Apparition au défilement ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Jour courant dans les horaires ---------- */
  var jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  var today = jours[new Date().getDay()];
  document.querySelectorAll('.hours__row').forEach(function (row) {
    if ((row.dataset.day || '').toLowerCase() === today) { row.classList.add('is-today'); }
  });

  /* ---------- Formulaire ---------- */
  var form = document.querySelector('.js-order-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var nom = (data.get('nom') || '').toString().trim();
      var tel = (data.get('tel') || '').toString().trim();
      var retrait = (data.get('retrait') || '').toString().trim();
      var commande = (data.get('commande') || '').toString().trim();

      if (!nom || !commande) {
        alert('Merci d’indiquer votre nom et le détail de votre commande.');
        return;
      }

      var subject = 'Commande – ' + nom + (retrait ? ' (' + retrait + ')' : '');
      var body = 'Nom : ' + nom + '\n'
               + 'Téléphone : ' + (tel || '—') + '\n'
               + 'Retrait souhaité : ' + (retrait || '—') + '\n\n'
               + 'Commande :\n' + commande;

      window.location.href = 'mailto:commande@lafourneemartegale.fr'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      var ok = document.querySelector('.form__success');
      if (ok) {
        ok.textContent = 'Merci ' + nom + ' ! Votre messagerie s’ouvre avec le récapitulatif — il ne vous reste qu’à l’envoyer. Vous pouvez aussi nous appeler au 04 42 80 12 34.';
        ok.classList.add('is-visible');
      }
    });
  }

  /* ---------- Année ---------- */
  var year = document.querySelector('.js-year');
  if (year) { year.textContent = new Date().getFullYear(); }
})();
