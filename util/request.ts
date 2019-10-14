import axios from 'axios';
import qs from 'query-string';

export const host = 'http://localhost:4000';

export function fetchData(url: string, query: any = {}) {
  return axios(`${host}/api${url}${qs.stringify(query)}`);
}
