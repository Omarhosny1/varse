(() => {
  "use strict";

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("list");

  const setMenu = (open) => {
    menuToggle.classList.toggle("active", open);
    navList.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  };

  menuToggle.addEventListener("click", () => {
    setMenu(!navList.classList.contains("active"));
  });

  // Close the menu after choosing a link, or with Escape
  navList.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  /* ---------- Reveal-on-scroll animation ---------- */
  const revealItems = document.querySelectorAll(".reveal");

  // Stagger items that sit side by side (each group of siblings restarts the count)
  revealItems.forEach((item) => {
    const siblings = [...item.parentElement.children].filter((el) =>
      el.classList.contains("reveal")
    );
    item.style.setProperty("--delay", `${(siblings.indexOf(item) % 4) * 90}ms`);
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    // Very old browsers: just show everything
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* ---------- Highlight the nav link of the section in view ---------- */
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const linkBySection = new Map();
  navLinks.forEach((link) => {
    linkBySection.set(link.getAttribute("href").slice(1), link);
  });

  const setActiveLink = (sectionId) => {
    navLinks.forEach((link) => {
      const isActive = link === linkBySection.get(sectionId);
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && linkBySection.has(entry.target.id)) {
            setActiveLink(entry.target.id);
          }
        });
      },
      // A thin band around the middle of the viewport decides the active section
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => sectionObserver.observe(section));
  }
  /* ---------- Cursor glow on cards ---------- */
  document
    .querySelectorAll(".feature-card, .team-member, .tech-category")
    .forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    });

  /* ---------- Click ripple on buttons ---------- */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      if (prefersReducedMotion.matches) return;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });

  /* ---------- Header shrink + scroll progress bar ---------- */
  const header = document.querySelector(".site-header");
  const progressBar = document.querySelector(".scroll-progress");
  let ticking = false;

  const updateOnScroll = () => {
    const scrollTop = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("scrolled", scrollTop > 20);
    progressBar.style.setProperty(
      "--progress",
      maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1).toFixed(4) : 0
    );
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateOnScroll);
      }
    },
    { passive: true }
  );
  updateOnScroll();
})();
