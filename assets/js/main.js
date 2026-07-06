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
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      var name = (f.name && f.name.value || "").trim();
      var email = (f.email && f.email.value || "").trim();
      var phone = (f.phone && f.phone.value || "").trim();
      var subject = (f.subject && f.subject.value || "Trainingsanfrage").trim();
      var message = (f.message && f.message.value || "").trim();

      var body =
        "Name: " + name + "\n" +
        "E-Mail: " + email + "\n" +
        (phone ? "Telefon: " + phone + "\n" : "") +
        "Interesse: " + subject + "\n\n" +
        message + "\n";

      var href = "mailto:info@schachtraining-artur.com" +
        "?subject=" + encodeURIComponent("Anfrage: " + subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = href;

      var status = document.getElementById("form-status");
      if (status) {
        status.hidden = false;
        status.textContent =
          "Danke! Dein E-Mail-Programm öffnet sich mit der fertigen Nachricht. " +
          "Falls nicht, schreib gern direkt an info@schachtraining-artur.com.";
      }
    });
  }

  // ---- Footer year ----
  var y = document.getElementById("year");
  if (y) { y.textContent = new Date().getFullYear(); }
})();
