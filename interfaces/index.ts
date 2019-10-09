export interface Post {
  title: string;
  description: string;
  birthtime: string;
  mtime: string;
  _content: string;
  tags?: Array<string>;
  avatar: string;
  name: string;
}

export interface Posts {
  posts: Array<Post>;
}

export interface TagType {
  bgColor?: string;
  color?: string;
  value: string;
}

export type TagsType = Array<TagType>;