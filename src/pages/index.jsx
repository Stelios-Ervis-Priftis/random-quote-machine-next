import axios from 'axios';
import randomColor from 'randomcolor';
import React, { useEffect, useState } from 'react';

import HandleErrorMessages from '@/components/HandleErrorMessages';
import Loading from '@/components/Loading';
import QuoteDisplay from '@/components/QuoteDisplay';
import {
  API_ERROR_MESSAGE,
  COLOR_LUMINOSITY,
  LOCAL_STORAGE_QUOTES_KEY,
} from '@/constants/index';
import useErrorCountdown from '@/hooks/useErrorCountdown';

import styles from '@/styles/index.module.css';

export default function App() {
  const [quoteBody, setQuoteBody] = useState(null);
  const [color, setColor] = useState('black');
  const [isLoading, setLoading] = useState(true);
  const {
    count,
    isRunning,
    errorMessage,
    triggerSuccessCountdown,
    triggerErrorCountdown,
  } = useErrorCountdown();

  const getNewQuote = async () => {
    try {
      setColor(randomColor(COLOR_LUMINOSITY));
      setLoading(true);
      triggerSuccessCountdown();
      const response = await axios.get('/api/proxy');
      setQuoteBody(response.data[0]);
    } catch (error) {
      console.error('🚀 Error Message:', error);
      triggerErrorCountdown(API_ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  // Retrieve from localStorage and setQuoteBody if storedQuoteBody, otherwise requests new quoteBody.
  useEffect(() => {
    // Make sure this code only runs on the client
    if (typeof window !== 'undefined') {
      const storedQuote = localStorage.getItem(LOCAL_STORAGE_QUOTES_KEY);

      if (storedQuote) {
        setColor(randomColor(COLOR_LUMINOSITY));
        setQuoteBody(JSON.parse(storedQuote));
        return;
      }

      getNewQuote();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set item (quoteBody) to localStorage if quoteBody.
  useEffect(() => {
    if (quoteBody) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          LOCAL_STORAGE_QUOTES_KEY,
          JSON.stringify(quoteBody)
        );
        setLoading(false);
      }
    }
  }, [quoteBody]);

  return (
    <div className={styles.container}>
      <div className={styles.quoteBody}>
        {isLoading && !quoteBody ? (
          <Loading color={color} />
        ) : (
          <>
            <h1 style={{ color }}>Random Quote Machine</h1>
            <QuoteDisplay
              quoteBody={quoteBody}
              isLoading={isLoading}
              color={color}
            />
            <button
              type="button"
              className={`${styles.btn} ${isRunning ? styles.disabled : ''}`}
              style={{ color }}
              onClick={() => {
                if (isRunning) return;
                getNewQuote();
              }}
            >
              {isRunning && !errorMessage
                ? `request a new quote in (${count})`
                : 'new quote'}
            </button>
          </>
        )}
        {errorMessage && <HandleErrorMessages message={errorMessage} />}
      </div>
    </div>
  );
}
