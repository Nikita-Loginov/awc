import { SWIPERS } from "./swiper/index.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { animateGlobal } from "./globe/index.js";

const swipers = [
  {
    ...SWIPERS.HISTORY,
  },
  {
    ...SWIPERS.TEAM
  }
];

const handleGlobalClick = (e) => {};

document.addEventListener("DOMContentLoaded", () => {
  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();
  animateGlobal()

  document.addEventListener("click", handleGlobalClick);
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    handleAllSliders();
  }, 100);
});
