//overlay logic
const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");

document.addEventListener("click", (e) => {
  const navToggler = e.target.closest("[data-nav-toggler]");
  if (navToggler) toggleElements([overlay, navbar]);
});

const toggleElements = (e) => {
  e.forEach((e) => {
    e.classList.toggle("active");
  });
};

// custom select
const customSelect = document.querySelector("[data-custom-select]");
const selectList = customSelect.querySelector("[data-select-list]");
const arrow = document.querySelector("[data-select-arrow]");
const result = document.querySelector(".custom-select .result");

customSelect.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      console.log(e.srcElement.childNodes);
      result.childNodes[0].replaceWith(e.target.textContent);
    }
    console.log(e.target);
    selectList.classList.toggle("scale-y-0");
    toggleElements([arrow]);
    e.stopPropagation();
  },
  true,
);
