import Header from './Header'
import Footer from './Footer'
import styles from './MyLayout.module.scss'

interface PropsType {
  children: JSX.Element
  aside?: JSX.Element
}

const MyLayout = (props: PropsType) => {
  const { aside } = props
  return (
    <div id="container">
      <Header />
      <div className={`${styles.layout} ${aside ? styles['with-aside'] : ''}`}>
        <aside>{aside}</aside>
        <main>{props.children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default MyLayout
