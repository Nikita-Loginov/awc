import { getHeightHeader, checkScrollY } from "./modules/header.js";
import { setVar } from "./utils/setVar.js";
import { toggleDropdown, firstActiveText } from "./modules/dropdown.js";
import { initModal, checkStartOpen } from "./modules/modal.js";
import { initMenu } from "./modules/menu.js";
import { initFormValidation } from "./modules/validate.js";
import { onChangeInput } from "./modules/functions.js";
import { checkStorage, initStorage } from "./modules/localStorage.js";

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

const handleGlobalEvents = (e) => {
  initModal(e);
  initMenu(e);
  initStorage(e);
  toggleDropdown(e);
};

const serVars = () => {
  const heightHeader = getHeightHeader();

  setVar("--header-height", heightHeader);
};

const initValidate = () => {
  const forms = document.querySelectorAll("form.form");

  forms.forEach((form) => {
    initFormValidation(form);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  checkStorage();
  initValidate();
  checkStartOpen();
  serVars();
  firstActiveText();


  document.addEventListener("click", handleGlobalEvents);
  document.addEventListener("input", onChangeInput);

});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    serVars();
  }, 200);
});

document.addEventListener("scroll", checkScrollY);
