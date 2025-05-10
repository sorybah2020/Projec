const validateAll = (formData, reqFields = null) => {
  let newErrors = {};
  let valid = true;

  reqFields != null &&
    reqFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Required field.";
        valid = false;
      }
    });
  if (formData["email"] && !/\S+@\S+\.\S+/.test(formData["email"].trim())) {
    newErrors.email = "Please enter a valid email address.";
    valid = false;
  }

  return { valid, newErrors };
};

const validateField = (name, value, reqFields = null) => {
  const newErrors = {};
  let valid = true;

  if (reqFields != null && reqFields[name] && !value) {
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
