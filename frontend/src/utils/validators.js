// ========================================
// REQUIRED
// ========================================

export const required = (
  value,
  fieldName = "This field"
) => {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return `${fieldName} is required`;
  }

  return "";
};


// ========================================
// EMAIL
// ========================================

export const isValidEmail = (email) => {
  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(
    String(email).trim()
  );
};

export const validateEmail = (email) => {
  if (!email?.trim()) {
    return "Email is required";
  }

  if (!isValidEmail(email)) {
    return "Please enter a valid email address";
  }

  return "";
};


// ========================================
// PHONE
// ========================================

export const isValidPhone = (phone) => {
  const cleaned = String(phone)
    .replace(/\s/g, "")
    .replace(/^\+91/, "");

  return /^[6-9]\d{9}$/.test(cleaned);
};

export const validatePhone = (phone) => {
  if (!phone?.trim()) {
    return "Phone number is required";
  }

  if (!isValidPhone(phone)) {
    return "Please enter a valid 10-digit phone number";
  }

  return "";
};


// ========================================
// PASSWORD
// ========================================

export const validatePassword = (
  password
) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};


// ========================================
// STRONG PASSWORD
// ========================================

export const validateStrongPassword = (
  password
) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain an uppercase letter";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain a lowercase letter";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain a number";
  }

  return "";
};


// ========================================
// CONFIRM PASSWORD
// ========================================

export const validateConfirmPassword = (
  password,
  confirmPassword
) => {
  if (!confirmPassword) {
    return "Please confirm your password";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return "";
};


// ========================================
// NAME
// ========================================

export const validateName = (
  name,
  fieldName = "Name"
) => {
  if (!name?.trim()) {
    return `${fieldName} is required`;
  }

  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }

  return "";
};


// ========================================
// PINCODE
// ========================================

export const validatePincode = (
  pincode
) => {
  if (!pincode?.trim()) {
    return "Pincode is required";
  }

  if (!/^\d{6}$/.test(pincode)) {
    return "Please enter a valid 6-digit pincode";
  }

  return "";
};


// ========================================
// DATE
// ========================================

export const validateDate = (
  date,
  fieldName = "Date"
) => {
  if (!date) {
    return `${fieldName} is required`;
  }

  const selectedDate = new Date(date);

  if (Number.isNaN(selectedDate.getTime())) {
    return `Please enter a valid ${fieldName.toLowerCase()}`;
  }

  return "";
};


// ========================================
// FUTURE DATE
// ========================================

export const validateFutureDate = (
  date,
  fieldName = "Date"
) => {
  const basicError = validateDate(
    date,
    fieldName
  );

  if (basicError) {
    return basicError;
  }

  const selectedDate = new Date(date);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return `${fieldName} cannot be in the past`;
  }

  return "";
};


// ========================================
// NUMBER
// ========================================

export const validateNumber = (
  value,
  fieldName = "Number"
) => {
  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return `${fieldName} is required`;
  }

  if (Number.isNaN(Number(value))) {
    return `${fieldName} must be a valid number`;
  }

  return "";
};


// ========================================
// POSITIVE NUMBER
// ========================================

export const validatePositiveNumber = (
  value,
  fieldName = "Number"
) => {
  const error = validateNumber(
    value,
    fieldName
  );

  if (error) {
    return error;
  }

  if (Number(value) <= 0) {
    return `${fieldName} must be greater than 0`;
  }

  return "";
};


// ========================================
// TEXT LENGTH
// ========================================

export const validateMinLength = (
  value,
  min,
  fieldName = "Field"
) => {
  if (!value?.trim()) {
    return `${fieldName} is required`;
  }

  if (value.trim().length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }

  return "";
};


export const validateMaxLength = (
  value,
  max,
  fieldName = "Field"
) => {
  if (value && value.length > max) {
    return `${fieldName} cannot exceed ${max} characters`;
  }

  return "";
};


// ========================================
// URL
// ========================================

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};


// ========================================
// FILE
// ========================================

export const validateFileSize = (
  file,
  maxSize
) => {
  if (!file) {
    return "Please select a file";
  }

  if (file.size > maxSize) {
    return "File size is too large";
  }

  return "";
};


export const validateFileType = (
  file,
  allowedTypes
) => {
  if (!file) {
    return "Please select a file";
  }

  if (!allowedTypes.includes(file.type)) {
    return "This file type is not supported";
  }

  return "";
};


// ========================================
// GENERIC FORM VALIDATION
// ========================================

export const hasErrors = (errors) => {
  return Object.values(errors).some(
    Boolean
  );
};