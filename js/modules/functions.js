import { handleNumberInput } from "../utils/handleNumberInput.js";

export const getPositionsElementsScroll = (options) => {
  const { elementScroll, elementStatic, className = "scroll" } = options;

  if (!elementScroll || !elementStatic) return;

  let ticking = false;
  let isBelow = false;

  const checkPosition = () => {
    const scrollRect = elementScroll.getBoundingClientRect();
    const staticRect = elementStatic.getBoundingClientRect();

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    const absoluteScrollTop = scrollRect.top + scrollY + 50;

    const absoluteStaticBottom = staticRect.top + scrollY;

    const newIsBelow = absoluteScrollTop > absoluteStaticBottom;

    if (newIsBelow !== isBelow) {
      isBelow = newIsBelow;

      if (isBelow) {
        elementScroll.classList.add(className);
      } else {
        elementScroll.classList.remove(className);
      }
    }
  };

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkPosition();
        ticking = false;
      });

      ticking = true;
    }
  };

  checkPosition();

  document.addEventListener("scroll", handleScroll, { passive: true });

  window.addEventListener("resize", handleScroll, { passive: true });

  return () => {
    document.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
  };
};

export function isTouchDevice() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

export const initSwiper = (element, config = {}) => {
  if (!element) return;

  const swiperConfig = {
    ...config,
  };

  const swiper = new Swiper(element, swiperConfig);

  return swiper;
};

export const removeAllElementClass = (options, className) => {
  options.forEach((item) => {
    item.classList.remove(className);
  });
};

export const onChangeInput = (e) => {
  const input = e.target;

  if (input.tagName !== "INPUT") return;

  const hasValue = input.value.trim() !== "";
  const inputBox = input.closest(".input-box");

  if (hasValue) {
    input.classList.add("has-value");

    if (inputBox) inputBox.classList.add("has-value");
  } else {
    input.classList.remove("has-value");

    if (inputBox) inputBox.classList.remove("has-value");
  }

  if (input.type === "number" || input.closest("[data-input-number]")) {
    handleNumberInput(input);
  }
};

export const getArrowSwiper = (box) => {
  if (!box) return;

  const arrowPrev = box.querySelector(".arrow-swiper.prev");
  const arrowNext = box.querySelector(".arrow-swiper.next");

  return {
    arrowPrev,
    arrowNext,
  };
};

export const getPaginationSwiper = (box) => {
  if (!box) return;

  const pagination = box.querySelector(".swiper-pagination");

  return {
    pagination,
  };
};

export const getRetinaDPR = () => {
  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

  return isMac ? 2 : window.devicePixelRatio || 1;
};

export const setVarElement = (el, nameVar, value) => {
  if (!el || !nameVar) return;

  el.style.setProperty(nameVar, value);
};
