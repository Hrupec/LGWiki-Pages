/* =========================
   Wiki Sidebar
========================= */

document.addEventListener("DOMContentLoaded", initWikiSidebar);

const WIKI_SIDEBAR_STORAGE_KEY = "wikiSidebarCollapsedSections";
const WIKI_SIDEBAR_SCROLL_KEY = "wikiSidebarScrollPosition";

async function initWikiSidebar() {
    const sidebarMount = document.getElementById("wikiSidebar");

    if (!sidebarMount) return;

    if (sidebarMount.querySelector(".wiki-sidebar-shell")) {
        setupSidebarMobile();
        setupSidebarCollapse();
        setupSidebarActiveLink();
        setupSidebarSearch();

        restoreSidebarScrollPosition();
        setupSidebarScrollPersistence();

        return;
    }

    try {
        const response = await fetch("/LGWiki-Pages/pr-preview/pr-45/wiki/components/sidebar.html", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`Sidebar failed to load: ${response.status}`);
        }

        sidebarMount.innerHTML = await response.text();

        restoreSidebarScrollPosition();
        setupSidebarMobile();
        setupSidebarCollapse();
        setupSidebarActiveLink();
        setupSidebarSearch();
        setupSidebarScrollPersistence();

    } catch (error) {
        console.error(error);

        sidebarMount.innerHTML = `
            <aside class="wiki-sidebar-shell" aria-label="Wiki sidebar">
                <nav class="wiki-sidebar" aria-label="Wiki navigation">
                    <div class="wiki-sidebar-header">
                        <span class="wiki-sidebar-title">Wiki Menu</span>
                    </div>

                    <p class="wiki-sidebar-empty" style="display:block;">
                        Sidebar could not be loaded.
                    </p>
                </nav>
            </aside>
        `;
    }
}


/* =========================
   Mobile Open / Close
========================= */

function setupSidebarMobile() {
    const openButton = document.querySelector(".wiki-sidebar-toggle");
    const closeButtons = document.querySelectorAll("[data-sidebar-close]");
    const sidebarLinks = document.querySelectorAll(".wiki-sidebar a");

    if (openButton) {
        openButton.addEventListener("click", openSidebar);
    }

    closeButtons.forEach((button) => {
        button.addEventListener("click", closeSidebar);
    });

    sidebarLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.matchMedia("(max-width: 980px)").matches) {
                closeSidebar();
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSidebar();
        }
    });
}

function openSidebar() {
    document.body.classList.add("wiki-sidebar-open");
}

function closeSidebar() {
    document.body.classList.remove("wiki-sidebar-open");
}


/* =========================
   Collapse / Expand Categories
========================= */

function setupSidebarCollapse() {
    applySidebarCollapseState();

    const categoryToggles = document.querySelectorAll(".wiki-sidebar-category-toggle");
    const subcategoryToggles = document.querySelectorAll(".wiki-sidebar-subcategory-toggle");

    categoryToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const group = toggle.closest(".wiki-sidebar-group");

            if (!group) return;

            const isCollapsed = group.classList.toggle("is-collapsed");

            toggle.setAttribute("aria-expanded", String(!isCollapsed));
            saveSidebarCollapseState(group, isCollapsed);
        });
    });

    subcategoryToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const subgroup = toggle.closest(".wiki-sidebar-subgroup");

            if (!subgroup) return;

            const isCollapsed = subgroup.classList.toggle("is-collapsed");

            toggle.setAttribute("aria-expanded", String(!isCollapsed));
            saveSidebarCollapseState(subgroup, isCollapsed);
        });
    });
}

/* =========================
   Collapse / Expand Categories - Local Storage
========================= */

function getSidebarCollapseState() {
    try {
        const savedState = localStorage.getItem(WIKI_SIDEBAR_STORAGE_KEY);

        return savedState ? JSON.parse(savedState) : {};
    } catch (error) {
        console.warn("Sidebar collapse state could not be loaded:", error);
        return {};
    }
}

