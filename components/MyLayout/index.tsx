import { ReactNode } from 'react';
import Header from './Header';
import Aside from './aside';
import '../../style/index.less';
import './index.less';

export default (props: { children: ReactNode }) => (
  <div>
    <Header />
    <div className='layout'>
      <Aside></Aside>
      <main>{props.children}</main>
    </div>
  </div>
)