/* =========================================================
   Wiki Components Script
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    setupWikiAnchorLinks();
    setupWikiTabs();
    setupWikiAccordion();
    setupWikiCopyButtons();
    setupWikiFilters();
    setupExpandableImages();
    setupWikiModals();
    setupWikiLocalNavScrollbars();
    setupWikiLocalNavActiveLinks();
    setupWikiLastUpdate();
});

/* =========================
   01. Smooth Anchors + Clean URL Hash
========================= */

function setupWikiAnchorLinks() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.replaceState(null, "", window.location.pathname);
        });
    });

    window.addEventListener("load", () => {
        if (window.location.hash) {
            history.replaceState(null, "", window.location.pathname);
        }
    });
}

/* =========================
   02. Tabs
========================= */

function setupWikiTabs() {
    const tabGroups = document.querySelectorAll("[data-wiki-tabs]");

    tabGroups.forEach((group) => {
        const buttons = group.querySelectorAll("[data-tab-target]");
        const panels = group.querySelectorAll("[data-tab-panel]");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const target = button.dataset.tabTarget;

                buttons.forEach((item) => {
                    item.classList.remove("is-active", "active");
                });

                panels.forEach((panel) => {
                    const isTarget = panel.dataset.tabPanel === target;
                    panel.classList.toggle("is-active", isTarget);
                    panel.classList.toggle("active", isTarget);
                });

                button.classList.add("is-active");
                button.classList.add("active");
            });
        });
    });
}

/* =========================
   03. Accordion
========================= */

function setupWikiAccordion() {
    const accordions = document.querySelectorAll("[data-wiki-accordion]");

    accordions.forEach((accordion) => {
        const modernItems = accordion.querySelectorAll(".wiki-accordion-item");

        modernItems.forEach((item) => {
            const button = item.querySelector("button");

            if (!button) return;

            button.addEventListener("click", () => {
                const isOpen = item.classList.toggle("is-open");
                button.setAttribute("aria-expanded", String(isOpen));
            });
        });

        const classicTriggers = accordion.querySelectorAll(".wiki-accordion-trigger");

        classicTriggers.forEach((trigger) => {
            trigger.addEventListener("click", () => {
                const panel = trigger.nextElementSibling;
                const isOpen = trigger.getAttribute("aria-expanded") === "true";

                trigger.setAttribute("aria-expanded", String(!isOpen));

                if (panel) {
                    panel.classList.toggle("active", !isOpen);
                }
            });
        });
    });
}

/* =========================
   04. Copy Buttons
========================= */

function setupWikiCopyButtons() {
    const copyButtons = document.querySelectorAll("[data-copy-button]");

    copyButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            const copyBox = button.closest(".wiki-copy-box");

            const textElement = copyBox
                ? copyBox.querySelector("[data-copy-text], [data-copy-value]")
                : null;

            const text = textElement
                ? textElement.dataset.copyText || textElement.dataset.copyValue || textElement.textContent.trim()
                : "";

            if (!text) return;

            try {
                await navigator.clipboard.writeText(text);
                setTemporaryButtonText(button, "Copied!");
            } catch (error) {
                console.error("Copy failed:", error);
                setTemporaryButtonText(button, "Copy failed");
            }
        });
    });
}

function setTemporaryButtonText(button, text) {
    const originalText = button.textContent;

    button.textContent = text;
    button.disabled = true;

    window.setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 1400);
}

/* =========================
   05. Filter Demo Cards
========================= */

function setupWikiFilters() {
    const filterBlocks = document.querySelectorAll("[data-wiki-filter], [data-filter-demo]");

    filterBlocks.forEach((block) => {
        const buttons = block.querySelectorAll("[data-filter]");
        const items = block.querySelectorAll("[data-filter-item], [data-type]");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const filter = button.dataset.filter;

                buttons.forEach((item) => {
                    item.classList.remove("is-active", "active");
                });

                button.classList.add("is-active");
                button.classList.add("active");

                items.forEach((item) => {
                    const itemType = item.dataset.filterItem || item.dataset.type;
                    const shouldShow = filter === "all" || itemType === filter;

                    item.classList.toggle("is-hidden", !shouldShow);
                    item.style.display = shouldShow ? "" : "none";
                });
            });
        });
    });
}

