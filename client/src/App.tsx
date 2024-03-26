import { FC } from 'react';
import ClanWarPage from '@/pages/ClanWarPage/ClanWarPage';
import styles from './App.module.scss';

const App: FC = () => {
  return (
    <div className={styles.app}>
      <ClanWarPage />
    </div>
  );
};

export default App;
