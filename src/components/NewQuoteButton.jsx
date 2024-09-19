import PropTypes from 'prop-types';
import React from 'react';

import styles from '@/styles/index.module.css';

export default function NewQuoteButton({
  color,
  count,
  isRunning,
  errorMessage,
  getNewQuote,
}) {
  const handleClick = () => {
    if (isRunning) return;
    getNewQuote();
  };

  return (
    <button
      type="button"
      className={`${styles.btn} ${isRunning ? styles.disabled : ''}`}
      style={{ color }}
      onClick={handleClick}
    >
      {isRunning && !errorMessage
        ? `request a new quote in (${count !== null ? count : ''})`
        : 'new quote'}
    </button>
  );
}

NewQuoteButton.propTypes = {
  color: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  errorMessage: PropTypes.bool.isRequired,
  getNewQuote: PropTypes.func.isRequired,
};
