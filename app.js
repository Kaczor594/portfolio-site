/* Isaac Kaczor — portfolio behaviors. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme: system default, persisted override ---------- */
  var THEME_KEY = "ik-theme";
  var toggle = document.getElementById("theme-toggle");

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.textContent = theme === "dark" ? "☾" : "☀"; // ☾ / ☀
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }
  var stored = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}
  applyTheme(stored || systemTheme());

  // Follow system changes only while the user hasn't picked an explicit theme.
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  var onSystem = function () { var s = null; try { s = localStorage.getItem(THEME_KEY); } catch (e) {} if (!s) applyTheme(systemTheme()); };
  if (mq.addEventListener) mq.addEventListener("change", onSystem);
  else if (mq.addListener) mq.addListener(onSystem);

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  /* ---------- Topbar: dissolve on scroll ---------- */
  var topbar = document.getElementById("topbar");
  var onScrollBar = function () {
    if (!topbar) return;
    topbar.classList.toggle("scrolled", window.scrollY > 16);
  };
  onScrollBar();
  window.addEventListener("scroll", onScrollBar, { passive: true });

  /* ---------- Smooth in-page nav with topbar offset ---------- */
  var OFFSET = 72;
  function scrollToId(id) {
    if (id === "top") { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); return; }
    var el = document.getElementById(id);
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
  }
  document.querySelectorAll("[data-nav]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToId(a.getAttribute("data-nav"));
    });
  });

  /* ---------- Scrollspy: highlight active nav link ---------- */
  var spy = ["hero", "work", "live", "about", "cv", "contact"];
  var navLinks = {};
  document.querySelectorAll(".nav-link[data-nav]").forEach(function (a) {
    navLinks[a.getAttribute("data-nav")] = a;
  });
  function setActive(id) {
    Object.keys(navLinks).forEach(function (k) {
      navLinks[k].classList.toggle("active", k === id);
    });
  }
  var onSpy = function () {
    var y = window.scrollY + 200;
    for (var i = spy.length - 1; i >= 0; i--) {
      var el = document.getElementById(spy[i]);
      if (el && el.offsetTop <= y) {
        setActive(spy[i] === "hero" ? "top" : spy[i]);
        return;
      }
    }
    setActive("top");
  };
  onSpy();
  window.addEventListener("scroll", onSpy, { passive: true });

  /* ---------- Work detail sheets (modal) ---------- */
  var openScrim = null;
  var lastFocus = null;

  function openSheet(id) {
    var scrim = document.querySelector('.sheet-scrim[data-sheet="' + id + '"]');
    if (!scrim) return;
    lastFocus = document.activeElement;
    scrim.hidden = false;
    openScrim = scrim;
    document.body.style.overflow = "hidden";
    var closeBtn = scrim.querySelector("[data-close]");
    if (closeBtn) closeBtn.focus();
  }
  function closeSheet() {
    if (!openScrim) return;
    openScrim.hidden = true;
    openScrim = null;
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll("[data-open]").forEach(function (card) {
    card.addEventListener("click", function () { openSheet(card.getAttribute("data-open")); });
  });
  document.querySelectorAll(".sheet-scrim").forEach(function (scrim) {
    scrim.addEventListener("click", function (e) { if (e.target === scrim) closeSheet(); });
  });
  document.querySelectorAll("[data-close]").forEach(function (btn) {
    btn.addEventListener("click", closeSheet);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && openScrim) closeSheet();
    // Simple focus trap inside an open sheet.
    if (e.key === "Tab" && openScrim) {
      var f = openScrim.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
