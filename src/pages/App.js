import React, {useState} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import {GRAY1, AZURE, GRAY3, RED, WHITE, GRAY2} from '../styles/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {randColorLight} from '../services/utils/constants';

const App = () => {
  const [searchTxt, setSearchTxt] = useState('');

  return (
    <>
      <StatusBar
        backgroundColor="#00000000"
        translucent
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <Text style={styles.txtTitle}>Dummy Dummy</Text>
        <Input
          value={searchTxt}
          onChangeText={setSearchTxt}
          onClear={() => setSearchTxt('')}
        />
        <Button
          disabled={searchTxt === '' ? true : false}
          style={styles.btnSearch(searchTxt)}
          textButton="Search"
          onPress={() => alert('test')}
        />
        <Text style={styles.txtSection}>Profile</Text>
        <View style={styles.cardProfile}>
          <View style={styles.cardProfileSection}>
            <Image
              source={{
                uri: 'https://avatars.githubusercontent.com/u/50164031?v=4',
              }}
              style={{width: 70, height: 70, borderRadius: 10, margin: 4}}
            />
            <View style={{flex: 1, padding: 4}}>
              <Text style={styles.txtName}>Twin Edo Nugraha</Text>
              <Text style={styles.txtUsername}>twinedo</Text>
            </View>
          </View>
          <View style={styles.cardFollWrapper}>
            <View style={styles.cardFollSection}>
              <Text style={styles.txtUsername}>Followers</Text>
              <Text style={{fontWeight: 'bold'}}>3</Text>
            </View>
            <View style={styles.cardFollSection}>
              <Text style={styles.txtUsername}>Following</Text>
              <Text style={{fontWeight: 'bold'}}>3</Text>
            </View>
          </View>
        </View>
        <Text style={styles.txtSection}>Repositories</Text>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[WHITE, '#' + randColorLight()]}
          style={styles.cardRepo}>
          <View style={{flex: 1, margin: 15}}>
            <Text style={styles.txtTitleCardRepo}>PROJECT 1</Text>
            <Text
              style={styles.txtDescCardRepo}
              numberOfLines={2}
              ellipsizeMode="tail">
              Description awjndkawjdn ajdakwjd ajkdbawkdb adjbakdb kadnkjab
              awdbnaw ahwbdjwa jwahbdajw djwhdbawhdb
            </Text>
            <View style={styles.footerCardRepo}>
              <Text style={{fontWeight: 'bold', flex: 1}}>Javascript</Text>
              <Text style={{fontWeight: 'bold', flex: 1}}>
                Updated on Oct 12, 2020
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: GRAY1,
  },
  txtTitle: {
    textAlign: 'center',
    marginVertical: 12,
    fontWeight: 'bold',
    fontSize: 20,
  },
  btnSearch: txt => ({
    height: 35,
    backgroundColor: RED,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    opacity: txt === '' ? 0.5 : 1,
  }),
  cardProfile: {
    borderRadius: 10,
    padding: 4,
    backgroundColor: AZURE,
    elevation: 10,
  },
  txtSection: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  txtName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtUsername: {
    fontSize: 16,
    color: GRAY3,
  },
  cardProfileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardFollWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginVertical: 4,
  },
  cardFollSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRepo: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  txtTitleCardRepo: {fontWeight: 'bold', fontSize: 18},
  txtDescCardRepo: {color: GRAY2, marginVertical: 4},
  footerCardRepo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default App;
