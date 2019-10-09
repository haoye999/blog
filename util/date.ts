import moment from 'moment';
import 'moment/locale/zh-cn';

export function parseDate(date: string) {
  return moment(date).fromNow();
}