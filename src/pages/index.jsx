import randomColor from 'randomcolor';
import React, { useEffect, useState } from 'react';

import HandleErrorMessages from '@/components/HandleErrorMessages';
import NewQuoteButton from '@/components/NewQuoteButton';
import QuoteDisplay from '@/components/QuoteDisplay';
import {
  API_ERROR_MESSAGE,
  COLOR_LUMINOSITY,
  INITIAL_COLOR,
} from '@/constants/index';
import useErrorCountdown from '@/hooks/useErrorCountdown';
import useQuote from '@/hooks/useQuote';

import styles from '@/styles/index.module.css';

export default function App() {
  const { data: quote, isFetching, isError, refetch } = useQuote();
  const [color, setColor] = useState(INITIAL_COLOR);
  const { count, isRunning } = useErrorCountdown(isFetching);

  useEffect(() => {
    setColor(randomColor(COLOR_LUMINOSITY));
  }, [quote]);

  return (
    <div className={styles.container}>
      <div className={styles.quoteContainer} style={{ color }}>
        <h1>Quote Generator</h1>
        <QuoteDisplay quoteData={quote} isFetching={isFetching} color={color} />
        <NewQuoteButton
          count={count}
          isRunning={isRunning}
          fetchQuote={refetch}
        />
      </div>
      {isError && isRunning && (
        <HandleErrorMessages message={API_ERROR_MESSAGE} />
      )}
    </div>
  );
}
