import { validationRules } from "./rules.js";
import { validators } from "./validators.js";
import { classAction } from "../modules/classActions.js";

export const validateFormField = (formItem) => {
  const field = formItem.querySelector(
    "input, textarea, select, .selected-option, .dropdown"
  );

  const isDropdown = field.classList.contains("dropdown");

  const errorBox = formItem.querySelector(".form__errors");

  if (!field) return true;

  const rules = isDropdown ? validationRules[field.dataset.name] : validationRules[field.name];

  if (!rules) return true; 

  const value = isDropdown
    ? field.dataset.value || field.dataset.selected ||""
    : field.value?.trim() || "";
 
   
  const isRequired = isDropdown ? rules.required : field.required === true;


  let valid = true;
  let message = "";

  if (!isRequired && value === "") {
    setValidState(formItem, field, errorBox, true);
    return true;
  }

  if (isRequired) {
    valid =
      rules.type === "checkbox"
        ? validators.checkbox(field)
        : validators.required(value);

    if (!valid) {
      message = rules.message?.required || "";
      return setInvalidState(formItem, field, errorBox, message);
    }
  }

  if (rules.type) {
    const typeValidators = {
      phone: () => validators.phone(field),
      select: () => validators.select(field),
      checkbox: () => validators.checkbox(field),
      dropdown: () => validators.dropdown(field),
    };

    const validator = typeValidators[rules.type];
    if (validator && !validator()) {
      message = rules.message?.invalid || rules.message?.required || "";
      return setInvalidState(formItem, field, errorBox, message);
    }
  }

  if (rules.minLength && !validators.minLength(value, rules.minLength)) {
    message = rules.message?.minLength || "";
    return setInvalidState(formItem, field, errorBox, message);
  }

  if (rules.pattern && !validators.pattern(value, rules.pattern)) {
    message = rules.message?.pattern || "";
    return setInvalidState(formItem, field, errorBox, message);
  }

  setValidState(formItem, field, errorBox, true);
  return true;
};

const setValidState = (formItem, field, errorBox) => {
  errorBox.textContent = "";
  classAction(formItem, "error", "remove");
  classAction(formItem, "success", "add");
  field.setAttribute("aria-invalid", "false");
};

const setInvalidState = (formItem, field, errorBox, message) => {
  errorBox.textContent = message;
  classAction(formItem, "error", "add");
  classAction(formItem, "success", "remove");
  field.setAttribute("aria-invalid", "true");
  return false;
};
