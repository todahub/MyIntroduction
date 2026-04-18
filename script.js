const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("[data-section]");
const navLinks = document.querySelectorAll(".site-nav a");
const scrollProgress = document.getElementById("scroll-progress");

revealElements.forEach((element) => {
  const delay = element.dataset.delay;

  if (delay) {
    element.style.setProperty("--delay", `${Number(delay) * 1000}ms`);
  }
});

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
    threshold: 0.18,
    rootMargin: "0px 0px -12% 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const activeId = entry.target.id;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("is-active", isActive);
      });
    });
  },
  {
    threshold: 0.45,
    rootMargin: "-15% 0px -30% 0px",
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const updateProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollProgress.style.width = `${Math.min(progress, 100)}%`;
};

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
