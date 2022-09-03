import styles from './WhoAmi.module.scss';

const WhoAmI = () => (
  <div className={styles['who-am-i']}>
    Hello, 我是<a href='https://github.com/haoye999'>Haoye999</a>, 现在还是一名学生，这是我写 blog 的地方，只是为了记录生活中的点滴。
  </div>
);

export default WhoAmI;