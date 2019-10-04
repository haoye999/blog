export interface Post {
  title: string;
  subTitle?: string;
  birthtime: string;
  _content: string;
  tags?: Array<string>;
  avatar?: string;
}