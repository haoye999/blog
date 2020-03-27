import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { NextPage } from "next";
import Head from "next/head";
import CodeBlock from "../../components/CodeBlock";
import Layout from "../../components/MyLayout";
import { Post } from "../../interfaces";
import { parseDate, host } from "../../util";
import "./index.less";

const PostComponent: NextPage<Post> = props => {
  const { title, birthtime, mtime, _content, description } = props;

  const [showUpdate, setShowUpdate] = useState(true);

  return (
    <>
      <Head>
        <title>{title} | Haoye Blog</title>
      </Head>
      <Layout>
        <article>
          <h1 className="title">{title}</h1>
          <h2 className="description">
            <ReactMarkdown className="markdown" source={description} />
          </h2>
          {showUpdate ? (
            <span
              className="refresh-time"
              onClick={() => setShowUpdate(!showUpdate)}
            >
              更新于：{parseDate(mtime)}
            </span>
          ) : (
            <span
              className="publish-time"
              onClick={() => setShowUpdate(!showUpdate)}
            >
              发布于：{parseDate(birthtime)}
            </span>
          )}
          <hr />
          <section>
            <ReactMarkdown
              className="markdown"
              source={_content}
              renderers={{
                code: CodeBlock
              }}
            />
          </section>
        </article>
      </Layout>
    </>
  );
};

PostComponent.getInitialProps = async ctx => {
  const { name } = ctx.query;
  const res: AxiosResponse<Post> = await axios(`${host}/api/post/${name}`);
  return res.data;
};

export default PostComponent;
