document.addEventListener("DOMContentLoaded", () => {
    const body = document.body,
        navLinks = document.querySelectorAll(".floating-nav a[href^='#']"),
        sections = document.querySelectorAll("section[id]"),
        scrollEls = document.querySelectorAll(".scroll-reveal"),
        backToTop = document.querySelector(".back-to-top");

    // Scroll state for nav + header
    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        body.classList.toggle("scrolled", y > 100);

        sections.forEach(s => {
            const h = s.offsetHeight, t = s.offsetTop - 120,
                link = document.querySelector(`.floating-nav a[href="#${s.id}"]`);
            if (!link) return;
            link.classList.toggle("active", y > t && y <= t + h);
        });

        scrollEls.forEach(el => el.classList.toggle("in-view", el.getBoundingClientRect().top <= window.innerHeight - 100));
        if (backToTop) backToTop.classList.toggle("visible", y > 600);
    });

    // Smooth scroll nav links
    navLinks.forEach(l => l.addEventListener("click", e => {
        const id = l.getAttribute("href").replace("#", ""), target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 60, behavior: "smooth" });
        navLinks.forEach(x => x.classList.remove("active"));
        l.classList.add("active");
    }));

    // Back to top
    backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
