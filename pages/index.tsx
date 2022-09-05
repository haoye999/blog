import {NextPage} from 'next'
import Head from 'next/head'
import {Post, Posts} from '../interfaces'
import Layout from '../components/MyLayout'
import PostList from '../components/PostList'
import WhoAmI from '../components/WhoAmI'
import {getAllPosts} from '../util/post'

const Index: NextPage<Posts> = props => (
  <>
    <Head>
      <title>Haoye Blog</title>
    </Head>
    <Layout aside={<WhoAmI />}>
      <PostList posts={props.posts} />
    </Layout>
  </>
)

export async function getServerSideProps() {
  const posts: Post[] = await getAllPosts()
  return {props: {posts}}
}

export default Index
