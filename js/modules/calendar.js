import { updateDateDropdownValue, closeDropdown } from "./dropdown.js";

export const initDatePickers = () => {
  const calendars = document.querySelectorAll("[data-calendar]");

  calendars.forEach((calendarEl) => {
    const inline = calendarEl.dataset.inline === "true";
    const onlyTime = calendarEl.dataset.time === "true";
    const showTime = calendarEl.dataset.showTime === "true";
    const hasMinDate = calendarEl.dataset.minDate === "true";
    const format =
      calendarEl.dataset.format || (onlyTime ? "HH:mm" : "dd.MM.yyyy");

    const now = new Date();

    const dp = new AirDatepicker(calendarEl, {
      inline,
      timepicker: onlyTime || showTime || false,
      dateFormat: format,
      autoClose: false,
      minDate: onlyTime && hasMinDate ? false : now,

      onSelect({ date }) {
        updateDateDropdownValue(calendarEl, date);
        if (!onlyTime) {
          const dropdown = calendarEl.closest(".dropdown");
          if (dropdown) closeDropdown(dropdown);
        }
      },
    });

    calendarEl._datepicker = dp;

    updateDateDropdownValue(calendarEl, null);
  });
};
