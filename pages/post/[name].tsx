import axios, { AxiosResponse } from 'axios';
import ReactMarkdown from 'react-markdown';
import { NextPage } from 'next';
import CodeBlock from '../../components/CodeBlock';
import Layout from '../../components/MyLayout';
import { Post } from '../../interfaces';


const PostComponent: NextPage<Post> = props => {
  const { title, birthtime, _content } = props;

  return (
    <Layout>
      <div>
        <h1>{title}</h1>
        <h3>{birthtime}</h3>
        <ReactMarkdown
          className='markdown'
          source={_content}
          renderers={{
            code: CodeBlock,
          }}
        />
      </div>
    </Layout>
  );
}

PostComponent.getInitialProps = async ctx => {
  const { name } = ctx.query;
  const res: AxiosResponse<Post> = await axios(`http://localhost:3000/api/post/${name}`);
  const { _content, birthtime, title } = res.data;
  return {
    title,
    _content,
    birthtime,
  };
}

export default PostComponent;