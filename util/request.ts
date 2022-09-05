import axios from 'axios';
import qs from 'query-string';
export const host =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://blog.godhaoye.com';

export function fetchData(url: string, query: any = {}) {
  return axios(`${host}/api${url}${qs.stringify(query)}`);
}
