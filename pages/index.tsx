import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import { Post, Posts } from '../interfaces';
import Layout from '../components/MyLayout';
import { fetchData } from '../util/request';
import PostList from '../components/PostList'

const Index: NextPage<Posts> = (props) => (
  <Layout>
    <PostList posts={props.posts} />
  </Layout>
);

Index.getInitialProps = async ctx => {
  const res: AxiosResponse<Array<Post>> = await fetchData('/posts');
  return {
    posts: res.data,
  };
}

export default Index;
