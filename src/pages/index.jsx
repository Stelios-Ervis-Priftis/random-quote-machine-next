import axios from 'axios';
import randomColor from 'randomcolor';
import React, { useEffect, useState } from 'react';

import HandleErrorMessages from '@/components/HandleErrorMessages';
import Loading from '@/components/Loading';
import { API_ERROR_MESSAGE, LOCAL_STORAGE_QUOTES_KEY } from '@/constants/index';
import useErrorCountdown from '@/hooks/useErrorCountdown';

import styles from '@/styles/index.module.css';

export default function App() {
  const [quote, setQuote] = useState(null);
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
      setLoading(true);
      triggerSuccessCountdown();
      const response = await axios.get('/api/proxy');
      setQuote(response.data);
    } catch (error) {
      console.error('🚀 Error Message:', error);
      triggerErrorCountdown(API_ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  // Retrieve from localStorage and setQuote if storedQuote, otherwise requests new quote.
  useEffect(() => {
    setColor(randomColor());
    // Make sure this code only runs on the client
    if (typeof window !== 'undefined') {
      const storedQuote = localStorage.getItem(LOCAL_STORAGE_QUOTES_KEY);

      if (storedQuote) {
        setQuote(JSON.parse(storedQuote));
        return;
      }

      getNewQuote();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set item (quote) to localStorage if quote.
  useEffect(() => {
    if (quote) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_QUOTES_KEY, JSON.stringify(quote));
        setLoading(false);
      }
    }
  }, [quote]);

  return (
    <div className={styles.container}>
      <div className={styles.quoteBody}>
        {isLoading && !quote ? (
          <Loading color={color} />
        ) : (
          <>
            <h1 style={{ color }}>Random Quote Machine</h1>
            {quote ? (
              quote.map((q) =>
                isLoading ? (
                  <Loading key={q.author} color={color} />
                ) : (
                  <div key={q.author} className={styles.quoteBody}>
                    <p className={styles.quote} style={{ color }}>
                      {`"${q.quote}"`}
                    </p>
                    <p className={styles.author} style={{ color }}>
                      {q.author}
                    </p>
                  </div>
                )
              )
            ) : (
              <p className={styles.quote} style={{ color }}>
                Request a quote!
              </p>
            )}

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
