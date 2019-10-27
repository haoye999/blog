import { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { Post, Posts } from '../interfaces';
import Layout from '../components/MyLayout';
import { fetchData } from '../util/request';
import PostList from '../components/PostList';
import WhoAmI from '../components/WhoAmI';

const Index: NextPage<Posts> = (props) => (
  <>
    <Head>
      <title>Haoye Blog</title>
    </Head>
    <Layout
      aside={
        <WhoAmI />
      }
    >
      <PostList posts={props.posts} />
    </Layout>
  </>
)

Index.getInitialProps = async ctx => {
  const res: AxiosResponse<Array<Post>> = await fetchData('/posts');
  return {
    posts: res.data,
  };
}

export default Index;
