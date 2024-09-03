import {
  COUNTDOWN_DURATION,
  LOCAL_STORAGE_QUOTES_KEY,
} from '@/constants/index';
import axios from 'axios';
import randomColor from 'randomcolor';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../styles/index.module.css';

const fetchNewQuote = async (setQuote, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get('/api/proxy');
    setQuote(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};

export default function App() {
  const [quote, setQuote] = useState(null);
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(null);
  const intervalRef = useRef(null);

  const startCountDown = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCount((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;

          return null;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const getNewQuote = useCallback(() => {
    setCount(COUNTDOWN_DURATION);
    fetchNewQuote(setQuote, setLoading);
    setColor(randomColor());
  }, []);

  // Handle localStorage and initial quote loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Make sure this code only runs on the client
      const storedQuote = localStorage.getItem(LOCAL_STORAGE_QUOTES_KEY);

      if (storedQuote) {
        setQuote(JSON.parse(storedQuote));
        setColor(randomColor());
        setLoading(false);
        return;
      }

      // Fetch a new quote on initial load if not storedQuote
      getNewQuote();
    }
  }, [getNewQuote]);

  // Handle updating localStorage
  useEffect(() => {
    if (quote) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_QUOTES_KEY, JSON.stringify(quote));
      }
    }
  }, [quote]);

  useEffect(() => {
    if (count === null && intervalRef) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (count === COUNTDOWN_DURATION) {
      startCountDown();
    }
  }, [count]);

  return (
    <div className={styles.container}>
      {loading ? (
        <p className={styles.loading} style={{ color }}>
          Loading...
        </p>
      ) : (
        <>
          <h1 style={{ color }}>Random Quote Machine</h1>

          {quote ? (
            quote.map((q) => (
              <div className={styles.quoteBody} key={q.author}>
                <p className={styles.quote} style={{ color }}>
                  {`"${q.quote}"`}
                </p>
                <p className={styles.author} style={{ color }}>
                  {q.author}
                </p>
              </div>
            ))
          ) : (
            <div className={styles.quoteBody}>
              <p className={styles.quote} style={{ color }}>
                Request a quote!
              </p>
            </div>
          )}

          <button
            type="button"
            className={`${styles.btn} ${count ? styles.disabled : ''}`}
            style={{ color }}
            onClick={() => {
              if (count) return;
              getNewQuote();
            }}
          >
            {count ? `request a new quote in (${count})` : 'new quote'}
          </button>
        </>
      )}
    </div>
  );
}
