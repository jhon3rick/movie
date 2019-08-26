// export const URL_BASE = 'https://jsonplaceholder.typicode.com';
export const URL_BASE = 'http://www.omdbapi.com';
export const URL_API = `${URL_BASE}`;
export const URL_MAIL = 'web.com';

export const appRoles = {
  administrador: 'administrador',
  manager: 'gestor',
  facilitator: 'facilitador',
  auditor: 'auditor',
  assistant: 'asistente'
};
// ROUTES API
export const CONFIG_API = {
  'login:GET': {
    url: `${URL_API}/fake`,
    method: 'GET',
    useToken: false
  },
  'search-movies:GET': {
    url: `${URL_API}`,
    method: 'GET',
    useToken: true
  },
  'method-post:POST': {
    url: `${URL_API}`,
    method: 'POST',
    useToken: true
  },

};