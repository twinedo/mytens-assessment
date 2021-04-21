import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AZURE, GRAY4} from '../styles/Colors';

const {width} = Dimensions.get('window');

const CardProfileSkeleton = () => {
  return (
    <>
      <View style={styles.wrapperTitle}>
        <SkeletonPlaceholder backgroundColor={GRAY4}>
          <View style={styles.txtSection} />
        </SkeletonPlaceholder>
      </View>
      <View style={styles.cardProfile}>
        <View style={styles.cardProfileSection}>
          <SkeletonPlaceholder backgroundColor={GRAY4}>
            <View style={styles.imgProfile} />
          </SkeletonPlaceholder>
          <View style={styles.wrapperName}>
            <SkeletonPlaceholder backgroundColor={GRAY4}>
              <View style={styles.txtFullname} />
              <View style={styles.txtUsername} />
            </SkeletonPlaceholder>
          </View>
        </View>
        <View style={styles.cardFollWrapper}>
          <View style={styles.cardFollSection}>
            <SkeletonPlaceholder backgroundColor={GRAY4}>
              <View style={styles.txtTitleFoll} />
              <View style={styles.txtValueFoll} />
            </SkeletonPlaceholder>
          </View>
          <View style={styles.cardFollSection}>
            <SkeletonPlaceholder backgroundColor={GRAY4}>
              <View style={styles.txtTitleFoll} />
              <View style={styles.txtValueFoll} />
            </SkeletonPlaceholder>
          </View>
        </View>
      </View>
    </>
  );
};

export default CardProfileSkeleton;

const styles = StyleSheet.create({
  cardProfile: {
    borderRadius: 10,
    padding: 4,
    backgroundColor: AZURE,
    marginHorizontal: 6,
    elevation: 10,
  },
  cardProfileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgProfile: {
    width: 70,
    height: 70,
    borderRadius: 10,
    margin: 4,
  },
  cardFollWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8,
  },
  cardFollSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperTitle: {marginBottom: 10, marginHorizontal: 6, borderRadius: 4},
  wrapperName: {flex: 1, padding: 4},
  txtSection: {
    height: 25,
    width: 100,
    marginTop: 20,
    marginBottom: 10,
  },
  txtFullname: {width: width / 2, height: 20, marginBottom: 10},
  txtUsername: {width: width / 3, height: 15},
  txtTitleFoll: {width: 50, height: 20, alignSelf: 'center', marginBottom: 10},
  txtValueFoll: {width: 30, height: 15, alignSelf: 'center'},
});
