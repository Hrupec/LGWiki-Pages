/* =========================
   Clean Anchor URL
========================= */

function cleanUrlHash() {
    history.replaceState(null, "", window.location.pathname);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (!targetElement) return;

        event.preventDefault();

        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        cleanUrlHash();
    });
});

window.addEventListener("load", () => {
    if (window.location.hash) {
        cleanUrlHash();
    }
});


/* =========================
   Home Tool Preview Slider
========================= */

document.addEventListener("DOMContentLoaded", () => {
    const preview = document.querySelector("[data-tool-preview]");

    if (!preview) return;

    const previewTitle = preview.querySelector("[data-preview-title]");
    const previewMedia = preview.querySelector("[data-preview-media]");
    const previewStage = preview.querySelector("[data-preview-stage]");

    if (!previewTitle || !previewMedia || !previewStage) return;

    const tools = [
        {
            title: "Favourite Gifts",
            images: [
                {
                    src: "/LGWiki-Pages/pr-preview/pr-45/assets/images/tools-preview/fav-gifts.webp",
                    alt: "Favourite Gifts tool preview"
                }
            ]
        },
        {
            title: "Gifts Calculator",
            images: [
                {
                    src: "/LGWiki-Pages/pr-preview/pr-45/assets/images/tools-preview/gifts-calc.webp",
                    alt: "Gifts Calculator tool preview"
                }
            ]
        },
        {
            title: "Lvl Calculator",
            images: [
                {
                    src: "/LGWiki-Pages/pr-preview/pr-45/assets/images/tools-preview/lvl-calc.webp",
                    alt: "Lvl & Reboot Calculator tool preview"
                }
            ]
        }

        // {
        //     title: "Lvl Calculator",
        //     images: [
        //         {
        //             src: "/LGWiki-Pages/pr-preview/pr-45/assets/images/tools-preview/lvl-calc-1.webp",
        //             alt: "Lvl Calculator top section preview"
        //         },
        //         {
        //             src: "/LGWiki-Pages/pr-preview/pr-45/assets/images/tools-preview/lvl-calc-2.webp",
        //             alt: "Lvl Calculator tables preview"
        //         },
        //         {
        //             src: "/LGWiki-Pages/pr-preview/pr-45/assets/images/tools-preview/lvl-calc-3.webp",
        //             alt: "Lvl Calculator serum tables preview"
        //         }
        //     ]
        // }
    ];

    let currentIndex = 0;
    let sliderInterval = null;
    const slideDelay = 5000;

    function createImageElement(image, isActive) {
        const img = document.createElement("img");

        img.src = image.src;
        img.alt = image.alt;
        img.loading = "lazy";
        img.decoding = "async";

        if (isActive) {
            img.classList.add("is-active");
        }

        return img;
    }

    function renderStageButtons() {
        previewStage.innerHTML = "";

        tools.forEach((tool, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.setAttribute("aria-label", `Show ${tool.title} preview`);

            if (index === currentIndex) {
                button.classList.add("is-active");
            }

            button.addEventListener("click", () => {
                showSlide(index);
                restartSlider();
            });

            previewStage.appendChild(button);
        });
    }

    function renderImages(tool) {
        previewMedia.innerHTML = "";

        tool.images.forEach((image, index) => {
            previewMedia.appendChild(createImageElement(image, index === 0));
        });

        previewMedia.classList.toggle("has-multiple-images", tool.images.length > 1);
    }

    function updateStageButtons() {
        const buttons = previewStage.querySelectorAll("button");

        buttons.forEach((button, index) => {
            button.classList.toggle("is-active", index === currentIndex);
        });
    }

    function showSlide(index) {
        const tool = tools[index];

        if (!tool) return;

        currentIndex = index;
        previewTitle.textContent = tool.title;

        renderImages(tool);
        updateStageButtons();
    }

    function showNextSlide() {
        const nextIndex = (currentIndex + 1) % tools.length;
        showSlide(nextIndex);
    }

    function startSlider() {
        if (tools.length <= 1 || sliderInterval) return;

        sliderInterval = window.setInterval(showNextSlide, slideDelay);
    }

    function stopSlider() {
        if (!sliderInterval) return;

        window.clearInterval(sliderInterval);
        sliderInterval = null;
    }

    function restartSlider() {
        stopSlider();
        startSlider();
    }

    renderStageButtons();
    showSlide(currentIndex);
    startSlider();

    preview.addEventListener("mouseenter", stopSlider);
    preview.addEventListener("mouseleave", restartSlider);

    preview.addEventListener("focusin", stopSlider);
    preview.addEventListener("focusout", restartSlider);
});


/* =========================
   Gameplay Showcase - Animation
========================= */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }

    });

}, {
    threshold: 0.2
});

reveals.forEach(el => observer.observe(el));