/* =========================
   06. Expandable Images
========================= */

function setupExpandableImages() {
    const images = document.querySelectorAll("[data-expandable-image] img");

    images.forEach((image) => {
        image.addEventListener("click", () => {
            const lightbox = document.createElement("div");
            const preview = document.createElement("img");

            lightbox.className = "wiki-image-lightbox";
            preview.src = image.src;
            preview.alt = image.alt || "Expanded image preview";

            lightbox.appendChild(preview);
            document.body.appendChild(lightbox);

            lightbox.addEventListener("click", () => {
                lightbox.remove();
            });

            document.addEventListener("keydown", function closeOnEscape(event) {
                if (event.key !== "Escape") return;

                lightbox.remove();
                document.removeEventListener("keydown", closeOnEscape);
            });
        });
    });
}

/* =========================
   07. Modal
========================= */

function setupWikiModals() {
    const openButtons = document.querySelectorAll("[data-open-modal], [data-modal-open]");
    const closeButtons = document.querySelectorAll("[data-close-modal], [data-modal-close]");

    openButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modalId = button.dataset.openModal || button.dataset.modalOpen;
            const modal = document.getElementById(modalId);

            if (modal) {
                openWikiModal(modal);
            }
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest(".wiki-modal");

            if (modal) {
                closeWikiModal(modal);
                return;
            }

            closeAllWikiModals();
        });
    });

    document.addEventListener("click", (event) => {
        if (event.target.matches(".wiki-modal-backdrop")) {
            closeWikiModal(event.target.closest(".wiki-modal"));
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllWikiModals();
        }
    });
}

function openWikiModal(modal) {
    if (!modal) return;

    if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
    }

    modal.classList.add("is-open", "active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("wiki-modal-open");

    const closeButton = modal.querySelector("[data-close-modal], [data-modal-close]");
    const focusTarget = closeButton || modal.querySelector("button, a, input, textarea, select");

    if (focusTarget) {
        focusTarget.focus();
    }
}

function closeWikiModal(modal) {
    if (!modal) return;

    modal.classList.remove("is-open", "active");
    modal.setAttribute("aria-hidden", "true");

    if (!document.querySelector(".wiki-modal.is-open, .wiki-modal.active")) {
        document.body.classList.remove("wiki-modal-open");
    }
}

function closeAllWikiModals() {
    const modals = document.querySelectorAll(".wiki-modal.is-open, .wiki-modal.active");

    modals.forEach((modal) => {
        closeWikiModal(modal);
    });
}

/* =========================
   08. Custom Local Nav Scrollbar
========================= */

