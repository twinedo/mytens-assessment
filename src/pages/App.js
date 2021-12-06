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

/* library */
import moment from 'moment';
import Lodash from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

/* services */
import {randColorLight} from '../services/utils/constants';
import {GetProfile, GetRepo} from '../services/handler/GetData';

/* component/style */
import Input from '../components/Input';
import Button from '../components/Button';
import CardRepoSkeleton from '../components/CardRepoSkeleton';
import CardProfileSkeleton from '../components/CardProfileSkeleton';
import {GRAY1, AZURE, GRAY3, RED, WHITE, GRAY2} from '../styles/Colors';

const {width} = Dimensions.get('window');

const App = () => {
  const [searchTxt, setSearchTxt] = useState('');

  const [dataProfile, setDataProfile] = useState(null);
  const [repoList, setRepoList] = useState([]);

  const [fetchingProfile, setFetchingProfile] = useState(false);

  const onSearchPress = () => {
    Keyboard.dismiss();
    setFetchingProfile(true);
    setTimeout(() => {
      GetProfile(searchTxt)
        .then(res => {
          // console.log('res profile', res);
          if (res.status === 200) {
            setDataProfile(res.data);
            setFetchingProfile(false);
          }
        })
        .catch(err => {
          // console.log('err get profilr', err);
          if (err.status === 404) {
            setDataProfile('nodata');
          }
          setFetchingProfile(false);
        });

      GetRepo(searchTxt)
        .then(res => {
          // console.log('res repo', res);
          if (res.status === 200) {
            const sortDate = Lodash.orderBy(res.data, 'updated_at', 'desc');
            console.log('sortDate', sortDate);
            setRepoList(sortDate);
          }
        })
        .catch(err => {
          // console.log('err get repo', err);
          if (err.status === 404) {
            setRepoList('nodata');
          }
        });
    }, 2000);
  };

  return (
    <>
      <StatusBar
        backgroundColor="#00000000"
        translucent
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <Text style={[styles.txtLargeBold, styles.txtTitle]}>
          Github Profile
        </Text>
        {/* <Text
          style={[
            styles.txtSmallBold,
            {textAlign: 'center', marginBottom: 20},
          ]}>
          twin edo nugraha
        </Text> */}
        <Input
          placeholder="Type Username Github here"
          value={searchTxt}
          onChangeText={setSearchTxt}
          onClear={() => {
            setSearchTxt('');
            setDataProfile(null);
            setRepoList([]);
            Keyboard.dismiss();
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
        ) : fetchingProfile ? (
          <>
            <CardProfileSkeleton />
            <CardRepoSkeleton />
          </>
        ) : dataProfile !== null && repoList.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Profile Info begin here */}
            <Text style={[styles.txtLargeBold, styles.txtSection]}>
              Profile
            </Text>
            <View style={styles.cardProfile}>
              <View style={styles.cardProfileSection}>
                <Image
                  source={{
                    uri: dataProfile.avatar_url,
                  }}
                  style={styles.imgProfile}
                />
                <View style={styles.viewName}>
                  <Text style={styles.txtMediumBold}>{dataProfile.name}</Text>
                  <Text style={styles.txtMediumGray}>{dataProfile.login}</Text>
                </View>
              </View>
              <View style={styles.cardFollWrapper}>
                <View style={styles.cardFollSection}>
                  <Text style={styles.txtMediumGray}>Followers</Text>
                  <Text style={styles.txtSmallBold}>
                    {dataProfile.followers}
                  </Text>
                </View>
                <View style={styles.cardFollSection}>
                  <Text style={styles.txtMediumGray}>Following</Text>
                  <Text style={styles.txtSmallBold}>
                    {dataProfile.following}
                  </Text>
                </View>
              </View>
            </View>
            {/* Profile Info end here */}

            {/* Repositories begin here */}
            <Text style={[styles.txtLargeBold, styles.txtSection]}>
              Repositories
            </Text>

            {repoList.map(item => {
              return (
                <LinearGradient
                  key={item.id}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[WHITE, '#' + randColorLight()]}
                  style={styles.cardRepo}>
                  <Text style={styles.txtMediumBold}>{item.name}</Text>
                  <Text
                    style={[styles.txtSmallGray, {marginVertical: 4}]}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item.description === null ? '-' : item.description}
                  </Text>
                  <View style={styles.footerCardRepo}>
                    <Text style={styles.txtSmallBold}>{item.language}</Text>
                    <Text style={styles.txtSmallBold}>
                      Updated on{' '}
                      {moment(item.updated_at).format('MMM DD, YYYY')}
                    </Text>
                  </View>
                </LinearGradient>
              );
            })}
            {/* Repositories end here */}
          </ScrollView>
        ) : (
          <View style={styles.wrapperImg}>
            <Image
              source={require('../assets/github.png')}
              style={styles.imgGithub}
            />
            <Text style={styles.txtGithub}>api.github.com</Text>
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
  viewName: {flex: 1, padding: 4},
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
    padding: 15,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 20,
    marginHorizontal: 6,
  },
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
  imgProfile: {
    width: 70,
    height: 70,
    borderRadius: 10,
    margin: 4,
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

  txtTitle: {
    textAlign: 'center',
    marginVertical: 12,
  },
  txtSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  txtLargeBold: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  txtMediumBold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  txtMediumGray: {
    fontSize: 16,
    color: GRAY3,
  },
  txtSmallGray: {
    color: GRAY3,
  },
  txtSmallBold: {
    fontWeight: 'bold',
  },
  txtGithub: {color: GRAY2, fontWeight: 'bold'},
});

export default App;
