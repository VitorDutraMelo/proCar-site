/* PROCAR Detailing — interactions (vanilla JS) */
(function () {
    "use strict";

    /* Current year in footer */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* Nav on scroll */
    var nav = document.querySelector(".nav");
    var onScroll = function () {
        if (!nav) return;
        if (window.scrollY > 40) nav.classList.add("is-scrolled");
        else nav.classList.remove("is-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Smooth scrolling fallback for older browsers (anchors are native) */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener("click", function (e) {
            var id = a.getAttribute("href");
            if (!id || id === "#") return;
            var target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            var navH = nav ? nav.offsetHeight : 0;
            var y = target.getBoundingClientRect().top + window.scrollY - navH + 1;
            window.scrollTo({ top: y, behavior: "smooth" });
        });
    });

    /* Reveal on scroll */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry, i) {
                    if (entry.isIntersecting) {
                        var el = entry.target;
                        setTimeout(function () {
                            el.classList.add("is-visible");
                        }, i * 60);
                        io.unobserve(el);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
        );
        reveals.forEach(function (el) {
            io.observe(el);
        });
    } else {
        reveals.forEach(function (el) {
            el.classList.add("is-visible");
        });
    }

    /* Card spotlight (mouse-follow glow) */
    document.querySelectorAll(".card").forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
            var r = card.getBoundingClientRect();
            var mx = ((e.clientX - r.left) / r.width) * 100;
            var my = ((e.clientY - r.top) / r.height) * 100;
            card.style.setProperty("--mx", mx + "%");
            card.style.setProperty("--my", my + "%");
        });
    });
})();
