/* Small-screen helpers shared by every page.
   1. Collapses the main navigation behind a Menu button on phones and
      tablets (the CSS only shows the button at 900px and below).
   2. Marks tables that are wider than the screen so the CSS can show a
      "swipe sideways" hint.
   Without JavaScript nothing changes: the full navigation stays visible
   and wide tables still scroll sideways. */
(function () {
  'use strict';

  document.documentElement.className += ' js';

  var nav = document.querySelector('.site-nav');
  if (nav && nav.parentNode) {
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'site-nav');
    toggle.innerHTML = '<span class="nav-toggle-icon" aria-hidden="true"></span><span class="nav-toggle-label">Menu</span>';
    nav.id = 'site-nav';
    nav.parentNode.insertBefore(toggle, nav);

    var setOpen = function (open) {
      nav.className = open ? 'site-nav is-open' : 'site-nav';
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.lastChild.textContent = open ? 'Close' : 'Menu';
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (event) {
      if ((event.key === 'Escape' || event.key === 'Esc') && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  function markWideTables() {
    var wraps = document.querySelectorAll('.table-wrap');
    for (var i = 0; i < wraps.length; i++) {
      var wrap = wraps[i];
      var scrollable = wrap.scrollWidth > wrap.clientWidth + 1;
      var atEnd = wrap.scrollLeft + wrap.clientWidth >= wrap.scrollWidth - 1;
      var name = 'table-wrap' + (scrollable ? ' is-scrollable' : '') + (scrollable && atEnd ? ' is-scrolled-end' : '');
      if (wrap.className !== name) wrap.className = name;
      if (scrollable) {
        wrap.setAttribute('tabindex', '0');
      } else {
        wrap.removeAttribute('tabindex');
      }
    }
  }

  function start() {
    var wraps = document.querySelectorAll('.table-wrap');
    for (var i = 0; i < wraps.length; i++) {
      wraps[i].addEventListener('scroll', markWideTables);
      /* The calculator rewrites its result tables, which can change their width. */
      if (window.ResizeObserver) {
        var table = wraps[i].querySelector('table');
        if (table) new ResizeObserver(markWideTables).observe(table);
      }
    }
    markWideTables();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
  window.addEventListener('resize', markWideTables);
  window.addEventListener('load', markWideTables);
})();
