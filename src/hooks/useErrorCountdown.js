import { useEffect, useState } from 'react';
import { useInterval } from 'react-use';

import {
  COUNTDOWN_DURATION,
  ERROR_COUNTDOWN_DURATION,
} from '@/constants/index';

export default function useErrorCountdown() {
  const delay = 1000;
  const [isRunning, setRunning] = useState(false);
  const [count, setCount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useInterval(
    () => {
      setCount(count - 1);
    },
    isRunning ? delay : null
  );

  useEffect(() => {
    if (count === 0) {
      setErrorMessage(null);
      setRunning(false);
    }
  }, [count]);

  const triggerSuccessCountdown = () => {
    setCount(COUNTDOWN_DURATION);
    setRunning(true);
  };

  const triggerErrorCountdown = (message) => {
    setErrorMessage(message);
    setCount(ERROR_COUNTDOWN_DURATION);
    setRunning(true);
  };

  return {
    count,
    isRunning,
    errorMessage,
    triggerSuccessCountdown,
    triggerErrorCountdown,
  };
}
