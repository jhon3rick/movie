/**
 * autenticate method
 */
// import decode from 'jwt-decode';

const autenticate = (): boolean => {
  const token = sessionStorage.getItem('token');
  if (!token) return false;
  else return true;

  /*
  let isValid = true;
  try {
    isValid = decode(token);
  } catch (e) {
    isValid = false;
  }
  return isValid;
  */
};
export default autenticate;