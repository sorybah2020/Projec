const reqFields = [
  "category",
  "date",
  "paymentMode",
  "description",
  "amount",
  "cashflow",
  "time",
];

const validateAll = (formData) => {
  let newErrors = {};
  let valid = true;

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

  if (reqFields[name] && !value) {
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
