import { FC } from "react";
import { TagType } from '../../interfaces';
import styles from './Tag.module.scss';

const TagList: FC<TagType> = ({ bgColor = 'black', color = 'white', value }) => {
  return <span className={styles.tag} style={{ backgroundColor: bgColor, color }}>{value}</span>;
}

export default TagList;