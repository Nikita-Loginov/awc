let activeDropdown = null;
let fixedMenu = null;

export const toggleDropdown = (e) => {
  const target = e.target;

  if (target.closest(".dropdown__toggle")) {
    const dropdown = target.closest(".dropdown");

    if (dropdown !== activeDropdown) {
      closeAllDropdowns();
      openFixedDropdown(dropdown);
    } else {
      closeDropdown(dropdown);
    }

    return;
  }

  if (target.closest(".dropdown-item-close")) {
    const itemElement = target.closest(".dropdown__item");

    if (activeDropdown && itemElement) {
      applySelectValue(activeDropdown, itemElement);
      closeDropdown(activeDropdown);
    }

    return;
  }

  if (!target.closest(".dropdown") && activeDropdown) {
    closeAllDropdowns();
  }
};

const openFixedDropdown = (dropdown) => {
  const menu = dropdown.querySelector(".dropdown__content");
  if (!menu) return;

  dropdown.classList.add("active");
  activeDropdown = dropdown;

  const toggle = dropdown.querySelector(".dropdown__toggle");
  const rect = toggle.getBoundingClientRect();

  fixedMenu = menu;
  fixedMenu.style.position = "fixed";
  fixedMenu.style.top = rect.bottom + "px";
  fixedMenu.style.left = rect.left + "px";
  fixedMenu.style.width = rect.width + "px";
  fixedMenu.style.opacity = "1";
  fixedMenu.style.visibility = "visible";
  fixedMenu.style.zIndex = "9999";

  document.body.appendChild(fixedMenu);
};

const closeDropdown = (dropdown) => {
  if (!dropdown) return;

  dropdown.classList.remove("active");

  if (fixedMenu) {
    dropdown.appendChild(fixedMenu);

    fixedMenu.style.position = "";
    fixedMenu.style.top = "";
    fixedMenu.style.left = "";
    fixedMenu.style.width = "";
    fixedMenu.style.opacity = "0";
    fixedMenu.style.visibility = "hidden";
    fixedMenu.style.zIndex = "";
  }

  fixedMenu = null;
  activeDropdown = null;
};

function closeAllDropdowns() {
  if (activeDropdown) {
    closeDropdown(activeDropdown);
  }
}

const applySelectValue = (dropdown, selectedItem) => {
  const selectedText = selectedItem.textContent.trim();

  const realItems = dropdown.querySelectorAll(".dropdown__item");

  realItems.forEach((item) => item.classList.remove("active"));

  const realItem = Array.from(realItems).find(
    (el) => el.textContent.trim() === selectedText
  );

  if (realItem) realItem.classList.add("active");

  const activeBox = dropdown.querySelector(".dropdown__active");
  if (activeBox) {
    activeBox.textContent = selectedText;
  }
};

export const firstActiveText = () => {
  const dropdownSelects = document.querySelectorAll(
    ".dropdown.dropdown--select"
  );

  dropdownSelects.forEach((dropdown) => {
    const selected =
      dropdown.querySelector(".dropdown__item.active") ||
      dropdown.querySelector(".dropdown__item");

    if (!selected) return;

    const text = selected.textContent.trim();
    const activeBox = dropdown.querySelector(".dropdown__active");

    if (activeBox) activeBox.textContent = text;
  });
};

window.addEventListener("resize", () => closeAllDropdowns());
window.addEventListener(
  "scroll",
  (e) => {
    if (!activeDropdown) return;

    let target = e.target;

    if (
      target === document ||
      target === document.documentElement ||
      target === document.body
    ) {
      closeAllDropdowns();
    }
  },
  true
);
