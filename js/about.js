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

  initAnim();

  document.addEventListener("click", handleGlobalClick);
});

let resizeTimeout;
let orbitAnimationId = null;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    handleAllSliders();
  }, 100);
});

const initAnim = () => {
  const line = document.querySelector(".global-solutions__line");
  const orbit = document.querySelector(".global-solutions__orbit");
  const items = document.querySelectorAll(".global-solutions__item");

  let angleOffsets = [0, 72, 144, 216, 288];
  const speed = 0.1;
  const threshold = 10;

  let isPaused = false;
  let resumeTimer = null;
  let lastPauseTime = 0;

  const minPauseInterval = 4000;

  function animateOrbit() {
    const isMobile = window.innerWidth <= 767;

    if (isPaused && !isMobile) {
      isPaused = false;
      line.classList.remove("pause");
      if (resumeTimer) {
        clearTimeout(resumeTimer);
        resumeTimer = null;
      }
    }

    if (isPaused) {
      orbitAnimationId = requestAnimationFrame(animateOrbit);
      return;
    }

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
      if (!isPaused) {
        angleOffsets[i] += speed;
        if (angleOffsets[i] >= 360) angleOffsets[i] -= 360;
      }

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

    if (isMobile && !isPaused) {
      const now = Date.now();

      let lowestItemIndex = -1;
      let lowestY = -Infinity;

      items.forEach((item, i) => {
        const y = parseFloat(item.style.top);
        if (y > lowestY) {
          lowestY = y;
          lowestItemIndex = i;
        }
      });

      if (lowestItemIndex >= 0 && now - lastPauseTime > minPauseInterval) {
        const normalizedAngle = angleOffsets[lowestItemIndex] % 360;
        const angleDiff = Math.min(
          Math.abs(normalizedAngle - 90),
          Math.abs(normalizedAngle - 450)
        );

        if (angleDiff < 3) {
          isPaused = true;
          lastPauseTime = now;

          line.classList.add("pause");

          resumeTimer = setTimeout(() => {
            isPaused = false;

            line.classList.remove("pause");
          }, 2000);
        }
      }
    }

    orbitAnimationId = requestAnimationFrame(animateOrbit);
  }

  // orbitRunning = true;
  animateOrbit();
};
