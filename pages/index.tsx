import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import { Post } from '../interfaces';
import Layout from '../components/MyLayout';

interface Posts {
  posts: Array<string>;
}

const Index: NextPage<Posts> = (props) => {
  const { posts } = props;
  return (
    <Layout>
      <div>
        {posts.map(post => (
          <Link key={post} href="/post/[name]" as={`/post/${post}`}>
            <a>{post}</a>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

Index.getInitialProps = async ctx => {
  const res: AxiosResponse<Posts['posts']> = await axios(`http://localhost:3000/api/posts`);
  console.log(res.data);
  return {
    posts: res.data,
  };
}

export default Index;
