import Header from './Header';
import Footer from './Footer';
import '../../style/index.less';
import './index.less';

interface PropsType {
  children: JSX.Element;
  aside?: JSX.Element;
}

export default (props: PropsType) => {
  const { aside } = props;
  return (
    <div id='container'>
      <Header />
      <div className={`layout ${aside ? 'with-aside' : ''}`}>
        <aside>{aside}</aside>
        <main>{props.children}</main>
      </div>
      <Footer />
    </div>
  )
}