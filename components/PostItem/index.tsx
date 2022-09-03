import { Post } from '../../interfaces'
import { FC } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import TagList from '../../components/TagList'
import { parseDate, tag2Color, tag2BgColor } from '../../util'
import styles from './PostItem.module.scss'

const PostItem: FC<{ post: Post }> = ({ post }) => {
  const { birthtime, name, title, avatar, mtime, description, tags = [] } = post
  return (
    <Link key={birthtime} href="/post/[name]" as={`/post/${name}`}>
      <li className={styles['post-item-container']}>
        <div className={styles["post-item-main"]}>
          <h2 className={styles["post-item-name"]}>{title}</h2>
          <section className={styles["post-item-description"]}>
            <ReactMarkdown className="markdown" source={description} />
          </section>
          <div className={styles["post-item-tag-container"]}>
            <TagList
              tags={tags.map((tag) => ({
                value: tag,
                bgColor: tag2BgColor[tag],
                color: tag2Color[tag],
              }))}
            />
          </div>
          <time className={styles["post-item-time"]}>更新于：{parseDate(mtime)}</time>
        </div>
        <div
          style={{ backgroundImage: `url(${avatar})` }}
          className={styles["post-item-avatar"]}
        ></div>
      </li>
    </Link>
  )
}

export default PostItem
