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
   Copy Discord Username
========================= */

const DISCORD_USERNAME = "hrupec";
const copyDiscordBtn = document.getElementById("copyDiscordBtn");

function setCopyButtonText(text) {
    if (!copyDiscordBtn) return;
    copyDiscordBtn.textContent = text;
}

async function copyDiscordUsername() {
    if (!copyDiscordBtn) return;

    try {
        await navigator.clipboard.writeText(DISCORD_USERNAME);

        setCopyButtonText("Copied!");

        setTimeout(() => {
            setCopyButtonText("Copy Username");
        }, 1600);
    } catch {
        setCopyButtonText("Copy Failed");

        setTimeout(() => {
            setCopyButtonText("Copy Username");
        }, 1600);
    }
}

copyDiscordBtn?.addEventListener("click", copyDiscordUsername);