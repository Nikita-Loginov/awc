import { initSingleSelectDropdown } from "./dropdown.js";
import { updateSubmit } from "./validate.js";

export const toggleLocation = (e) => {
  const { target } = e;

  if (!target.closest('[data-block="location-rent__btn"]')) return;

  const relative = target.closest('[data-block="location-rent"]');

  if (relative && relative.classList.contains("location-open")) {
    hiddenLocationReturn(
      relative,
      target.closest('[data-block="location-rent__btn"]')
    );
  } else if (relative) {
    openLocationReturn(
      relative,
      target.closest('[data-block="location-rent__btn"]')
    );
  }
};

const openLocationReturn = (relative, btn) => {
  if (!relative) return;

  relative.classList.add("location-open");

  const htmlLocationReturn = getHtmlLocationReturn();

  const locationRentBox = relative.querySelector(
    '[data-block="location-rent__box"]'
  );

  locationRentBox.insertAdjacentHTML("beforeend", htmlLocationReturn);

  btn.textContent = "Close return";

  const formItem = locationRentBox.querySelector(
    '[data-block="location-rent"]'
  );
  const dropdown = formItem?.querySelector(".dropdown");

  if (dropdown) {
    initSelectDropdown(dropdown);

    initValidateFormRent(formItem);
  }
};

const hiddenLocationReturn = (relative, btn) => {
  if (!relative) return;

  relative.classList.remove("location-open");

  const locationReturn = relative.querySelector('[data-block="location-rent"]');

  if (locationReturn) locationReturn.remove();

  btn.textContent = "Return location";

  const form = relative.closest("form");

  if (form) updateSubmit(form);
};

const getHtmlLocationReturn = () => {
  return ` <div class="form__item" data-block="location-rent">
                <div
                  class="dropdown dropdown--select dropdown--dark-bg-200"
                  data-name="select"
                  data-placeholder="Choose place of return"
                >
                  <button class="dropdown__btn" type="button">
                    <div class="dropdown__block">
                      <p class="p2 manrope-font text-gray-400">
                        Place of return
                      </p>
                    </div>

                    <div class="dropdown__block">
                      <div class="dropdown__active dropdown__text p2"></div>

                      <span class="icon icon--xs arrow">
                        <svg style="rotate: -90deg">
                          <use xlink:href="#arrow-angle-icon"></use>
                        </svg>
                      </span>
                    </div>

                    <div class="form__errors dropdown__errors"></div>
                  </button>

                  <div class="dropdown__content">
                    <div class="dropdown__info">
                      <ul class="dropdown__list">
                        <li
                          class="dropdown__item dropdown-item-close"
                          data-value="Sofia Airport - Terminal 1 (SOF)"
                        >
                          Sofia Airport - Terminal 1 (SOF)
                        </li>

                        <li
                          class="dropdown__item dropdown-item-close"
                          data-value="Sofia Airport - Terminal 2 (SOF)"
                        >
                          Sofia Airport - Terminal 2 (SOF)
                        </li>

                        <li
                          class="dropdown__item dropdown-item-close"
                          data-value="Varna Airport (VAR)"
                        >
                          Varna Airport (VAR)
                        </li>

                        <li
                          class="dropdown__item dropdown-item-close"
                          data-value="Varna Airport (VAR)"
                        >
                          Bourgas Airport (BOJ)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>`;
};

const initSelectDropdown = (dropdown) => {
  if (!dropdown) return;

  if (dropdown) {
    initSingleSelectDropdown(dropdown);
  }
};

const initValidateFormRent = (formItem) => {
  if (!formItem) return;

  const form = formItem.closest("form");
  if (form) updateSubmit(form);
};
