(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = !mainNav.classList.contains("is-open");
      mainNav.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 900px)").matches) {
          mainNav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
          navToggle.setAttribute("aria-label", "فتح القائمة");
        }
      });
    });
  }

  var root = document.querySelector("[data-carousel]");
  if (!root) return;

  var track = root.querySelector("[data-carousel-track]");
  var slides = root.querySelectorAll("[data-slide]");
  var prevBtn = root.querySelector("[data-carousel-prev]");
  var nextBtn = root.querySelector("[data-carousel-next]");
  if (!track || slides.length === 0) return;

  var index = 0;
  var timer = 0;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (slide, j) {
      slide.classList.toggle("is-active", j === index);
    });
  }

  function startTimer() {
    window.clearInterval(timer);
    timer = window.setInterval(function () {
      show(index + 1);
    }, 8000);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      show(index - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      show(index + 1);
    });
  }

  startTimer();

  root.addEventListener("mouseenter", function () {
    window.clearInterval(timer);
  });
  root.addEventListener("mouseleave", function () {
    startTimer();
  });
})();
