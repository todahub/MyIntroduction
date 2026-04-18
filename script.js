const revealElements = [...document.querySelectorAll(".reveal")];
const sections = [...document.querySelectorAll("[data-section]")];
const navLinks = [...document.querySelectorAll(".site-nav a")];
const scrollProgress = document.getElementById("scroll-progress");

revealElements.forEach((element) => {
  const delay = element.dataset.delay;

  if (delay) {
    element.style.setProperty("--delay", `${Number(delay) * 1000}ms`);
  }
});

const setActiveLink = (activeId) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", isActive);
  });
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        setActiveLink(entry.target.id);
      });
    },
    {
      threshold: 0.3,
      rootMargin: "-20% 0px -45% 0px",
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (sections.length > 0) {
  setActiveLink(sections[0].id);
}

const updateProgress = () => {
  if (!scrollProgress) {
    return;
  }

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollProgress.style.width = `${Math.min(progress, 100)}%`;
};

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
