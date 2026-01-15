import { classAction } from "./classActions.js";

let prevActiveAccordeonItem;
let currentResizeHandler = null;

export function toggleAccordeonItems(e) {
  const { target } = e;

  if (target.closest(".accordeon__question")) {
    const relative = target.closest(".accordeon");
    const relativeItem = target.closest(".accordeon__item");
    const maxWidth = parseInt(relative.dataset.width) || 1023;

    if (currentResizeHandler) {
      window.removeEventListener("resize", currentResizeHandler);
    }

    if (maxWidth > window.innerWidth) {
      classAction(relativeItem, "active", "toggle");

      setHeightAnswer(relativeItem);

      currentResizeHandler = () => setHeightAnswer(relativeItem);
      window.addEventListener("resize", currentResizeHandler);

      if (prevActiveAccordeonItem && prevActiveAccordeonItem !== relativeItem) {
        if (!relative.classList.contains("accordeon--showMore")) {
          classAction(prevActiveAccordeonItem, "active", "remove");
        }
        setHeightAnswer(prevActiveAccordeonItem);
      }

      prevActiveAccordeonItem = relativeItem;
    }
  }

  if (target.closest(".accordeon__show-much")) {
    const relative = target.closest(".accordeon");
    const relativeItems = relative.querySelectorAll(".accordeon__item");

    relativeItems.forEach((item) => {
      if (!item.classList.contains("active")) {
        classAction(item, "active", "add");
        setHeightAnswer(item);

        const resizeHandler = () => setHeightAnswer(item);
        window.addEventListener("resize", resizeHandler);

        if (currentResizeHandler) {
          window.removeEventListener("resize", currentResizeHandler);
        }
        currentResizeHandler = resizeHandler;
      }
    });

    prevActiveAccordeonItem = relativeItems[relativeItems.length - 1];
  }
}

export function initAccordeonActiveItems() {
  const accordeonItems = document.querySelectorAll(".accordeon__item");

  accordeonItems.forEach((item) => {
    const relative = item.closest(".accordeon");
    const maxWidth = parseInt(relative.dataset.width) || 1023;

    if (
      item.classList.contains("active-first") &&
      maxWidth > window.innerWidth
    ) {
      classAction(item, "active", "add");
      setHeightAnswer(item);
      prevActiveAccordeonItem = item;
    }
  });
}

function resetAccordeon() {
  const accordeonItems = document.querySelectorAll(".accordeon__item");
  prevActiveAccordeonItem = null;

  accordeonItems.forEach((item) => {
    classAction(item, "active", "remove");

    const itemAnswer = item.querySelector(".accordeon__answer");

    itemAnswer.style.maxHeight = "";
  });
}

const resizeObserver = new ResizeObserver((entries) => {
  if (window.innerWidth > 1023) {
    resetAccordeon();

    if (currentResizeHandler) {
      window.removeEventListener("resize", currentResizeHandler);
      currentResizeHandler = null;
    }
  }
});

resizeObserver.observe(document.body);

function setHeightAnswer(item) {
  const itemAnswer = item.querySelector(".accordeon__answer");
  const paddingTop = Number(itemAnswer?.dataset?.paddingTop) || 12;

  if (item.classList.contains("active")) {
    itemAnswer.style.maxHeight = itemAnswer.scrollHeight + paddingTop + "px";
  } else {
    itemAnswer.style.maxHeight = "0";
  }
}

export const renderItems = (items, types, allMinWidthInner) => {
  const boxs = document.querySelectorAll(".accordeon--render");

  boxs.forEach((box) => {
    box.innerHTML = "";
    let html;

    if (allMinWidthInner && allMinWidthInner < window.innerWidth) {
      html = renderAccordeonItem(items);
    } else {
      const typeFirst = types[0].name;

      const relative = box.closest("section");

      const tabsBox = relative.querySelector(".tabs-box");
      const swiper = tabsBox.closest(".swiper");

      const tabs = renderTabs(types);

      const tabsSwiper = new Swiper(swiper, {
        slidesPerView: "auto",
        spaceBetween: 12,
      });

      tabsBox.innerHTML = "";

      tabsBox.innerHTML = tabs;

      const itemsFilter = items.filter((item) => item.type === typeFirst);

      html = renderAccordeonItem(itemsFilter);
    }

    box.innerHTML = html;
  });
};

const renderAccordeonItem = (items) => {
  if (!items) return;

  const html = [];

  items.forEach((box) => {
    const item = ` <div class="accordeon__item" id=${box?.id}>
          <button type="button" class="accordeon__question">
            <p class="semiBold-font lh120P">
              ${box?.question}
            </p>

            <span class="circle-btn circle-btn--blue">
              <span class="icon-plus"></span>
            </span>
          </button>

          <div class="accordeon__answer" data-padding-top="12">
             ${box?.content}
          </div>
        </div>`;

    html.push(item);
  });

  return html.join("");
};

const renderTabs = (types) => {
  if (!types) return;

  const html = [];

  types.forEach((type, index) => {
    const item = `<div class="swiper-slide"><div role="button" data-type=${
      type.name
    } class="button ${index ? "button--gray" : ""}">${type.text}</div></div>`;

    html.push(item);
  });

  return html.join("");
};

export const changeActiveTabs = (e, items) => {
  const { target } = e;

  if (!target.closest(".tabs-box")) return;

  const btn = target.closest(".button");
  const tabsBox = target.closest(".tabs-box");
  const btns = tabsBox.querySelectorAll(".button");

  if (!btns.length || !btn) return;

  const type = btn.dataset.type;

  if (!type) return;

  const relative = target.closest("section");

  const itemsBox = relative.querySelector(".accordeon--render");

  if (!itemsBox) return;

  const itemsFilter = items.filter((item) => item.type === type);

  if (!itemsFilter.length) return;

  itemsBox.innerHTML = "";

  const accordeonItems = renderAccordeonItem(itemsFilter);

  btns.forEach((btn) => {
    btn.classList.add("button--gray");
  });

  btn.classList.remove("button--gray");

  itemsBox.innerHTML = accordeonItems;
};
