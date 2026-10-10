// =========================================
// MADE FOR MORE
// JavaScript Functionality
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    if (menuButton && navigation) {

        function closeMenu() {

            menuButton.setAttribute("aria-expanded", "false");

            menuButton.setAttribute(
                "aria-label",
                "Open navigation"
            );

            navigation.classList.remove("is-open");

        }

        menuButton.addEventListener("click", () => {

            const isOpen =
                menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Open navigation" : "Close navigation"
            );

            navigation.classList.toggle("is-open", !isOpen);

        });


        // Close the mobile menu when a link is selected.

        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });


        // Close the menu when returning to desktop width.

        window.addEventListener("resize", () => {

            if (window.innerWidth > 800) {
                closeMenu();
            }

        });

    }


    // =====================================
    // INDEPENDENT SLIDESHOWS
    // =====================================

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    document.querySelectorAll("[data-slideshow]").forEach(slideshow => {

        const slides = Array.from(
            slideshow.querySelectorAll(".slide")
        );

        const dotsContainer = slideshow.querySelector(".slide-dots");

        const previousButton =
            slideshow.querySelector(".slide-arrow.prev");

        const nextButton =
            slideshow.querySelector(".slide-arrow.next");


        // Each slideshow uses its own timing.

        const interval =
            Number(slideshow.dataset.interval) || 6000;


        let currentIndex = 0;

        let timer = null;


        if (!slides.length || !dotsContainer) {
            return;
        }


        // Create the navigation dots.

        const dots = slides.map((slide, index) => {

            const dot = document.createElement("button");

            dot.type = "button";

            dot.className = "slide-dot";

            dot.setAttribute(
                "aria-label",
                `Show slide ${index + 1}`
            );

            dot.setAttribute(
                "aria-current",
                String(index === 0)
            );


            dot.addEventListener("click", () => {

                showSlide(index);

                restartAutoplay();

            });


            dotsContainer.appendChild(dot);

            return dot;

        });


        // Display the selected slide.

        function showSlide(index) {

            currentIndex =
                (index + slides.length) % slides.length;


            slides.forEach((slide, i) => {

                const isActive = i === currentIndex;

                slide.classList.toggle(
                    "is-active",
                    isActive
                );

                slide.setAttribute(
                    "aria-hidden",
                    String(!isActive)
                );

            });


            dots.forEach((dot, i) => {

                dot.setAttribute(
                    "aria-current",
                    String(i === currentIndex)
                );

            });

        }


        // Stop the slideshow timer.

        function stopAutoplay() {

            if (timer !== null) {

                clearInterval(timer);

                timer = null;

            }

        }


        // Start an independent timer for this slideshow.

        function startAutoplay() {

            stopAutoplay();

            if (reduceMotion || slides.length < 2) {
                return;
            }

            timer = setInterval(() => {

                showSlide(currentIndex + 1);

            }, interval);

        }


        // Restart the timer after manual navigation.

        function restartAutoplay() {

            startAutoplay();

        }


        // Previous and next buttons.

        if (nextButton) {

            nextButton.addEventListener("click", () => {

                showSlide(currentIndex + 1);

                restartAutoplay();

            });

        }


        if (previousButton) {

            previousButton.addEventListener("click", () => {

                showSlide(currentIndex - 1);

                restartAutoplay();

            });

        }


        // Pause when a visitor hovers over the slideshow.

        slideshow.addEventListener("mouseenter", stopAutoplay);

        slideshow.addEventListener("mouseleave", startAutoplay);


        // Pause while the slideshow contains keyboard focus.

        slideshow.addEventListener("focusin", stopAutoplay);

        slideshow.addEventListener("focusout", event => {

            if (!slideshow.contains(event.relatedTarget)) {

                startAutoplay();

            }

        });


        // Start this slideshow independently.

        showSlide(0);

        startAutoplay();

    });


    // =====================================
    // AUTOMATIC COPYRIGHT YEAR
    // =====================================

    const yearElement = document.getElementById("year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }

});
