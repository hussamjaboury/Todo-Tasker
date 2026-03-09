//overlay logic
const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");

document.addEventListener("click", (e) => {
  const navActiveToggler = e.target.closest("[data-nav-active]");
  if (navActiveToggler) addActiveClass([overlay, navbar]);

  const navCloseToggler = e.target.closest("[data-nav-close]");
  if (navCloseToggler) removeActiveClass([overlay, navbar]);

  const modalActiveToggler = e.target.closest("[data-modal-active]");
  if (modalActiveToggler) addActiveClass([overlay, modal]);

  const modalCloseToggler = e.target.closest("[data-modal-close]");
  if (modalCloseToggler) removeActiveClass([overlay, modal]);

  if (e.target === overlay) removeActiveClass([overlay, navbar, modal]);
});

// custom select
const customSelect = document.querySelectorAll("[data-custom-select]");
customSelect.forEach((element) => {
  element.addEventListener(
    "click",
    (event) => {
      const selectList = element.querySelector("[data-select-list]");
      const arrow = element.querySelector("[data-select-arrow]");
      const result = element.querySelector(".custom-select .result");

      if (event.target.tagName === "LI") {
        result.childNodes[0].replaceWith(event.target.textContent);
      }
      selectList.classList.toggle("scale-y-0");
      toggleElements([arrow]);
      event.stopPropagation();
    },
    true,
  );
});

// modal logic

const modal = document.querySelector("[data-modal]");
const addTaskBtns = document.querySelectorAll("[data-modal-toggler]");

// addTaskBtns.forEach((e) =>
//   e.addEventListener("click", (_) => {
//     toggleElements([modal, overlay]);
//   }),
// );

// toggle function
const toggleElements = (e) => {
  e.forEach((e) => {
    e.classList.toggle("active");
  });
};

const removeActiveClass = (e) => {
  e.forEach((e) => {
    e.classList.remove("active");
  });
};

const addActiveClass = (e) => {
  e.forEach((e) => {
    e.classList.add("active");
  });
};
