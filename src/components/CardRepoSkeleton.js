import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AZURE, GRAY4} from '../styles/Colors';
import Spacer from './Spacer';

const {width} = Dimensions.get('window');

const CardRepoSkeleton = () => {
  return (
    <>
      <View style={styles.wrapperTitle}>
        <SkeletonPlaceholder backgroundColor={GRAY4}>
          <View style={styles.txtSection} />
        </SkeletonPlaceholder>
      </View>
      <View style={styles.cardRepo}>
        <View style={{width: width / 2, height: 20}} />
        <View style={{width: width / 1.5, height: 15}} />
        <View style={{width: width / 1.5, height: 15}} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: width / 1, height: 15}} />
          <View style={{width: width / 1.5, height: 15}} />
        </View>
      </View>
    </>
  );
};

export default CardRepoSkeleton;

const styles = StyleSheet.create({
  wrapperTitle: {marginBottom: 10, marginHorizontal: 6},
  txtSection: {
    height: 25,
    width: 100,
    marginTop: 20,
    marginBottom: 10,
  },
  cardRepo: {
    paddingVertical: 4,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 20,
    marginHorizontal: 6,
  },
});
