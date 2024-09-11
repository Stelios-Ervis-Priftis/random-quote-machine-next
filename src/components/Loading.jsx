import PropTypes from 'prop-types';
import React from 'react';

import styles from '@/styles/index.module.css';

export default function Loading({ color }) {
  return (
    <p className={styles.loading} style={{ color }}>
      Loading...
    </p>
  );
}

Loading.propTypes = {
  color: PropTypes.string.isRequired,
};
