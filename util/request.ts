import axios from 'axios';
import qs from 'query-string';

const host = 'http://localhost:3000';

export function fetchData(url: string, query: any = {}) {
  return axios(`${host}/api${url}${qs.stringify(query)}`);
}