function setupWikiLocalNavScrollbars() {
    const navs = document.querySelectorAll(".wiki-local-nav");

    navs.forEach((nav) => {
        const scrollArea = nav.closest(".wiki-local-nav-scroll-area");
        const scrollbarParent = scrollArea || nav.parentElement;

        let scrollbar = scrollbarParent.querySelector(".wiki-local-nav-scrollbar");

        if (!scrollbar) {
            scrollbar = document.createElement("div");
            scrollbar.className = "wiki-local-nav-scrollbar";
            scrollbar.innerHTML = `<div class="wiki-local-nav-scrollbar-thumb"></div>`;
            scrollbarParent.appendChild(scrollbar);
        }

        const thumb = scrollbar.querySelector(".wiki-local-nav-scrollbar-thumb");

        let isDragging = false;
        let dragStartX = 0;
        let dragStartScrollLeft = 0;

        function updateScrollbar() {
            const maxScroll = nav.scrollWidth - nav.clientWidth;
            const trackWidth = scrollbarParent.clientWidth;

            if (maxScroll <= 1 || trackWidth <= 0) {
                scrollbar.classList.add("is-hidden");

                if (scrollArea) {
                    scrollArea.classList.add("has-no-scrollbar");
                }

                return;
            }

            scrollbar.classList.remove("is-hidden");

            if (scrollArea) {
                scrollArea.classList.remove("has-no-scrollbar");
            }

            scrollbar.classList.remove("is-hidden");

            const thumbWidth = Math.max((nav.clientWidth / nav.scrollWidth) * trackWidth, 42);
            const maxThumbLeft = trackWidth - thumbWidth;
            const thumbLeft = (nav.scrollLeft / maxScroll) * maxThumbLeft;

            thumb.style.width = `${thumbWidth}px`;
            thumb.style.transform = `translateX(${thumbLeft}px)`;
        }

        nav.addEventListener("scroll", updateScrollbar);
        window.addEventListener("resize", updateScrollbar);

        window.addEventListener("orientationchange", () => {
            setTimeout(updateScrollbar, 150);
        });

        if ("ResizeObserver" in window) {
            const resizeObserver = new ResizeObserver(updateScrollbar);

            resizeObserver.observe(nav);
            resizeObserver.observe(scrollbarParent);
        }

        thumb.addEventListener("mousedown", (event) => {
            isDragging = true;
            dragStartX = event.clientX;
            dragStartScrollLeft = nav.scrollLeft;

            document.body.style.userSelect = "none";
            event.preventDefault();
        });

        document.addEventListener("mousemove", (event) => {
            if (!isDragging) return;

            const maxScroll = nav.scrollWidth - nav.clientWidth;
            const maxThumbMove = scrollbar.clientWidth - thumb.offsetWidth;

            if (maxThumbMove <= 0) return;

            const deltaX = event.clientX - dragStartX;
            const scrollRatio = maxScroll / maxThumbMove;

            nav.scrollLeft = dragStartScrollLeft + deltaX * scrollRatio;
        });

        document.addEventListener("mouseup", () => {
            if (!isDragging) return;

            isDragging = false;
            document.body.style.userSelect = "";
        });

        scrollbar.addEventListener("click", (event) => {
            if (event.target === thumb) return;

            const rect = scrollbar.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const maxScroll = nav.scrollWidth - nav.clientWidth;
            const maxThumbMove = scrollbar.clientWidth - thumb.offsetWidth;

            if (maxThumbMove <= 0) return;

            nav.scrollLeft = ((clickX - thumb.offsetWidth / 2) / maxThumbMove) * maxScroll;
        });

        requestAnimationFrame(updateScrollbar);
    });
}

/* =========================
   09. Active Local Nav Links On Scroll
========================= */

function setupWikiLocalNavActiveLinks() {
    const localNav = document.querySelector(".wiki-local-nav");

    if (!localNav) return;

    const scrollArea = localNav.closest(".wiki-local-nav-scroll-area");
    const links = Array.from(localNav.querySelectorAll('a[href^="#"]'));

    if (!links.length) return;

    const sections = links
        .map((link) => {
            const id = link.getAttribute("href");
            const section = id && id !== "#" ? document.querySelector(id) : null;

            return section ? { link, section } : null;
        })
        .filter(Boolean);

    if (!sections.length) return;

    let lastActiveLink = null;
    let isClickScrolling = false;
    let clickScrollTimeout = null;

    function scrollLocalNavToLink(link) {
        if (!link) return;

        const navRect = localNav.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();

        const linkIsVisible =
            linkRect.left >= navRect.left &&
            linkRect.right <= navRect.right;

        if (linkIsVisible) return;

        const linkCenter = link.offsetLeft + link.offsetWidth / 2;
        const targetScrollLeft = linkCenter - localNav.clientWidth / 2;

        localNav.scrollTo({
            left: Math.max(0, targetScrollLeft),
            behavior: "smooth"
        });
    }

    function setActiveLink(activeLink, shouldScrollNav = true) {
        if (!activeLink || activeLink === lastActiveLink) return;

        links.forEach((link) => {
            link.classList.toggle("is-active", link === activeLink);
        });

        lastActiveLink = activeLink;

        if (shouldScrollNav) {
            scrollLocalNavToLink(activeLink);
        }
    }

    function getCurrentSection() {
        const viewportPoint = window.innerHeight * 0.35;
        const pageBottom = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        /*
           Important:
           If user is near the bottom of the page, force the last valid section.
           This fixes small sections at the end of the page.
        */
        if (pageBottom >= documentHeight - 8) {
            return sections[sections.length - 1];
        }

        let bestMatch = sections[0];
        let bestDistance = Number.POSITIVE_INFINITY;

        sections.forEach((item) => {
            const rect = item.section.getBoundingClientRect();

            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;

            const isVisible =
                sectionBottom > 120 &&
                sectionTop < window.innerHeight * 0.65;

            if (!isVisible) return;

            const distance = Math.abs(sectionTop - viewportPoint);

            if (distance < bestDistance) {
                bestDistance = distance;
                bestMatch = item;
            }
        });

        return bestMatch;
    }

    function updateActiveLink() {
        if (isClickScrolling) return;

        const current = getCurrentSection();

        if (current) {
            setActiveLink(current.link, true);
        }
    }

    links.forEach((link) => {
        link.addEventListener("click", () => {
            clearTimeout(clickScrollTimeout);

            isClickScrolling = true;
            setActiveLink(link, true);

            clickScrollTimeout = window.setTimeout(() => {
                isClickScrolling = false;
                updateActiveLink();
            }, 800);
        });
    });

    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    window.addEventListener("resize", () => {
        updateActiveLink();

        if (lastActiveLink) {
            scrollLocalNavToLink(lastActiveLink);
        }
    });

    if (scrollArea && "ResizeObserver" in window) {
        const resizeObserver = new ResizeObserver(() => {
            updateActiveLink();

            if (lastActiveLink) {
                scrollLocalNavToLink(lastActiveLink);
            }
        });

        resizeObserver.observe(scrollArea);
        resizeObserver.observe(localNav);
    }
}

