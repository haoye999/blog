import {NextPage} from 'next'
import Head from 'next/head'
import {Posts} from '../interfaces'
import PostList from '../components/PostList'
import {getAllPosts} from '../util/post'

const Index: NextPage<Posts> = props => (
  <>
    <Head>
      <title>Haoye Blog</title>
    </Head>
    <PostList posts={props.posts} />
  </>
)

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {props: {posts, showSideBar: true}}
}

export default Index
