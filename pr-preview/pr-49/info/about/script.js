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