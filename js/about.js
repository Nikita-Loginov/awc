import { SWIPERS } from "./swiper/index.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";

const swipers = [
  {
    ...SWIPERS.HISTORY,
  },
  {
    ...SWIPERS.TEAM,
  },
];

const handleGlobalClick = (e) => {};

document.addEventListener("DOMContentLoaded", () => {
  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();

  if (window.innerWidth >= 768) {
    initAnim();
  }

  document.addEventListener("click", handleGlobalClick);
});

let resizeTimeout;
let orbitAnimationId = null;
let orbitRunning = false;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    handleAllSliders();

    if (window.innerWidth >= 768 && !orbitRunning) {
      initAnim();
    }

    if (window.innerWidth < 768 && orbitRunning) {
      cancelAnimationFrame(orbitAnimationId);
      orbitAnimationId = null;
      orbitRunning = false;

      const items = document.querySelectorAll(".global-solutions__item");
      items.forEach((item) => {
        item.classList.remove("active", "back", "middle");
        item.style.left = "";
        item.style.top = "";
      });
    }
  }, 100);
});

const initAnim = () => {
  const line = document.querySelector(".global-solutions__line");
  const orbit = document.querySelector(".global-solutions__orbit");
  const items = document.querySelectorAll(".global-solutions__item");

  let angleOffsets = [0, 72, 144, 216, 288];
  const speed = 0.1;
  const threshold = 10;

  function animateOrbit() {
    const rect = line.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const cx = width / 2;
    const cy = height / 2;
    const rx = width / 2;
    const ry = height / 2;

    orbit.setAttribute("width", width);
    orbit.setAttribute("height", height);
    orbit.setAttribute("viewBox", `0 0 ${width} ${height}`);
    const ellipse = orbit.querySelector("#orbit-path");
    ellipse.setAttribute("cx", cx);
    ellipse.setAttribute("cy", cy);
    ellipse.setAttribute("rx", rx);
    ellipse.setAttribute("ry", ry);

    let maxY = -Infinity;
    let minY = Infinity;
    let activeItem = null;

    items.forEach((item, i) => {
      angleOffsets[i] += speed;
      if (angleOffsets[i] >= 360) angleOffsets[i] -= 360;

      const theta = (angleOffsets[i] * Math.PI) / 180;
      const x = cx + rx * Math.cos(theta) - item.offsetWidth / 2;
      const y = cy + ry * Math.sin(theta) - item.offsetHeight / 2;

      item.style.left = `${x}px`;
      item.style.top = `${y}px`;

      if (y > maxY) {
        maxY = y;
        activeItem = item;
      }
      if (y < minY) minY = y;
    });

    items.forEach((item) => {
      item.classList.remove("active", "back", "middle");

      const y = parseFloat(item.style.top);

      if (item === activeItem) {
        item.classList.add("active");
      } else if (Math.abs(y - minY) < threshold) {
        item.classList.add("back");
      } else {
        item.classList.add("middle");
      }
    });

    orbitAnimationId = requestAnimationFrame(animateOrbit);
  }

  if (!orbitRunning) {
    orbitRunning = true;
    animateOrbit();
  }
};
