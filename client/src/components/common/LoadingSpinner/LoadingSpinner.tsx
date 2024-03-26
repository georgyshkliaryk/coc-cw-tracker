import { FC } from 'react';
import spinnerIcon from '../../../assets/spinner.svg';
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner: FC = () => {
  return <img src={spinnerIcon} alt="spinner" className={styles.spinner} />;
};

export default LoadingSpinner;
