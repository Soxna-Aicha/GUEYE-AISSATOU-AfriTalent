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
    
    /* ======================================================================
    COMMIT8: 6. FILTRAGE DES FREELANCES (SANS RECHARGEMENT)
    ====================================================================== */
    const filterButtons = document.querySelectorAll(".btn-filtre");
    const freelanceCards = document.querySelectorAll(".carte-freelance");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Retire la classe active de tous les boutons
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            // Ajoute active au bouton cliqué
            button.classList.add("active");

            //catégorie choisie
            const category = button.dataset.category;

            // On filtre les cartes
            freelanceCards.forEach(card => {

                if (category === "all" || card.dataset.category === category) {
                    card.style.display = "";
                
                } else {
                    card.style.display = "none";
                }
            });
        });
    });


    /* ======================================================================
    7. VALIDATION COMPLETE DU FORMULAIRE DE CONTACT
    ====================================================================== */
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Récupération des champs
            const nom = document.getElementById("nom");
            const prenom = document.getElementById("prenom");
            const email = document.getElementById("email");
            const sujet = document.getElementById("sujet");
            const message = document.getElementById("message");

            // Récupération des zones d'erreurs
            const errorNom = document.getElementById("error-nom");
            const errorPrenom = document.getElementById("error-prenom");
            const errorEmail = document.getElementById("error-email");
            const errorSujet = document.getElementById("error-sujet");
            const errorMessage = document.getElementById("error-message");

            // Message de succès
            const successMessage = document.getElementById("success-message");

            // Reset des messages d'erreur et masquage initial du succès
            errorNom.textContent = "";
            errorPrenom.textContent = "";
            errorEmail.textContent = "";
            errorSujet.textContent = "";
            errorMessage.textContent = "";
            if (successMessage) successMessage.classList.add("d-none");

            // Variable témoin de validation
            let isValid = true;

            // Validation du nom
            if (nom.value.trim() === "") {
                errorNom.textContent = "Le nom est obligatoire.";
                isValid = false;
            }

            // Validation du prénom
            if (prenom.value.trim() === "") {
                errorPrenom.textContent = "Le prénom est obligatoire.";
                isValid = false;
            }

            // Validation de l'email avec Regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === "") {
                errorEmail.textContent = "L'email est obligatoire.";
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                errorEmail.textContent = "Format email invalide (ex: exemple@domaine.com).";
                isValid = false;
            }

            // Validation du sujet sélectionné
            if (!sujet || sujet.value === "") {
                errorSujet.textContent = "Veuillez choisir un sujet.";
                isValid = false;
            }

            // Validation de la longueur du message
            if (message.value.trim() === "") {
                errorMessage.textContent = "Le message est obligatoire.";
                isValid = false;
            } else if (message.value.trim().length < 20) {
                errorMessage.textContent = "Votre message doit contenir au moins 20 caractères.";
                isValid = false;
            }

            // Si tout le formulaire est valide
            if (isValid) {
                if (successMessage) {
                    successMessage.classList.remove("d-none");
                }
                contactForm.reset(); // Vide tous les champs
            }
        });
    }
});   
