import PropTypes from 'prop-types';
import React from 'react';

import styles from '@/styles/index.module.css';

export default function FetchQuoteButton({ count, isRunning, fetchQuote }) {
  const handleClick = () => {
    if (isRunning) return;
    fetchQuote();
  };

  return (
    <button
      type="button"
      className={`${styles.btn} ${isRunning ? styles.disabled : ''}`}
      onClick={handleClick}
    >
      request a new quote {isRunning && `in (${count})`}
    </button>
  );
}

FetchQuoteButton.propTypes = {
  count: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  fetchQuote: PropTypes.func.isRequired,
};
