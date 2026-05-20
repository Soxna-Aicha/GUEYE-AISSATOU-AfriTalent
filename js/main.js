/* =====================================================================================================================
   COMMIT 6
   AFRITALENT — Dark Mode • Navbar Scroll • Back To Top
===================================================================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================================
       1. DARK MODE + LOCAL STORAGE
       ====================================================================== */

    const themeToggle = document.getElementById("theme-toggle");
    const themeLabel = document.querySelector(".form-check-label");

    /* Charger le thème sauvegardé */
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (themeToggle) {
            themeToggle.checked = true;
        }

        if (themeLabel) {
            themeLabel.textContent = "☀️";
        }

    } else {

        document.body.classList.remove("dark-mode");

        if (themeLabel) {
            themeLabel.textContent = "🌙";
        }
    }

    /* Changement du thème */
    if (themeToggle) {

        themeToggle.addEventListener("change", () => {

            if (themeToggle.checked) {

                /* MODE SOMBRE ACTIVÉ */
                document.body.classList.add("dark-mode");

                localStorage.setItem("theme", "dark");

                if (themeLabel) {
                    themeLabel.textContent = "☀️";
                }

            } else {

                /* MODE CLAIR ACTIVÉ */
                document.body.classList.remove("dark-mode");

                localStorage.setItem("theme", "light");

                if (themeLabel) {
                    themeLabel.textContent = "🌙";
                }
            }
        });
    }

    /* ======================================================================
       2. NAVBAR DYNAMIQUE AU SCROLL
       ====================================================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (navbar) {

            if (window.scrollY > 50) {

                navbar.classList.add("navbar-scrolled");

            } else {

                navbar.classList.remove("navbar-scrolled");
            }
        }
    });

    /* ======================================================================
       3. BOUTON RETOUR EN HAUT
       ====================================================================== */

    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if (backToTop) {

            if (window.scrollY > 300) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");
            }
        }
    });

    /* Scroll fluide */
    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* =======================================================================
            COMMIT 7
       ======================================================================= */            
    /* ======================================================================
       4. COMPTEURS ANIMÉS
       ====================================================================== */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if(entry.isIntersecting) {

                const counter = entry.target;

                const target = +counter.getAttribute("data-target");

                let current = 0;

                const increment = target / 100;

                const updateCounter = () => {

                    current += increment;

                    if(current < target) {

                        counter.textContent = Math.ceil(current);

                        requestAnimationFrame(updateCounter);

                    } else {

                        counter.textContent = target;
                    }
                };

                updateCounter();

                observer.unobserve(counter);
            }
        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });



    /* ======================================================================
       5. ANIMATIONS FADE-IN
       ====================================================================== */

    const fadeElements = document.querySelectorAll(".fade-in");

    const fadeObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting) {

                entry.target.classList.add("show");
            }
        });

    }, {
        threshold: 0.2
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

});