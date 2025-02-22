const validateAll = (formData) => {
  let newErrors = {};
  let valid = true;

  const reqFields = [
    "category",
    "date",
    "paymentMode",
    "description",
    "amount",
    "cashflow",
    "time",
  ];

  reqFields.forEach((field) => {
    if (!formData[field]) {
      newErrors[field] = "Required field.";
      valid = false;
    }
  });

  return { valid, newErrors };
};

const validateField = (name, value) => {
  const newErrors = {};
  let valid = true;

  if (!value) {
    newErrors[name] = "Required Field";
    valid = false;
  } else {
    newErrors[name] = null;
  }

  return { valid, newErrors };
};

export default {
  validateAll,
  validateField,
};
