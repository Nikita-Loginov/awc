import { validateFormField } from "../validation/index.js";
import { updateSubmit } from "./validate.js";

let activeDropdown = null;
let fixedMenu = null;

export const toggleDropdown = (e) => {
  const target = e.target;

  if (activeDropdown && activeDropdown.contains(target)) {
    if (!target.closest(".dropdown-item-close")) {
      return;
    }
  }

  if (target.closest(".dropdown-item-close")) {
    const itemElement = target.closest(".dropdown__item");

    if (activeDropdown && itemElement) {
      if (
        activeDropdown.hasAttribute("data-select") ||
        activeDropdown.classList.contains("dropdown--select")
      ) {
        applySelectValue(activeDropdown, itemElement);
      }

      closeDropdown(activeDropdown);
    }

    return;
  }

  if (target.closest(".dropdown")) {
    const dropdown = target.closest(".dropdown");

    if (dropdown !== activeDropdown) {
      closeAllDropdowns();
      if (dropdown.hasAttribute("data-fixed-dropdown")) {
        openFixedDropdown(dropdown);
      } else {
        openRegularDropdown(dropdown);
      }
    } else {
      closeDropdown(dropdown);
    }

    return;
  }

  if (activeDropdown) {
    closeAllDropdowns();
  }
};

const openFixedDropdown = (dropdown) => {
  const menu = dropdown.querySelector(".dropdown__content");
  if (!menu) return;

  dropdown.classList.add("active");
  activeDropdown = dropdown;

  const toggle =
    dropdown.querySelector(".dropdown__toggle") ||
    dropdown.querySelector(".dropdown__btn");
  const rect = toggle.getBoundingClientRect();

  fixedMenu = menu;
  fixedMenu.style.position = "fixed";
  fixedMenu.style.top = rect.bottom + "px";
  fixedMenu.style.left = rect.left + "px";
  fixedMenu.style.opacity = "1";
  fixedMenu.style.visibility = "visible";
  fixedMenu.style.zIndex = "9999";

  document.body.appendChild(fixedMenu);
};

const openRegularDropdown = (dropdown) => {
  const menu = dropdown.querySelector(".dropdown__content");
  if (!menu) return;

  dropdown.classList.add("active");
  activeDropdown = dropdown;

  menu.style.opacity = "1";
  menu.style.visibility = "visible";
};

export const closeDropdown = (dropdown) => {
  if (!dropdown) return;

  dropdown.classList.remove("active");

  if (dropdown.hasAttribute("data-fixed-dropdown") && fixedMenu) {
    dropdown.appendChild(fixedMenu);

    fixedMenu.style.position = "";
    fixedMenu.style.top = "";
    fixedMenu.style.left = "";
    fixedMenu.style.width = "";
    fixedMenu.style.opacity = "0";
    fixedMenu.style.visibility = "hidden";
    fixedMenu.style.zIndex = "";

    fixedMenu = null;
  } else {
    const menu = dropdown.querySelector(".dropdown__content");
    if (menu) {
      menu.style.opacity = "0";
      menu.style.visibility = "hidden";
    }
  }

  activeDropdown = null;
};

export const closeAllDropdowns = () => {
  if (activeDropdown) {
    closeDropdown(activeDropdown);
  }
};

const applySelectValue = (dropdown, selectedItem) => {
  const selectedValue =
    selectedItem.getAttribute("data-value") || selectedItem.textContent.trim();
  const selectedText = selectedItem.textContent.trim();

  dropdown.dataset.value = selectedValue;
  dropdown.setAttribute("data-selected", selectedValue);

  if (dropdown.hasAttribute("data-selected-text")) {
    dropdown.setAttribute("data-selected-text", selectedText);
  }

  const allItems = dropdown.querySelectorAll(
    ".dropdown__item, .dropdown-number__link"
  );
  allItems.forEach((item) => item.classList.remove("active"));
  selectedItem.classList.add("active");

  const toggleBtn = dropdown.querySelector(".dropdown__btn");
  if (toggleBtn) {
    const textElement = toggleBtn.querySelector(".dropdown__text");
    if (textElement) {
      textElement.textContent = selectedText;
    } else {
      toggleBtn.setAttribute("data-value", selectedValue);
      toggleBtn.setAttribute("data-text", selectedText);

      const existingText = toggleBtn.querySelector(".dropdown__selected-text");
      if (existingText) {
        existingText.textContent = selectedText;
      } else {
        const span = document.createElement("span");
        span.className = "dropdown__selected-text";
        span.textContent = selectedText;
        toggleBtn.insertBefore(span, toggleBtn.firstChild);
      }
    }
  }

  const activeBox = dropdown.querySelector(".dropdown__active");
  if (activeBox) {
    activeBox.textContent = selectedText;
  }

  const formItem = dropdown.closest(".form__item");
  if (formItem) {
    validateFormField(formItem);

    const form = formItem.closest("form");

    if (form) updateSubmit(form);
  }
};

