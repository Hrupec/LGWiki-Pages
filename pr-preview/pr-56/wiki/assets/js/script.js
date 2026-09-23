/* =========================
   Wiki Home
========================= */

document.addEventListener("DOMContentLoaded", () => {
    initWikiHomeStats();
    initWikiHomeReveal();
});


/* =========================
   Wiki Home Stats
========================= */

function initWikiHomeStats() {
    const sectionCounter = document.querySelector("[data-wiki-stat='sections']");
    const pageCounter = document.querySelector("[data-wiki-stat='pages']");
    const sidebarMount = document.getElementById("wikiSidebar");

    if (!sectionCounter || !pageCounter) return;

    updateWikiHomeStats();

    if (!sidebarMount) return;

    const observer = new MutationObserver(() => {
        updateWikiHomeStats();
    });

    observer.observe(sidebarMount, {
        childList: true,
        subtree: true
    });
}

function updateWikiHomeStats() {
    const sectionCounter = document.querySelector("[data-wiki-stat='sections']");
    const pageCounter = document.querySelector("[data-wiki-stat='pages']");

    if (!sectionCounter || !pageCounter) return;

    const sections = document.querySelectorAll("[data-wiki-section-card]").length;

    const sidebarEntries = document.querySelectorAll(`
        .wiki-sidebar-category-link,
        .wiki-sidebar-single-link,
        .wiki-sidebar-subcategory-link,
        .wiki-sidebar-links > a,
        .wiki-sidebar-sublinks > a
    `).length;

    sectionCounter.textContent = sections;
    pageCounter.textContent = sidebarEntries;
}


/* =========================
   Wiki Home Reveal
========================= */

function initWikiHomeReveal() {
    const items = document.querySelectorAll(
        ".wiki-home-hero, .wiki-home-section, .wiki-home-box"
    );

    if (!items.length) return;

    items.forEach((item) => {
        item.classList.add("wiki-home-reveal");
    });

    if (!("IntersectionObserver" in window)) {
        items.forEach((item) => {
            item.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14
        }
    );

    items.forEach((item) => {
        observer.observe(item);
    });
}