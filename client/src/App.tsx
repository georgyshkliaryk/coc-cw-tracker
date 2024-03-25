import { FC } from 'react';
import CurrentWarPage from './components/CurrentWarPage/CurrentWarPage';
import styles from './App.module.scss';

const App: FC = () => {
  return (
    <div className={styles.app}>
      <CurrentWarPage />
    </div>
  );
};

export default App;
