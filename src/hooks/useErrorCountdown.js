import { useEffect, useState } from 'react';
import { useInterval } from 'react-use';

import { COUNTDOWN_DELAY, COUNTDOWN_DURATION } from '@/constants/index';

/**
 * Initializes variables for countdown feature
 * @returns {Object} - An object with current count, setter for count, and boolean indicating if the countdown is running
 * @property {number} count - The current count
 * @property {Function} setCount - Setter for the count
 * @property {boolean} isRunning - Is the countdown running?
 * @property {Function} setRunning - Setter for the boolean
 */
const useInitializeCountdown = () => {
  const [count, setCount] = useState(COUNTDOWN_DURATION);
  const [isRunning, setRunning] = useState(false);

  return {
    count,
    setCount,
    isRunning,
    setRunning,
  };
};

/**
 * Starts the countdown
 * @param {Function} setRunning - Setter for the boolean indicating if the countdown is running
 * @param {Function} setCount - Setter for the count
 */
const startCountdown = (setRunning, setCount) => {
  setRunning(true);
  setCount(COUNTDOWN_DURATION);
};

/**
 * Stops the countdown
 * @param {Function} setRunning - Setter for the boolean indicating if the countdown is running
 */
const stopCountdown = (setRunning) => {
  setRunning(false);
};

/**
 * Starts a countdown when isFetching is true, and stops it when the countdown is at 0
 * @param {boolean} isFetching - Whether the data is currently fetching
 * @returns {Object} - An object with the count and a boolean indicating if the countdown is running
 * @property {number} count - The current count
 * @property {boolean} isRunning - Is the countdown running?
 */
const useErrorCountdown = (isFetching) => {
  const { count, setCount, isRunning, setRunning } = useInitializeCountdown();
  const delay = COUNTDOWN_DELAY;

  useInterval(
    () => {
      setCount(count - 1);
    },
    isRunning ? delay : null
  );

  useEffect(() => {
    if (isFetching) {
      startCountdown(setRunning, setCount);
    }
  }, [isFetching, setRunning, setCount]);

  useEffect(() => {
    if (count === 0) {
      stopCountdown(setRunning);
    }
  }, [count, setRunning]);

  return {
    count,
    isRunning,
  };
};

export default useErrorCountdown;
