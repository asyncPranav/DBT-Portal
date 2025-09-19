const handleLanguageChange = (lang) => {
  // Example: Redirect or store in localStorage
  console.log("Selected Language:", lang);
  // window.location.href = `/${lang}/index.html`;
};

document
  .getElementById("languageSelectDesktop")
  ?.addEventListener("change", (e) => {
    handleLanguageChange(e.target.value);
  });

document
  .getElementById("languageSelectMobile")
  ?.addEventListener("change", (e) => {
    handleLanguageChange(e.target.value);
  });

// Mobile Menu Toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
});

closeMenu?.addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-full");
});
