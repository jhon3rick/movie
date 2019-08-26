/**
 * validateInput
 */
/* eslint-disable no-useless-escape */
const validateInput = (value: string, type: string): boolean => {
  switch (type) {
    case 'email':
      return (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value));
    case 'phone':
      return (/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/i.test(value));
    case 'postalCode':
      return (/^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i.test(value));
    case 'url':
      return (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i.test(value));
    case 'alphaNumeric':
      return (/^[a-zA-Z0-9]*$/i.test(value));
    case 'decimalNumber':
      return (/^[0-9]+\.?[0-9]*$/i.test(value));
    case 'onlyNumbers':
      return (/^[0-9]+$/i.test(value));
    case 'onlyLetters':
      return (/^[a-zA-Z]+$/i.test(value));
    default:
      break;
  }
  return true;
};

export default validateInput;