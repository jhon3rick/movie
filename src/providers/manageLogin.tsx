/**
 * manageLogin
 */

export const createUser = (username: string, password: string) => {
  const responseApi = {
    success: true,
    data: {
      token: 'f12ba140',
      user: {
        name: 'Prueba Prueba',
        username,
      }
    }
  };

  const {
    data: {
      token,
      user
    }
  } = responseApi

  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
  sessionStorage.setItem('userName', username);

  return responseApi;
}

export const removeUser = () => {
  sessionStorage.clear();
}
