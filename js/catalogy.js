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

  document.addEventListener("click", handleGlobalEvents);
});
