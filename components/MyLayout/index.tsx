import { ReactElement } from 'react';
import '../../style/index.less';

export default (props: { children: ReactElement }) => (
  <div>
    <h1>Haoye Blog</h1>
    {props.children}
  </div>
)