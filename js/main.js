//overlay logic
const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");

document.addEventListener("click", (e) => {
  const navToggler = e.target.closest("[data-nav-toggler]");
  console.log(navToggler);
  if (navToggler) toggleElements([overlay, navbar]);
});

const toggleElements = (e) => {
  e.forEach((e) => {
    e.classList.toggle("active");
  });
};
