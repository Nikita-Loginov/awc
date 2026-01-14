export const validationRules = {
  name: {
    required: false,
    minLength: 2,
    pattern: /^[A-Za-z\s]+$/,

    message: {
      required: "Enter your name",
      minLength: "Name must be at least 2 characters long",
      pattern: "Only English letters are allowed",
    },

    hint: "For example: Ivan or John",
  },

  tel: {
    required: true,
    type: "phone",

    message: {
      required: "Enter phone number",
      invalid: "Enter a valid phone number",
    },

    hint: "Format depends on the selected country",
  },

  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    message: {
      required: "Enter email",
      pattern: "Invalid email address",
    },

    hint: "Example: user@example.com",
  },

  select: {
    required: true,
    type: "dropdown",

    message: {
      required: "Select a value",
    },

    hint: "Choose one of the available options",
  },

  brand: {
    required: true,
    type: "dropdown",

    message: {
      required: "Select at least one brand",
    },
  },

  date: {
    required: true,
    type: "dropdown",
  
    message: {
      required: "Select a date",
    },
  },

  price: {
    required: true,
    type: "dropdown",

    message: {
      required: "Select price range",
    },
  },

  policy: {
    required: true,
    type: "checkbox",

    message: {
      required: "You must accept the terms",
    },

    hint: "We cannot proceed without this",
  },

  message: {
    required: false,

    hint: "Describe your request in free form",
  },
};
