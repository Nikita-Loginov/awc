import { allCountries } from "../data/countries.js";

export function initPhoneMasks(form) {
  const inputs = form.querySelectorAll("input[name='tel']");
  const preferredCountriesCurrent = allCountries.map((p) => p.code.toLocaleLowerCase())

  if (!window.IMask || !window.intlTelInput) {
    console.error("IMask или intlTelInput не загружены");
    return;
  }

  const countriesMap = {};
  allCountries.forEach((country) => {
    countriesMap[country.code.toLowerCase()] = country;
  });

  inputs.forEach((input) => {
    const iti = window.intlTelInput(input, {
      initialCountry: "us",
      onlyCountries: allCountries.map((c) => c.code.toLowerCase()),
      preferredCountries: preferredCountriesCurrent.filter((p) =>
        allCountries.some((c) => c.code.toLowerCase() === p)
      ),
      separateDialCode: true,
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
    });

    let maskInstance = null;
    let currentCountry = null;

    const applyMask = () => {
      const { iso2 } = iti.getSelectedCountryData();
      const country = countriesMap[iso2];

      if (!country) return;

      currentCountry = country;

      if (maskInstance) {
        maskInstance.destroy();
      }

      maskInstance = IMask(input, {
        mask: country.mask,
        lazy: true,
        placeholderChar: "_",
      });

      input.placeholder = country.placeholder;

      input._validator = () => {
        return maskInstance?.masked?.isComplete === true;
      };
    };

    input.addEventListener("countrychange", applyMask);

    applyMask();
  });
}
