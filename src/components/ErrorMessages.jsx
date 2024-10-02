import PropTypes from 'prop-types';
import { React } from 'react';

import styles from '@/styles/index.module.css';

export default function ErrorMessages({ message }) {
  return <p className={styles.errorMessage}>{message}</p>;
}

ErrorMessages.propTypes = {
  message: PropTypes.string.isRequired,
};
