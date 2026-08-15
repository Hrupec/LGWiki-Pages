// Load navbar/footer fragments only on legacy pages that expose mount points.
const navbarMount = document.getElementById("navbar");
if (navbarMount) {
  fetch("/LGWiki-Pages/pr-preview/pr-45/components/navbar.html", { cache: "no-store" })
    .then((res) => res.text())
    .then((data) => {
      navbarMount.innerHTML = data;
      highlightActiveLink();
    });
} else {
  document.addEventListener("DOMContentLoaded", highlightActiveLink);
}

const footerMount = document.getElementById("footer");
if (footerMount) {
  fetch("/LGWiki-Pages/pr-preview/pr-45/components/footer.html", { cache: "no-store" })
    .then((res) => res.text())
    .then((data) => {
      footerMount.innerHTML = data;
    });
}


// FUNKCJA PODŚWIETLANIA NAVBAR NA BIEŻĄCEJ STRONIE

function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-right a");
  const currentPath = window.location.pathname;

  links.forEach(link => {
    if (currentPath.startsWith(link.pathname)) {
      link.classList.add("active");
    }
  });
}


// MOBILE NAV-TOGGLE - HAMBURGER

function toggleNavMenu() {
  document.querySelector(".nav-right").classList.toggle("active");
  document.querySelector(".nav-toggle").classList.toggle("active");
}


// SCROLL NAVBAR EFFECT

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});