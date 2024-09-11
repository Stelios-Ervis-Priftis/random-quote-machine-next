import PropTypes from 'prop-types';
import { React } from 'react';

import styles from '@/styles/index.module.css';

export default function HandleErrorMessages({ message }) {
  return <p className={styles.errorMessage}>{message}</p>;
}

HandleErrorMessages.propTypes = {
  message: PropTypes.string.isRequired,
};
