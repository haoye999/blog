import { SFC } from "react";
import { TagType } from '../../interfaces';
import './index.less';

const TagList: SFC<TagType> = ({ bgColor = 'black', color = 'white', value }) => {
  return <span className="tag" style={{ backgroundColor: bgColor, color }}>{value}</span>;
}

export default TagList;