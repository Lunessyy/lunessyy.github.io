// Portfolio — små interaktioner utan externa beroenden.

document.addEventListener("DOMContentLoaded", () => {
  // Årtal i footern
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobilmeny
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mobileNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Stäng menyn när en länk klickas
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Enkel scroll-reveal: element med klassen .reveal tonas in när de rullas
  // in i synfältet. Progressiv förbättring - se kommentaren i style.css.
  // Elementen är synliga tills VI ALLA VILLKOR ÄR UPPFYLLDA och vi själva
  // döljer dem, så ett fel här kan aldrig göra sidan permanent tom.
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length && !prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("reveal-hidden"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-hidden");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }
  // Annars: gör ingenting. Elementen har redan sin vanliga, synliga CSS.
});
