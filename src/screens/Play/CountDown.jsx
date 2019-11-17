import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

import Wrapper from '../../components/Wrapper';

const INITIAL_COUNT = 3;
const COUNT_TIMER = 1000;

const CountDown = ({ onFinish = () => null }) => {
  const [count, setCount] = useState(INITIAL_COUNT);

  const decrementCount = () => {
    if (count === 1) {
      onFinish();
    } else {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    setTimeout(decrementCount, COUNT_TIMER);
  }, [count]);

  return (
    <Wrapper style={styles.wrapper}>
      <Text style={styles.count}>{count}</Text>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  count: {
    fontFamily: 'numpty-regular',
    fontSize: 60,
  },
});

CountDown.propTypes = {
  onFinish: PropTypes.func,
};

export default CountDown;