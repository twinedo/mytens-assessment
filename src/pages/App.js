import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Keyboard,
} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import {GRAY1, AZURE, GRAY3, RED, WHITE, GRAY2} from '../styles/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {randColorLight} from '../services/utils/constants';
import {GetProfile, GetRepo} from '../services/handler/GetData';
import moment from 'moment';
import Lodash from 'lodash';
import CardProfileSkeleton from '../components/CardProfileSkeleton';

const {width} = Dimensions.get('window');

const App = () => {
  const [searchTxt, setSearchTxt] = useState('');

  const [dataProfile, setDataProfile] = useState(null);
  const [repoList, setRepoList] = useState([]);

  const [fetchingProfile, setFetchingProfile] = useState(false);

  const onSearchPress = async () => {
    Keyboard.dismiss();
    setFetchingProfile(true);
    await GetProfile(searchTxt)
      .then(res => {
        console.log('res profile', res);
        if (res.status === 200) {
          setDataProfile(res.data);
          setFetchingProfile(false);
        }
      })
      .catch(err => {
        console.log('err get profilr', err);
        if (err.status === 404) {
          setDataProfile('nodata');
        }
        setFetchingProfile(false);
      });

    await GetRepo(searchTxt)
      .then(res => {
        console.log('res repo', res);
        if (res.status === 200) {
          const sortDate = Lodash.orderBy(res.data, 'updated_at', 'desc');
          console.log('sortDate', sortDate);
          setRepoList(sortDate);
        }
      })
      .catch(err => {
        console.log('err get repo', err);
        if (err.status === 404) {
          setRepoList('nodata');
        }
      });
  };

  return (
    <>
      <StatusBar
        backgroundColor="#00000000"
        translucent
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <Text style={styles.txtTitle}>MyTens Assessment</Text>
        <Input
          value={searchTxt}
          onChangeText={setSearchTxt}
          onClear={() => {
            setSearchTxt('');
            setDataProfile(null);
            setRepoList([]);
          }}
        />
        <Button
          disabled={searchTxt === '' ? true : false}
          style={styles.btnSearch(searchTxt)}
          textButton="Search"
          onPress={onSearchPress}
        />
        {dataProfile === 'nodata' && repoList === 'nodata' ? (
          <View style={styles.wrapperImg}>
            <Image
              source={require('../assets/no_data.jpg')}
              style={styles.imgNotFound}
            />
          </View>
        ) : dataProfile !== null && repoList.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {fetchingProfile && dataProfile === null ? (
              <CardProfileSkeleton />
            ) : dataProfile !== null && fetchingProfile === false ? (
              <>
                <Text style={styles.txtSection}>Profile</Text>
                <View style={styles.cardProfile}>
                  <View style={styles.cardProfileSection}>
                    <Image
                      source={{
                        uri: dataProfile.avatar_url,
                      }}
                      style={styles.imgProfile}
                    />
                    <View style={{flex: 1, padding: 4}}>
                      <Text style={styles.txtName}>{dataProfile.name}</Text>
                      <Text style={styles.txtUsername}>
                        {dataProfile.login}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cardFollWrapper}>
                    <View style={styles.cardFollSection}>
                      <Text style={styles.txtUsername}>Followers</Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {dataProfile.followers}
                      </Text>
                    </View>
                    <View style={styles.cardFollSection}>
                      <Text style={styles.txtUsername}>Following</Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {dataProfile.following}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            ) : null}
            {repoList.length > 0 ? (
              <>
                <Text style={styles.txtSection}>Repositories</Text>

                {repoList.map(item => {
                  return (
                    <LinearGradient
                      key={item.id}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={[WHITE, '#' + randColorLight()]}
                      style={styles.cardRepo}>
                      <View style={{flex: 1, margin: 15}}>
                        <Text style={styles.txtTitleCardRepo}>{item.name}</Text>
                        <Text
                          style={styles.txtDescCardRepo}
                          numberOfLines={2}
                          ellipsizeMode="tail">
                          {item.description === null ? '-' : item.description}
                        </Text>
                        <View style={styles.footerCardRepo}>
                          <Text style={{fontWeight: 'bold', flex: 1}}>
                            {item.language}
                          </Text>
                          <Text style={{fontWeight: 'bold', flex: 1.5}}>
                            Updated on{' '}
                            {moment(item.updated_at).format('MMM DD, YYYY')}
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  );
                })}
              </>
            ) : null}
          </ScrollView>
        ) : (
          <View style={styles.wrapperImg}>
            <Image
              source={require('../assets/github.png')}
              style={styles.imgGithub}
            />
            <Text style={{color: GRAY2, fontWeight: 'bold'}}>
              api.github.com
            </Text>
          </View>
        )}
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
    marginHorizontal: 6,
  },
  imgProfile: {
    width: 70,
    height: 70,
    borderRadius: 10,
    margin: 4,
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
    marginHorizontal: 6,
  },
  txtTitleCardRepo: {fontWeight: 'bold', fontSize: 18},
  txtDescCardRepo: {color: GRAY2, marginVertical: 4},
  footerCardRepo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  wrapperImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgGithub: {
    width: width / 2,
    height: width / 2,
    resizeMode: 'cover',
    opacity: 0.3,
  },
  imgNotFound: {
    width: width - 35,
    height: width,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default App;
