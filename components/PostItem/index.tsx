import { Post } from '../../interfaces';
import { SFC } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import TagList from '../../components/TagList';
import { parseDate, tag2Color, tag2BgColor } from '../../util';
import './index.less';

const PostItem: SFC<{ post: Post }> = ({ post }) => {
  const { birthtime, name, title, avatar, mtime, description, tags = [] } = post;
  return (
    <Link key={birthtime} href="/post/[name]" as={`/post/${name}`}>
      <li className="post-item-container">
        <div className="post-item-main">
          <h2 className="post-item-name">{title}</h2>
          <section className="post-item-description">
            <ReactMarkdown
              className='markdown'
              source={description}
            />
          </section>
          <div className="post-item-tag-container">
            <TagList tags={tags.map(tag => ({
              value: tag,
              bgColor: tag2BgColor[tag],
              color: tag2Color[tag]
            }))} />
          </div>
          <time className="post-item-time">更新于：{parseDate(mtime)}</time>
        </div>
        <div style={{ backgroundImage: `url(${avatar})` }} className="post-item-avatar"></div>
      </li>
    </Link>
  )
};

export default PostItem;