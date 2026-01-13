const CONFIG = {
  CLASS_SCROLL_TOP: "scrollTop",
  CLASS_SCROLL_BOTTOM: "scrollBottom",
  CLASS_SCROLL_VISIBLE: "scrollVisible",
  SCROLL_START_MORE: 80,
  SCROLL_THRESHOLD: 5,
};

const DOM = {
  HEADER: document.querySelector("header.header") || document.body,
};

let lastScrollTop = 0;

export const getHeightHeader = () => {
  const header = document.querySelector("header.header");

  if (!header) return;

  const styles = window.getComputedStyle(header);
  const height = styles.getPropertyValue("height");

  return height;
};

export const checkScrollY = () => {
  const header = document.querySelector("header.header");

  if (!header.classList.contains("header-scroll")) return;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  const isHeaderVisible = scrollTop <= CONFIG.SCROLL_START_MORE;

  if (Math.abs(scrollTop - lastScrollTop) < CONFIG.SCROLL_THRESHOLD) return;

  const isScrollingDown =
    scrollTop > lastScrollTop && scrollY > CONFIG.SCROLL_START_MORE;

  DOM.HEADER.classList.toggle(CONFIG.CLASS_SCROLL_BOTTOM, isScrollingDown);
  DOM.HEADER.classList.toggle(CONFIG.CLASS_SCROLL_TOP, !isScrollingDown);
  
  DOM.HEADER.classList.toggle(CONFIG.CLASS_SCROLL_VISIBLE, isHeaderVisible);

  document.body.classList.toggle(CONFIG.CLASS_SCROLL_BOTTOM, isScrollingDown);
  document.body.classList.toggle(CONFIG.CLASS_SCROLL_TOP, !isScrollingDown);
  
  document.body.classList.toggle(CONFIG.CLASS_SCROLL_VISIBLE, isHeaderVisible);

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
};