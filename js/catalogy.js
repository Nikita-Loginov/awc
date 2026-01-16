import {
  initPriceDropdownText,
  initChecksDropdownText,
} from "./modules/dropdown.js";
import { initDatePickers } from "./modules/calendar.js";

import { toggleLocation } from "./modules/rent.js";

import { MOUSE_WHEEL_CONFIG } from "./swiper/index.js";

import { initSwiper } from "./modules/functions.js";

const handleGlobalEvents = (e) => {
  toggleLocation(e);
};

const setVarModalFooterHeight = () => {
  const modals = document.querySelectorAll(".rentBoxModal");

  modals.forEach((modal) => {
    const footer = modal.querySelector(".rentBoxModal__footer");

    if (footer) {
      const footerHeight = footer.offsetHeight;

      modal.style.setProperty(
        `--rentBoxModal-footer-height`,
        `${footerHeight}px`
      );
    }
  });
};

const initStatusSwipers = () => {
  const statusSwipers = document.querySelectorAll(".swiper--status");

  statusSwipers.forEach((swiper) => {
    const initialSlide = swiper.dataset.initialSlide || "0";

    initSwiper(swiper, {
      slidesPerView: "auto",
      spaceBetween: 16,
      mousewheel: MOUSE_WHEEL_CONFIG,
      initialSlide,
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initPriceDropdownText();
  initChecksDropdownText();
  initStatusSwipers();
  initDatePickers();
  setVarModalFooterHeight();

  document.addEventListener("click", handleGlobalEvents);
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setVarModalFooterHeight();
  }, 200);
});

