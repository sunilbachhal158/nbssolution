/*!
 * NBS Solution - Mobile sticky footer
 * Menu button opens the site's EXISTING offcanvas sidebar (.offcanvas-area).
 * Usage: <script src="assets/js/mobile-footer.js"></script>  (just before </body>)
 * Shows only on screens up to 991px wide.
 */
(function () {
  "use strict";
  if (window.__nbsMobileFooter) return;
  window.__nbsMobileFooter = true;

  // ====== EDIT THESE ======
  var PHONE_TEL = "+918168036519";
  var WHATSAPP_NUMBER = "918168036519"; // country code + number, no + or spaces
  var WHATSAPP_MSG = "Hello NBS Solution, I would like to know more about your services.";
  var BREAKPOINT = 991;
  var SERVICE_PAGES = [
    "services.html", "website-design-development.html", "ecommerce-website-development.html",
    "landing-page-design.html", "mobile-app-development.html", "website-maintenance-support.html",
    "seo-services.html", "social-media-marketing.html", "google-ads-meta-ads-ppc.html",
    "email-whatsapp-marketing.html"
  ];
  // ========================

  var ACCENT = "#C6F432", WA_GREEN = "#8ed703";
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var isHome = page === "" || page === "index.html";
  var isServices = SERVICE_PAGES.indexOf(page) !== -1;

  var ICON = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    services: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="14" y2="17"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>'
  };

  var css = [
    /* fallback used only if the theme's own opener cannot be found */
    ".offcanvas-area.nbs-open{right:0!important;left:auto!important;transform:translateX(0)!important;visibility:visible!important;opacity:1!important}",
    ".offcanvas-overlay.nbs-open{opacity:1!important;visibility:visible!important}",
    ".nbs-bar{display:none}",
    "@media (max-width:" + BREAKPOINT + "px){",
    "body{padding-bottom:calc(72px + env(safe-area-inset-bottom,0px))!important}",
    ".backtotop-wrap{bottom:calc(88px + env(safe-area-inset-bottom,0px))!important}",
    ".nbs-bar{display:grid;grid-template-columns:repeat(5,1fr);align-items:end;position:fixed;left:0;right:0;bottom:0;z-index:99990;background:#111;border-top:1px solid rgba(255,255,255,.08);padding:6px 4px calc(6px + env(safe-area-inset-bottom,0px));box-shadow:0 -4px 18px rgba(0,0,0,.25);font-family:inherit;transition:transform .25s ease}",
    ".nbs-bar.nbs-hidden{transform:translateY(115%)}",
    ".nbs-item{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:#c9c9c9;text-decoration:none;background:none;border:0;padding:6px 2px;font-size:11px;line-height:1.1;font-weight:500;cursor:pointer;-webkit-tap-highlight-color:transparent;font-family:inherit}",
    ".nbs-item svg{width:22px;height:22px;display:block}",
    ".nbs-item.is-active{color:" + ACCENT + "}",
    ".nbs-item:active{opacity:.7}",
    ".nbs-wa{position:relative;color:#fff;font-weight:600}",
    ".nbs-wa .nbs-wa-circle{display:flex;align-items:center;justify-content:center;width:56px;height:56px;margin-top:-26px;border-radius:50%;background:" + WA_GREEN + ";color:#fff;border:4px solid #111;box-shadow:0 6px 16px rgba(37,211,102,.45)}",
    ".nbs-wa .nbs-wa-circle svg{width:28px;height:28px}",
    "}"
  ].join("");

  var waHref = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MSG);
  var bar, observed = false;

  /* ---------- helpers to talk to the existing offcanvas ---------- */
  function getArea() { return document.querySelector(".offcanvas-area"); }

  function isVisibleOnScreen(el) {
    if (!el) return false;
    var cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || parseFloat(cs.opacity) < 0.1) return false;
    var r = el.getBoundingClientRect();
    return r.width > 0 && r.right > 10 && r.left < window.innerWidth - 10;
  }

  function findTrigger() {
    var nodes = document.querySelectorAll('[class*="offcanvas"],[class*="hamburger"],[class*="burger"],[class*="menu-bar"],[class*="menu-btn"],[class*="sidebar-toggle"],[class*="side-toggle"]');
    var best = null, bestScore = 0;
    Array.prototype.forEach.call(nodes, function (el) {
      if (el.closest(".offcanvas-area") || el.closest(".nbs-bar")) return;
      var cls = (typeof el.className === "string" ? el.className : "").toLowerCase();
      if (cls.indexOf("overlay") !== -1 || cls.indexOf("close") !== -1 || cls.indexOf("offcanvas-area") !== -1) return;
      var score = 0;
      if (/offcanvas.*(open|btn|toggle|trigger)|(open|btn|toggle|trigger).*offcanvas/.test(cls)) score += 5;
      if (/hamburger|burger|menu-bar|menu-btn|sidebar-toggle|side-toggle/.test(cls)) score += 3;
      if (el.closest("header,#common-header,[class*='header']")) score += 2;
      if (el.tagName === "BUTTON" || el.tagName === "A") score += 1;
      if (score > bestScore) { best = el; bestScore = score; }
    });
    return bestScore >= 3 ? best : null;
  }

  function forceOpen() {
    var area = getArea();
    if (!area) return;
    area.classList.add("offcanvas-opened", "nbs-open");
    Array.prototype.forEach.call(document.querySelectorAll(".offcanvas-overlay,.offcanvas-overlay-white"), function (o) {
      o.classList.add("overlay-open", "nbs-open");
    });
  }

  function forceClose() {
    var area = getArea();
    if (area) area.classList.remove("nbs-open");
    Array.prototype.forEach.call(document.querySelectorAll(".offcanvas-overlay,.offcanvas-overlay-white"), function (o) {
      o.classList.remove("nbs-open");
    });
  }

  function syncBar() {
    if (!bar) return;
    var open = isVisibleOnScreen(getArea());
    bar.classList.toggle("nbs-hidden", open);
  }

  function watchArea() {
    if (observed) return;
    var area = getArea();
    if (!area || !window.MutationObserver) return;
    observed = true;
    var mo = new MutationObserver(syncBar);
    mo.observe(area, { attributes: true, attributeFilter: ["class", "style"] });
    area.addEventListener("transitionend", syncBar);
  }

  function openMenu() {
    watchArea();
    var trigger = findTrigger();
    if (trigger) trigger.click();
    setTimeout(function () {
      if (!isVisibleOnScreen(getArea())) forceOpen();   // theme opener not found / did not work
      syncBar();
    }, 450);
    setTimeout(syncBar, 900);
  }

  /* ---------- build the bar ---------- */
  function build() {
    var style = document.createElement("style");
    style.setAttribute("data-nbs", "mobile-footer");
    style.textContent = css;
    document.head.appendChild(style);

    bar = document.createElement("nav");
    bar.className = "nbs-bar";
    bar.setAttribute("aria-label", "Quick navigation");
    bar.innerHTML =
      '<a class="nbs-item' + (isHome ? " is-active" : "") + '" href="index.html">' + ICON.home + "<span>Home</span></a>" +
      '<a class="nbs-item' + (isServices ? " is-active" : "") + '" href="services.html">' + ICON.services + "<span>Services</span></a>" +
      '<a class="nbs-item nbs-wa" href="' + waHref + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><span class="nbs-wa-circle">' + ICON.wa + "</span><span>WhatsApp</span></a>" +
      '<a class="nbs-item" href="tel:' + PHONE_TEL + '">' + ICON.phone + "<span>Call</span></a>" +
      '<button class="nbs-item" type="button" id="nbs-open" aria-label="Open menu">' + ICON.menu + "<span>Menu</span></button>";
    document.body.appendChild(bar);

    bar.querySelector("#nbs-open").addEventListener("click", openMenu);

    // keep bar and fallback state in sync when the theme's own close button / overlay is used
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest && (t.closest(".offcanvas-close-icon") || t.closest(".offcanvas-overlay") || t.closest(".offcanvas-overlay-white"))) forceClose();
      setTimeout(syncBar, 450);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { forceClose(); setTimeout(syncBar, 450); } });

    // header/offcanvas may be injected later by common-layout.js
    var tries = 0, iv = setInterval(function () {
      watchArea();
      if (observed || ++tries > 20) clearInterval(iv);
    }, 500);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
