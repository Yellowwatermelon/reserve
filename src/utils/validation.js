export const validateName = (name) => {
  return /^[가-힣]{3,}$/.test(name);
};

export const validatePhone = (phone) => {
  return /^01[0-9]{9}$/.test(phone);
};

export const validateDate = (date) => {
  const now = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 10);
  
  return date >= now && date <= maxDate;
};
