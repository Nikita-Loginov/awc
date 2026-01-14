import { validateFormField } from "../validation/index.js";
import { initPhoneMasks } from "./masks.js";
import { openModalStep } from "./modal.js";
import { classAction } from "../modules/classActions.js";

export const initFormValidation = (form) => {
  if (!form) return;

  initPhoneMasks(form);

  form.addEventListener("input", onChange);
  form.addEventListener("change", onChange);
  form.addEventListener("submit", onSubmit);
};

const onChange = (e) => {
  const formItem = e.target.closest(".form__item");
  if (!formItem) return;

  validateFormField(formItem);
  updateSubmit(e.target.closest("form"));
};

export const updateSubmit = (form) => {
  const btn = form.querySelector('[type="submit"]');
  if (!btn) return;

  const valid = [...form.querySelectorAll(".form__item")].every(
    validateFormField
  );
  classAction(btn, "disabled", valid ? "remove" : "add");
};

export const isFormValid = (form) =>
  [...form.querySelectorAll(".form__item")].every(validateFormField);

const onSubmit = (e) => {
  e.preventDefault();
  const form = e.target;

  if (!isFormValid(form)) return;

  const submitBtn = form.querySelector('button[type="submit"].modal-open');

  if (submitBtn) {
    const modalName = submitBtn.dataset.modal;
    const modalBlock = document.querySelector(`.${modalName}`);

    openModalStep(
      submitBtn,
      document.querySelectorAll(".modalBlock"),
      modalBlock
    );
  }

  updateSubmit(form);
  form.reset();

  form.querySelectorAll(".form__item").forEach((item) => {
    const field = item.querySelector(
      "input, textarea, select, .selected-option, .dropdown"
    );
    const errorBox = item.querySelector(".form__errors");
    if (errorBox) errorBox.textContent = "";

    field?.setAttribute("aria-invalid", "false");
    item.classList.remove("error", "success");
  });
};