function setSidebarCollapseState(state) {
    try {
        localStorage.setItem(WIKI_SIDEBAR_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.warn("Sidebar collapse state could not be saved:", error);
    }
}

function getSidebarSectionKey(section) {
    const sectionLink = section.querySelector(
        ":scope > .wiki-sidebar-category-row .wiki-sidebar-category-link, " +
        ":scope > .wiki-sidebar-subcategory-row .wiki-sidebar-subcategory-link"
    );

    if (!sectionLink) return null;

    return normalizePath(new URL(sectionLink.href).pathname);
}

function saveSidebarCollapseState(section, isCollapsed) {
    const sectionKey = getSidebarSectionKey(section);

    if (!sectionKey) return;

    const state = getSidebarCollapseState();

    if (isCollapsed) {
        state[sectionKey] = true;
    } else {
        delete state[sectionKey];
    }

    setSidebarCollapseState(state);
}

function applySidebarCollapseState() {
    const state = getSidebarCollapseState();
    const sections = document.querySelectorAll(".wiki-sidebar-group, .wiki-sidebar-subgroup");

    sections.forEach((section) => {
        const sectionKey = getSidebarSectionKey(section);

        if (!sectionKey) return;

        const isCollapsed = state[sectionKey] === true;
        const toggle = section.querySelector(
            ":scope > .wiki-sidebar-category-row .wiki-sidebar-category-toggle, " +
            ":scope > .wiki-sidebar-subcategory-row .wiki-sidebar-subcategory-toggle"
        );

        section.classList.toggle("is-collapsed", isCollapsed);

        if (toggle) {
            toggle.setAttribute("aria-expanded", String(!isCollapsed));
        }
    });
}


/* =========================
   Active Link + Current Page Highlight
========================= */

function setupSidebarActiveLink() {
    const currentPath = normalizePath(window.location.pathname);
    const links = document.querySelectorAll(".wiki-sidebar a[href]");

    links.forEach((link) => {
        const linkPath = normalizePath(new URL(link.href).pathname);

        if (linkPath === currentPath) {
            link.classList.add("is-active");
            expandParentGroup(link);
        }
    });
}

function normalizePath(path) {
    return path
        .replace(/\/index\.html$/i, "")
        .replace(/\.html$/i, "")
        .replace(/\/$/, "")
        || "/LGWiki-Pages/pr-preview/pr-45/wiki";
}

function expandParentGroup(link) {
    const group = link.closest(".wiki-sidebar-group");
    const subgroup = link.closest(".wiki-sidebar-subgroup");

    if (group) {
        const categoryToggle = group.querySelector(".wiki-sidebar-category-toggle");

        group.classList.remove("is-collapsed");

        if (categoryToggle) {
            categoryToggle.setAttribute("aria-expanded", "true");
        }
    }

    if (subgroup) {
        const subcategoryToggle = subgroup.querySelector(".wiki-sidebar-subcategory-toggle");

        subgroup.classList.remove("is-collapsed");

        if (subcategoryToggle) {
            subcategoryToggle.setAttribute("aria-expanded", "true");
        }
    }
}


/* =========================
   Sidebar Scroll Persistence
========================= */

function restoreSidebarScrollPosition() {
    const sidebarList = document.querySelector(".wiki-sidebar-list");

    if (!sidebarList) return;

    const savedPosition = Number(
        localStorage.getItem(WIKI_SIDEBAR_SCROLL_KEY)
    );

    if (!Number.isFinite(savedPosition)) return;

    sidebarList.scrollTop = savedPosition;
}

function setupSidebarScrollPersistence() {
    const sidebarList = document.querySelector(".wiki-sidebar-list");

    if (!sidebarList) return;

    let saveTimer;

    sidebarList.addEventListener("scroll", () => {
        clearTimeout(saveTimer);

        saveTimer = setTimeout(() => {
            localStorage.setItem(
                WIKI_SIDEBAR_SCROLL_KEY,
                String(sidebarList.scrollTop)
            );
        }, 100);
    });
}


/* =========================
   Sidebar Search
========================= */

function setupSidebarSearch() {
    const searchInput = document.getElementById("wikiSidebarSearch");
    const sidebarList = document.querySelector(".wiki-sidebar-list");

    if (!searchInput || !sidebarList) return;

    const emptyMessage = document.createElement("p");
    emptyMessage.className = "wiki-sidebar-empty";
    emptyMessage.textContent = "No pages found.";
    emptyMessage.hidden = true;
    sidebarList.appendChild(emptyMessage);

    searchInput.addEventListener("input", updateSidebarSearch);

    function updateSidebarSearch() {
        const query = searchInput.value.trim().toLowerCase();
        const groups = document.querySelectorAll(".wiki-sidebar-group");

        emptyMessage.hidden = true;

        if (!query) {
            resetSidebarSearch(groups);
            return;
        }

        let visibleGroups = 0;

        groups.forEach((group) => {
            const groupMainLink = group.querySelector(".wiki-sidebar-category-link, .wiki-sidebar-single-link");
            const categoryToggle = group.querySelector(".wiki-sidebar-category-toggle");
            const directLinks = group.querySelectorAll(":scope > .wiki-sidebar-links > a");
            const subgroups = group.querySelectorAll(".wiki-sidebar-subgroup");

            let groupHasVisibleContent = false;

            const groupMainMatches = groupMainLink
                ? groupMainLink.textContent.toLowerCase().includes(query)
                : false;

            if (groupMainLink) {
                groupMainLink.style.display = "";
            }

            directLinks.forEach((link) => {
                const linkMatches = link.textContent.toLowerCase().includes(query);
                const shouldShowLink = linkMatches || groupMainMatches;

                link.style.display = shouldShowLink ? "" : "none";

                if (shouldShowLink) {
                    groupHasVisibleContent = true;
                }
            });

            subgroups.forEach((subgroup) => {
                const subcategoryLink = subgroup.querySelector(".wiki-sidebar-subcategory-link");
                const subcategoryToggle = subgroup.querySelector(".wiki-sidebar-subcategory-toggle");
                const sublinks = subgroup.querySelectorAll(".wiki-sidebar-sublinks a");

                const subcategoryMatches = subcategoryLink
                    ? subcategoryLink.textContent.toLowerCase().includes(query)
                    : false;

                let subgroupHasVisibleContent = false;

                sublinks.forEach((link) => {
                    const sublinkMatches = link.textContent.toLowerCase().includes(query);
                    const shouldShowSublink = sublinkMatches || subcategoryMatches || groupMainMatches;

                    link.style.display = shouldShowSublink ? "" : "none";

                    if (shouldShowSublink) {
                        subgroupHasVisibleContent = true;
                    }
                });

                if (subcategoryLink) {
                    subcategoryLink.style.display = "";
                }

                if (subcategoryToggle) {
                    subcategoryToggle.style.display = "";
                }

                const shouldShowSubgroup = subgroupHasVisibleContent || subcategoryMatches || groupMainMatches;

                subgroup.style.display = shouldShowSubgroup ? "" : "none";

                if (shouldShowSubgroup) {
                    groupHasVisibleContent = true;
                    subgroup.classList.remove("is-collapsed");

                    if (subcategoryToggle) {
                        subcategoryToggle.setAttribute("aria-expanded", "true");
                    }
                }
            });

            if (groupMainMatches) {
                groupHasVisibleContent = true;
            }

            group.style.display = groupHasVisibleContent ? "" : "none";

            if (groupHasVisibleContent) {
                visibleGroups++;

                group.classList.remove("is-collapsed");

                if (categoryToggle) {
                    categoryToggle.setAttribute("aria-expanded", "true");
                }
            }
        });

        emptyMessage.hidden = visibleGroups !== 0;
    }
}

function resetSidebarSearch(groups) {
    groups.forEach((group) => {
        const groupMainLink = group.querySelector(".wiki-sidebar-category-link, .wiki-sidebar-single-link");
        const directLinks = group.querySelectorAll(":scope > .wiki-sidebar-links > a");
        const subgroups = group.querySelectorAll(".wiki-sidebar-subgroup");

        group.style.display = "";

        if (groupMainLink) {
            groupMainLink.style.display = "";
        }

        directLinks.forEach((link) => {
            link.style.display = "";
        });

        subgroups.forEach((subgroup) => {
            const subcategoryLink = subgroup.querySelector(".wiki-sidebar-subcategory-link");
            const subcategoryToggle = subgroup.querySelector(".wiki-sidebar-subcategory-toggle");
            const sublinks = subgroup.querySelectorAll(".wiki-sidebar-sublinks a");

            subgroup.style.display = "";

            if (subcategoryLink) {
                subcategoryLink.style.display = "";
            }

            if (subcategoryToggle) {
                subcategoryToggle.style.display = "";
            }

            sublinks.forEach((link) => {
                link.style.display = "";
            });
        });
    });

    applySidebarCollapseState();
    setupSidebarActiveLink();
}
