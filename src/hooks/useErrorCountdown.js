import { useEffect, useState } from 'react';
import { useInterval } from 'react-use';

import { COUNTDOWN_DURATION } from '@/constants/index';

const useErrorCountdown = (isFetching) => {
  const delay = 1000;
  const [count, setCount] = useState(COUNTDOWN_DURATION);
  const [isRunning, setRunning] = useState(false);

  useInterval(
    () => {
      setCount(count - 1);
    },
    isRunning ? delay : null
  );

  useEffect(() => {
    if (isFetching) {
      setCount(COUNTDOWN_DURATION);
      setRunning(true);
    }
  }, [isFetching]);

  useEffect(() => {
    if (count === 0) {
      setRunning(false);
    }
  }, [count]);

  return {
    count,
    isRunning,
  };
};

export default useErrorCountdown;
