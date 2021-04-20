import React from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor="#00000000"
        translucent
        barStyle="light-content"
      />
      <View style={styles.container}>
        <Text style={styles.txtTitle}>MyTens Assesment</Text>
        <View style={styles.txtInput}>
          <TextInput placeholder="Type Username here" />
        </View>
        <Pressable style={styles.btnSearch}>
          <Text style={styles.txtSearch}>Search</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    marginTop: 10,
  },
  txtTitle: {
    textAlign: 'center',
    marginVertical: 12,
    fontWeight: 'bold',
    fontSize: 20,
  },
  txtInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
  },
  btnSearch: {
    height: 35,
    backgroundColor: 'red',
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  txtSearch: {
    fontWeight: '700',
    color: 'white',
  },
});

export default App;
