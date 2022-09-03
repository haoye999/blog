import { Posts } from '../../interfaces'
import { FC } from 'react'
import PostItem from '../PostItem'
import styles from './PostList.module.scss'

const PostList: FC<Posts> = (props) => {
  return (
    <ul className={styles['post-list-container']}>
      {props.posts.length &&
        props.posts.map((post) => <PostItem key={post.name} post={post} />)}
    </ul>
  )
}

export default PostList
