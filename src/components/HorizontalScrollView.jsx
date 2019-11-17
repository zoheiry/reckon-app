import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

const HorizontalScrollView = ({ children, style, ...props }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={[styles.wrapper, style]}
    contentContainerStyle={styles.contentContainer}
    {...props}
  >
    {children}
  </ScrollView>
);

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 0,
    paddingHorizontal: 10,
    width: Dimensions.get('window').width, // bypasses the horizontal padding on the parent
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  }
});

HorizontalScrollView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HorizontalScrollView;