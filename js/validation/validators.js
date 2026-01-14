export const validators = {
  required(value) {
    return value.trim().length > 0;
  },

  minLength(value, length) {
    return value.trim().length >= length;
  },

  pattern(value, regex) {
    return regex.test(value);
  },

  phone(field) {
    return field._validator ? field._validator() : false;
  },

  select(field) {
   
    return !!field.value && field.value.trim() !== "";
  },

  checkbox(field) {
    return field.checked === true;
  },

  dropdown(field) {
    const value = field.dataset.value || field.dataset.selected;

    if (!value) return false;

    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed.length > 0;
      }

      if (typeof parsed === "object") {
        return Object.values(parsed).some(Boolean);
      }

      return Boolean(parsed);
    } catch {
      return value.trim() !== "";
    }
  },
};
