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

  // Lightbox: klicka på en projektbild för att förstora den. Varje
  // .project-media-behållare kan innehålla flera bilder (den första synlig
  // som omslag, resten dolda med [hidden]) - i lightboxen kan man bläddra
  // mellan alla bilder som hör till samma projekt med pil-knappar.
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const galleries = document.querySelectorAll(".project-media");

  if (lightbox && lightboxImg && lightboxClose && galleries.length) {
    let lastFocused = null;
    let currentImages = [];
    let currentIndex = 0;

    const showImage = (index) => {
      currentIndex = (index + currentImages.length) % currentImages.length;
      const img = currentImages[currentIndex];
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      const multiple = currentImages.length > 1;
      lightboxPrev.hidden = !multiple;
      lightboxNext.hidden = !multiple;
      lightboxCounter.hidden = !multiple;
      if (multiple) {
        lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
      }
    };

    const openLightbox = (images, index) => {
      lastFocused = document.activeElement;
      currentImages = images;
      showImage(index);
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      lightboxClose.focus();
    };

    const closeLightbox = () => {
      lightbox.hidden = true;
      lightboxImg.src = "";
      document.body.classList.remove("lightbox-open");
      if (lastFocused) lastFocused.focus();
    };

    galleries.forEach((gallery) => {
      const images = Array.from(gallery.querySelectorAll("img"));
      if (!images.length) return;

      images.forEach((img, index) => {
        img.tabIndex = 0;
        img.setAttribute("role", "button");
        img.setAttribute("aria-label", `Förstora bild: ${img.alt}`);
        img.addEventListener("click", () => openLightbox(images, index));
        img.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openLightbox(images, index);
          }
        });
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", () => showImage(currentIndex - 1));
    lightboxNext.addEventListener("click", () => showImage(currentIndex + 1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      if (e.key === "ArrowRight") showImage(currentIndex + 1);
    });
  }
});
