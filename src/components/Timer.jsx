import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { formatCount } from '../utils/Time';

const Timer = ({ startCount = 35, onFinish = () => null }) => {
  const [count, setCount] = useState(startCount);
  let timeout;

  const decrementCounter = () => {
    if (count === 0) {
      onFinish();
    } else {
      setCount(count - 1);
    }
  }

  useEffect(() => {
    timeout = setTimeout(decrementCounter, 1000);
    return () => {
      clearTimeout(timeout);
    }
  }, [count]);

  const formattedCount = formatCount(count);

  return (
    <Text style={[styles.count, count <= 10 ? styles.timeRunningOut : '']}>
      {formattedCount}
    </Text>
  );
};

const styles = StyleSheet.create({
  count: {
    fontFamily: 'digital',
    fontSize: 90,
  },
  timeRunningOut: {
    color: '#ff6d4b',
  },
});

Timer.propTypes = {
  onFinish: PropTypes.func,
  startCount: PropTypes.number,
};

export default Timer;