/* =========================
   10. Feature Showcase - Animation
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

/* =========================
   11. Last Update File
========================= */

function setupWikiLastUpdate() {
    const lastUpdateElement = document.getElementById("lastUpdate");

    if (!lastUpdateElement) return;

    if (lastUpdateElement.getAttribute("datetime")) {
        return;
    }

    const customSource = lastUpdateElement.dataset.lastUpdateSource;
    const currentPath = window.location.pathname;
    const sourcePath = normalizeLastUpdatePath(customSource || currentPath);

    fetch("/LGWiki-Pages/pr-preview/pr-45/assets/data/page-last-updates.json", {
        cache: "no-store"
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Last update map failed to load: ${response.status}`);
            }

            return response.json();
        })
        .then((updates) => {
            const lastUpdatedAt = updates[sourcePath];

            if (!lastUpdatedAt) {
                return loadWikiLastUpdateFromHeaders(lastUpdateElement, sourcePath);
            }

            renderWikiLastUpdate(lastUpdateElement, lastUpdatedAt);
        })
        .catch((error) => {
            console.error("Last update check failed:", error);
            loadWikiLastUpdateFromHeaders(lastUpdateElement, sourcePath);
        });
}

function normalizeLastUpdatePath(path) {
    const url = new URL(path, window.location.origin);
    let normalizedPath = url.pathname;

    if (normalizedPath.endsWith("/")) {
        return `${normalizedPath}index.html`;
    }

    if (!normalizedPath.endsWith(".html")) {
        return `${normalizedPath}/index.html`;
    }

    return normalizedPath;
}

function loadWikiLastUpdateFromHeaders(lastUpdateElement, sourcePath) {
    return fetch(sourcePath, {
        method: "HEAD",
        cache: "no-store"
    })
        .then((response) => {
            const lastModified = response.headers.get("Last-Modified");

            if (!lastModified) {
                lastUpdateElement.textContent = "Date unavailable";
                return;
            }

            renderWikiLastUpdate(lastUpdateElement, lastModified);
        })
        .catch((error) => {
            console.error("Last update fallback failed:", error);
            lastUpdateElement.textContent = "Date unavailable";
        });
}

function renderWikiLastUpdate(lastUpdateElement, dateValue) {
    const modifiedDate = new Date(dateValue);

    if (Number.isNaN(modifiedDate.getTime())) {
        lastUpdateElement.textContent = "Date unavailable";
        return;
    }

    const formattedDate = formatWikiLastUpdateDate(modifiedDate);

    lastUpdateElement.textContent = formattedDate;
    lastUpdateElement.setAttribute("datetime", modifiedDate.toISOString());
}

function formatWikiLastUpdateDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", {
        month: "long"
    });
    const year = date.getFullYear();

    return `${month} ${day}${getWikiOrdinal(day)}, ${year}`;
}

function getWikiOrdinal(day) {
    if (day % 10 === 1 && day % 100 !== 11) return "st";
    if (day % 10 === 2 && day % 100 !== 12) return "nd";
    if (day % 10 === 3 && day % 100 !== 13) return "rd";

    return "th";
}