export const updatePriceDropdownText = (dropdown) => {
  const template = dropdown.dataset.priceTemplate;
  if (!template) return;

  const minInput = dropdown.querySelector('[data-type="price_min"]');
  const maxInput = dropdown.querySelector('[data-type="price_max"]');

  if (!minInput || !maxInput) return;

  const min = minInput.value || "";
  const max = maxInput.value || "";

  dropdown.dataset.value = JSON.stringify({
    min: min || null,
    max: max || null,
  });

  const text = template
    .replace("{min}", min || "0")
    .replace("{max}", max || "0");

  const activeBox = dropdown.querySelector(".dropdown__active");
  if (activeBox) {
    activeBox.textContent = text;
  }
};

export const initPriceDropdownText = () => {
  const priceDropdowns = document.querySelectorAll(".dropdown--price");

  priceDropdowns.forEach((dropdown) => {
    updatePriceDropdownText(dropdown);
  });
};

export const updateChecksDropdownText = (dropdown) => {
  const inputs = dropdown.querySelectorAll(
    'input[type="checkbox"], input[type="radio"]'
  );

  const values = [];
  const texts = [];

  inputs.forEach((input) => {
    if (!input.checked) return;

    values.push(input.value);

    const text =
      input.dataset.label || input.closest("label")?.textContent.trim();

    if (text) {
      texts.push(text);
    }
  });

  dropdown.dataset.value = JSON.stringify(values);

  const activeBox = dropdown.querySelector(".dropdown__active");
  const placeholder = dropdown.dataset.placeholder;

  if (activeBox) {
    activeBox.textContent = texts.length
      ? texts.join(", ")
      : placeholder
      ? placeholder
      : "";
  }
};

export const initChecksDropdownText = () => {
  const dropdowns = document.querySelectorAll(".dropdown--checks");

  dropdowns.forEach((dropdown) => {
    updateChecksDropdownText(dropdown);
  });
};

export const updateDateDropdownValue = (calendarEl, date) => {
  const dropdown = calendarEl.closest(".dropdown");
  if (!dropdown) return;

  const activeBox = dropdown.querySelector(".dropdown__active");
  const placeholder = dropdown.dataset.placeholder || "";

  if (!date) {
    dropdown.dataset.value = "";
    if (activeBox) activeBox.textContent = placeholder;
    return;
  }

  const formatted = calendarEl._datepicker.formatDate(
    date,
    calendarEl._datepicker.opts.dateFormat
  );

  dropdown.dataset.value = date.toISOString();
  if (activeBox) activeBox.textContent = formatted;

  const formItem = dropdown.closest(".form__item");
  if (formItem) {
    validateFormField(formItem);

    const form = formItem.closest("form");
    if (form) updateSubmit(form);
  }
};

export const initSingleSelectDropdown = (dropdown) => {
  if (!dropdown) return;

  let selected = dropdown.querySelector(".dropdown__item[data-active]");

  if (!selected) {
    selected = dropdown.querySelector(".dropdown__item.active");
  }

  if (!selected) {
    const placeholder = dropdown.dataset.placeholder;

    const toggleBtn = dropdown.querySelector(".dropdown__btn");

    const activeBox = toggleBtn.querySelector(".dropdown__active");

    if (activeBox) {
      activeBox.textContent = placeholder || "";
    }

    return;
  }

  const text = selected.textContent.trim();
  const value = selected.getAttribute("data-value") || text;

  dropdown.setAttribute("data-selected", value);

  const toggleBtn = dropdown.querySelector(".dropdown__btn");

  if (toggleBtn) {
    toggleBtn.setAttribute("data-value", value);
    toggleBtn.setAttribute("data-text", text);

    const textElement = toggleBtn.querySelector(".dropdown__text");
    if (textElement) {
      textElement.textContent = text;
    }

    selected.classList.add("active");
  }

  const activeBox = dropdown.querySelector(".dropdown__active");

  if (activeBox) {
    activeBox.textContent = text;
  }
};

export const firstActiveText = () => {
  const dropdownSelects = document.querySelectorAll(
    ".dropdown.dropdown--select, .dropdown[data-select]"
  );

  dropdownSelects.forEach((dropdown) => {
    initSingleSelectDropdown(dropdown)
  });
};

window.addEventListener("resize", () => closeAllDropdowns());
