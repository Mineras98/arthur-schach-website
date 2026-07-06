/* Schachtraining Artur — interactions */
(function () {
  "use strict";

  // ---- Mobile nav ----
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---- Scroll reveal ----
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- Contact form -> mailto (no backend required) ----
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var endpoint = "https://formsubmit.co/ajax/" + (form.getAttribute("data-email") || "info@schachtraining-artur.com");

    function showStatus(msg, ok) {
      if (!status) return;
      status.hidden = false;
      status.style.background = ok ? "var(--brass-soft)" : "#fbe6e2";
      status.style.color = ok ? "var(--ink-2)" : "#8a2b1c";
      status.textContent = msg;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (typeof form.reportValidity === "function" && !form.reportValidity()) return;

      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Wird gesendet …"; }
      if (status) { status.hidden = true; }

      fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (json) {
          if (json && (json.success === true || json.success === "true")) {
            showStatus("Vielen Dank! Deine Anfrage wurde gesendet – ich melde mich zeitnah bei dir.", true);
            form.reset();
          } else if (json && json.message) {
            // z. B. Hinweis zur einmaligen Aktivierung von FormSubmit
            showStatus(json.message, true);
          } else {
            throw new Error("no success");
          }
        })
        .catch(function () {
          showStatus("Das Senden hat leider nicht geklappt. Bitte schreib direkt an info@schachtraining-artur.com oder ruf an: +49 157 53393009.", false);
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
        });
    });
  }

  // ---- Footer year ----
  var y = document.getElementById("year");
  if (y) { y.textContent = new Date().getFullYear(); }
})();
