import {
  initPriceDropdownText,
  initChecksDropdownText,
} from "./modules/dropdown.js";
import { initDatePickers } from "./modules/calendar.js";

import { MOUSE_WHEEL_CONFIG } from "./swiper/index.js";

import { initSwiper } from "./modules/functions.js";

const initStatusSwipers = () => {
  const statusSwipers = document.querySelectorAll(".swiper--status");

  statusSwipers.forEach((swiper) => {
    const initialSlide = swiper.dataset.initialSlide || "0";

    initSwiper(swiper, {
      slidesPerView: "auto",
      spaceBetween: 16,
      mousewheel: MOUSE_WHEEL_CONFIG,
      initialSlide
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initPriceDropdownText();
  initChecksDropdownText();
  initStatusSwipers();
  initDatePickers()
});
