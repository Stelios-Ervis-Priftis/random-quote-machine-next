import randomColor from 'randomcolor';
import React, { useEffect, useState } from 'react';

import ErrorMessages from '@/components/ErrorMessages';
import FetchQuoteButton from '@/components/FetchQuoteButton';
import QuoteDisplay from '@/components/QuoteDisplay';
import {
  API_ERROR_MESSAGE,
  APP_NAME_TITLE,
  COLOR_LUMINOSITY,
  INITIAL_COLOR,
} from '@/constants/index';
import useCountdown from '@/hooks/useCountdown';
import useQuote from '@/hooks/useQuote';

import styles from '@/styles/index.module.css';

export default function App() {
  const { data: quote, isFetching, isError, refetch } = useQuote();
  const [color, setColor] = useState(INITIAL_COLOR);
  const { count, isRunning } = useCountdown(isFetching);

  useEffect(() => {
    setColor(randomColor(COLOR_LUMINOSITY));
  }, [quote]);

  return (
    <div className={styles.container}>
      <div className={styles.quoteContainer} style={{ color }}>
        <h1>{APP_NAME_TITLE}</h1>
        <QuoteDisplay quoteData={quote} isFetching={isFetching} color={color} />
        <FetchQuoteButton
          count={count}
          isRunning={isRunning}
          fetchRandomQuote={refetch}
        />
      </div>
      {isError && isRunning && <ErrorMessages message={API_ERROR_MESSAGE} />}
    </div>
  );
}
