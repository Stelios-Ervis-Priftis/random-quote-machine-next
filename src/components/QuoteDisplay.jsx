import PropTypes, { string } from 'prop-types';
import React from 'react';

import Loading from '@/components/Loading';

import styles from '@/styles/index.module.css';

export default function QuoteDisplay({ quoteData, isFetching }) {
  if (isFetching) {
    return <Loading />;
  }

  if (quoteData) {
    const { quote, author } = quoteData;

    return (
      <>
        <p className={styles.quote}>{`"${quote}"`}</p>
        <p className={styles.author}>{author}</p>
      </>
    );
  }

  return <p className={styles.quote}>Request a quote!</p>;
}

QuoteDisplay.propTypes = {
  quoteData: PropTypes.shape({
    author: string,
    category: string,
    quote: string,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
};
