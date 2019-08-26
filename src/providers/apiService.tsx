/**
 * apiService
 */
import { CONFIG_API } from '../apiRoutes';

type Data = any;
type Body = any;

const apiService = async (api: string, data: Data): Promise<Object> => {
  // @ts-ignore
  let { url } = CONFIG_API[api];
  // @ts-ignore
  const { useToken, method, type='json' } = CONFIG_API[api];
  var body: Body = null;
  var objFetch = {};
  const headers: Object = { 'Accept': 'application/json' };

  if (type === 'json' && method !== 'GET' && method !== 'DELETE'){
    body = JSON.stringify(data);
    // @ts-ignore
    headers['Content-Type'] = 'application/json';
  }
  else if (type === 'form-data'){
    body = new FormData();
    Object.keys(data).forEach(function (key) {
      if (data[key]) body.append(key, data[key]);
    });
  }
  else if (data && (method === 'GET' || method === 'DELETE') ) url = `${url}${data}`;

  if (useToken){
    const userToken = sessionStorage.getItem('token');
    // @ts-ignore
    // headers.Authorization = `Bearer ${userToken? userToken: ''}`;
    url += `apikey=${userToken? userToken: ''}`;

  }
  if (method === 'get'){ objFetch = { method, headers }; }
  else { objFetch = { method, headers, body }; }
  return fetch(url, objFetch)
    .then(resp => {
      if (resp.headers.get('content-type') == 'application/download; charset=utf-8') return resp.blob();
      if (resp.statusText !== 'No Content') return resp.json();
      return resp;
    })
    .then(json => {
      // if (json.type === 'application/download') {
      //   download(json, 'tu_abuela.csv')
      //   json = { data: json, success: json.error? false: true  };
      //   return json;
      // }
      if (json) {
        json = { data: json, success: json.error? false: true };
        return json;
      }
      return json.then((err: any) => {
        console.log(err);				// eslint-disable-line
        throw err;
      });
    })
    .then(json => json);
};

export default apiService;
