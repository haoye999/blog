import { Posts } from '../../interfaces';
import { SFC } from 'react';
import PostItem from '../PostItem';
import './index.less';

const PostList: SFC<Posts> = props => (
  <ul className="post-list-container">
    {props.posts.map(post => <PostItem key={post.name} post={post} />)}
  </ul>
);

export default PostList;