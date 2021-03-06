import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {WHITE} from '../styles/Colors';

const Button = ({disabled, style, onPress, textButton}) => {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={style}>
      <Text style={styles.txtButton}>{textButton}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  txtButton: {
    color: WHITE,
    letterSpacing: 1,
    fontSize: 16,
  },
});
