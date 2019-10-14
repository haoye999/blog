import axios, { AxiosResponse } from 'axios';
import ReactMarkdown from 'react-markdown';
import { NextPage } from 'next';
import CodeBlock from '../../components/CodeBlock';
import Layout from '../../components/MyLayout';
import { Post } from '../../interfaces';
import { parseDate, host } from '../../util';
import './index.less';

const PostComponent: NextPage<Post> = props => {
  const { title, birthtime, mtime, _content, description } = props;

  return (
    <Layout>
      <article>
        <h1 className='title'>{title}</h1>
        <h2 className='description'>
          <ReactMarkdown
            className='markdown'
            source={description}
          />
        </h2>
        <span className='refresh-time'>更新于：{parseDate(mtime)}</span>
        <hr />
        <section>
          <ReactMarkdown
            className='markdown'
            source={_content}
            renderers={{
              code: CodeBlock,
            }}
          />
        </section>
      </article>
    </Layout>
  );
}

PostComponent.getInitialProps = async ctx => {
  const { name } = ctx.query;
  const res: AxiosResponse<Post> = await axios(`${host}/api/post/${name}`);
  return res.data;
}

export default PostComponent;