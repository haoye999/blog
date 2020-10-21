import axios from "axios";
import qs from "query-string";

export function fetchData(url: string, query: any = {}) {
  return axios(`/api${url}${qs.stringify(query)}`);
}
