import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GRAY2, WHITE} from '../styles/Colors';

const Input = ({value, onChangeText, onClear}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={25} color={GRAY2} />
      <TextInput
        placeholder="Type Username Github here"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      {value !== '' ? (
        <Ionicons name="close" size={25} color={GRAY2} onPress={onClear} />
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: WHITE,
  },
  input: {flex: 1},
});
