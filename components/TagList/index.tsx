import { SFC } from "react";
import { TagsType } from '../../interfaces';
import Tag from '../Tag';

const TagList: SFC<{ tags: TagsType }> = ({ tags }) => (
  <ul className="tag-list">
    {tags.map(tag => (
      <Tag
        key={tag.value}
        {...tag}
      />
    ))}
  </ul>
);

export default TagList;