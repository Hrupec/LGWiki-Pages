/* =========================
   Donate Page Config
========================= */

const DONATION_GOAL = 100;
const CURRENT_AMOUNT = 11.64;
const HOSTING_EXPIRES_AT = "2026-12-05T00:16:58";

const supporters = [
    { name: "OxKing", amount: "$11.64", rank: 1 }
    // { name: "Nick", amount: "$15", rank: 2 },
    // { name: "Nick", amount: "$10", rank: 3 },
    // { name: "Nick", amount: "$5" },
    // { name: "Nick", amount: "$2" }
];

function getSupporterRankBadge(rank) {
    if (rank === 1) return `<span class="supporter-rank supporter-rank-gold">★</span>`;
    if (rank === 2) return `<span class="supporter-rank supporter-rank-silver">★</span>`;
    if (rank === 3) return `<span class="supporter-rank supporter-rank-bronze">★</span>`;
    return "";
}


/* =========================
   Goal Progress
========================= */

function updateGoalProgress() {
    const raisedAmount = document.getElementById("raisedAmount");
    const goalPercent = document.getElementById("goalPercent");
    const progressFill = document.getElementById("progressFill");

    if (!raisedAmount || !goalPercent || !progressFill) return;

    const percent = DONATION_GOAL > 0
    ? Math.min((CURRENT_AMOUNT / DONATION_GOAL) * 100, 100)
    : 0;

    raisedAmount.textContent = `$${CURRENT_AMOUNT}`;
    goalPercent.textContent = `${Math.round(percent)}%`;
    progressFill.style.width = `${percent}%`;
}


/* =========================
   Countdown
========================= */

function updateCountdown() {
    const daysLeftElement = document.getElementById("daysLeft");
    if (!daysLeftElement) return;

    const now = new Date();
    const expireDate = new Date(HOSTING_EXPIRES_AT);

    const diff = expireDate - now;
    const daysLeft = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);

    daysLeftElement.textContent = daysLeft;
}


/* =========================
   Supporters
========================= */

function getEmptySupportersHTML() {
    return `
        <article class="supporter-empty-card">
            <span class="supporter-empty-icon">❤</span>
            <div>
                <h3>Be the first supporter of Lust Goddess Wiki ♡</h3>
                <p>
                    Your name can appear here as a small thank-you for helping keep the wiki online.
                </p>
            </div>
        </article>
    `;
}

function getSupporterCardHTML(supporter) {
    return `
        <article class="supporter-card">
            <h3 class="${supporter.rank ? `supporter-name-rank-${supporter.rank}` : ""}">
                ${getSupporterRankBadge(supporter.rank)}
                <span>${supporter.name}</span>
            </h3>
            <p>
                <span class="supporter-thanks">Thanks for</span>
                <span class="supporter-amount">${supporter.amount}</span>
            </p>
        </article>
    `;
}

function renderSupporters() {
    const supportersGrid = document.getElementById("supportersGrid");
    if (!supportersGrid) return;

    const isEmpty = supporters.length === 0;

    supportersGrid.classList.toggle("supporters-grid-empty", isEmpty);
    supportersGrid.innerHTML = isEmpty
        ? getEmptySupportersHTML()
        : supporters.map(getSupporterCardHTML).join("");
}

function updateSupportersOverflow() {
    const supportersGrid = document.getElementById("supportersGrid");
    if (!supportersGrid) return;

    const hasOverflow = supportersGrid.scrollWidth > supportersGrid.clientWidth;

    supportersGrid.classList.toggle("has-overflow", hasOverflow);
}


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
   Init
========================= */

updateGoalProgress();
updateCountdown();
renderSupporters();
updateSupportersOverflow();

window.addEventListener("resize", updateSupportersOverflow);