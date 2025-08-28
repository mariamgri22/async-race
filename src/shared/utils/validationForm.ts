const patterns = {
  COLOR_HEX: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
};

export const validationOptions = {
  TEXT_REQUIRED: {
    required: {
      value: true,
      message: 'Input is required',
    },
    minLength: {
      value: 2,
      message: 'Min input length is 2',
    },
    maxLength: {
      value: 255,
      message: 'Max input length is 255',
    },
  },

  COLOR_REQUIRED: {
    required: {
      value: true,
      message: 'Color is required',
    },
    pattern: {
      value: patterns.COLOR_HEX,
      message: 'HEX color is expected',
    },
  },
};
