const toggleMenu = (e) => {
  const { target } = e;

  if (!target.closest(".menu__burger")) return;

  const menu = target.closest(".menu");

  menu.classList.toggle("open");
  document.body.classList.toggle("open-menu");
  document.body.classList.toggle("open-decor");
};

const closeMenuOnItemClick = (e) => {
  const { target } = e;

  const menu = target.closest(".menu");

  if (
    target.closest(".menu-item") ||
    target.closest(".menu-link") ||
    target.closest(".menu__close") ||
    target.closest("[data-close-menu]")
  ) {
    closeMenu(menu);
  }
};

const closeMenu = (menu) => {
  if (!menu) return;

  menu.classList.remove("open");
  document.body.classList.remove("open-menu");
  document.body.classList.remove("open-decor");
};

const closeMenuOnOutsideClick = (e) => {
  const { target } = e;

  const openMenus = document.querySelectorAll(".menu.open");

  openMenus.forEach((menu) => {
    if (!menu.contains(target) && !target.closest(".menu__burger") && !target.closest('.header')) {
      closeMenu(menu);
    }
  });
};

export const initMenu = (e) => {
  toggleMenu(e);
  closeMenuOnItemClick(e);
  closeMenuOnOutsideClick(e);
};
