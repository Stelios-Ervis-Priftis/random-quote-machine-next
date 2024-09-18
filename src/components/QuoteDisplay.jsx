import PropTypes, { string } from 'prop-types';
import React from 'react';

import Loading from '@/components/Loading';

import styles from '@/styles/index.module.css';

export default function QuoteDisplay({ quoteBody, isLoading, color }) {
  if (isLoading) {
    return <Loading color={color} />;
  }

  if (quoteBody) {
    const { quote, author } = quoteBody;

    return (
      <>
        <p className={styles.quote} style={{ color }}>
          {`"${quote}"`}
        </p>
        <p className={styles.author} style={{ color }}>
          {author}
        </p>
      </>
    );
  }

  return (
    <p className={styles.quote} style={{ color }}>
      Request a quote!
    </p>
  );
}

QuoteDisplay.propTypes = {
  quoteBody: PropTypes.shape({
    author: string,
    category: string,
    quote: string,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
};
