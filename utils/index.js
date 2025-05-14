const PassValidation = (str) => {
  return /[A-Z]/.test(str);
};

const emailValidation = (str) => {
  return /\S+@\S+\.\S+/.test(str);
};

export { PassValidation, emailValidation };

