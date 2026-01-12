export const initSimpleSticky = () => {
  const triggers = document.querySelectorAll("[data-sticky]");

  if (!triggers.length) return;

  const stickyElements = [];

  triggers.forEach((trigger) => {
    const targetSelector = trigger.dataset.sticky;
    const target = document.querySelector(targetSelector);
    const stickyClass = trigger.dataset.stickyClass || "is-sticky";

    if (!target) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const triggerTop = triggerRect.top + window.pageYOffset;

    stickyElements.push({
      trigger,
      target,
      triggerTop,
      stickyClass,
      isActive: false,
    });
  });

  const checkSticky = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    stickyElements.forEach((item) => {
      const shouldBeSticky = scrollTop > item.triggerTop;

      if (shouldBeSticky !== item.isActive) {
        item.isActive = shouldBeSticky;

        if (shouldBeSticky) {
          item.target.classList.add(item.stickyClass);
        } else {
          item.target.classList.remove(item.stickyClass);
        }
      }
    });
  };

  let isScrolling = false;
  const handleScroll = () => {
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(() => {
        checkSticky();
        isScrolling = false;
      });
    }
  };

  const init = () => {
    const recalculatePositions = () => {
      stickyElements.forEach((item) => {
        const triggerRect = item.trigger.getBoundingClientRect();
        item.triggerTop = triggerRect.top + window.pageYOffset + 10;
      });

      checkSticky();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", recalculatePositions);

    checkSticky();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", recalculatePositions);
    };
  };

  return init();
};
