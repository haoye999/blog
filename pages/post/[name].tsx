import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { NextPage } from 'next'
import Head from 'next/head'
import { AxiosResponse } from 'axios'
import CodeBlock from '../../components/CodeBlock'
import Layout from '../../components/MyLayout'
import { Post } from '../../interfaces'
import { parseDate, fetchData } from '../../util'
import styles from './Post.module.scss'

const PostComponent: NextPage<Post> = (props) => {
  const { title, birthtime, mtime, _content, description } = props

  const [showUpdate, setShowUpdate] = useState(true)

  return (
    <>
      <Head>
        <title>{title} | Haoye Blog</title>
      </Head>
      <Layout>
        <article>
          <h1 className={styles.title}>{title}</h1>
          <h2 className={styles.description}>
            <ReactMarkdown className={styles.markdown} source={description} />
          </h2>
          {showUpdate ? (
            <span
              className={styles.refreshTime}
              onClick={() => setShowUpdate(!showUpdate)}
            >
              更新于：{parseDate(mtime)}
            </span>
          ) : (
            <span
              className={styles.publishTime}
              onClick={() => setShowUpdate(!showUpdate)}
            >
              发布于：{parseDate(birthtime)}
            </span>
          )}
          <hr className={styles.divide} />
          <section>
            <ReactMarkdown
              className="markdown"
              source={_content}
              renderers={{
                code: CodeBlock,
              }}
            />
          </section>
        </article>
      </Layout>
    </>
  )
}

PostComponent.getInitialProps = async (ctx) => {
  const { name } = ctx.query
  const res: AxiosResponse<Post> = await fetchData(`/post/${name}`)
  return res.data
}

export default PostComponent
