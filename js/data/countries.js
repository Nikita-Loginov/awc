export const allCountries = [
  {
    code: "RU",
    name: "Россия",
    dialCode: "+7",
    mask: "+{7} (000) 000-00-00",
    flag: "🇷🇺",
    placeholder: "+7 (912) 345-67-89",
    placeholderValidate: "^\\+7\\s\\(\\d{3}\\)\\s\\d{3}-\\d{2}-\\d{2}$",
  },
  {
    code: "US",
    name: "США",
    dialCode: "+1",
    mask: "+{1} (000) 000-0000",
    flag: "🇺🇸",
    placeholder: "+1 (234) 567-8900",
    placeholderValidate: "^\\+1\\s\\(\\d{3}\\)\\s\\d{3}-\\d{4}$",
  },
  {
    code: "AE",
    name: "ОАЭ",
    dialCode: "+971",
    mask: "+{971} (0) 000 0000",
    flag: "🇦🇪",
    placeholder: "+971 (0) 123 4567",
    placeholderValidate: "^\\+971\\s\\(0\\)\\s\\d{3}\\s\\d{4}$",
  },
];
export const preferredCountries = ["ru", "us", "ae"];
