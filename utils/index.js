import bcrypt from 'bcrypt';  

const PassValidation = (str) => {
  return /[A-Z]/.test(str);
};

const emailValidation = (str) => {
  return /\S+@\S+\.\S+/.test(str);
};

const hashPassword = async(pass) => {
      const hash = await bcrypt.hash(pass, 10)
      return hash
  }

export { PassValidation, emailValidation, hashPassword };

