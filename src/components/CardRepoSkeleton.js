import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AZURE, GRAY4} from '../styles/Colors';

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
        <SkeletonPlaceholder backgroundColor={GRAY4}>
          <View style={styles.repoTitle} />
          <View style={styles.repoDesc} />
        </SkeletonPlaceholder>
        <View style={styles.cardRepoFooter}>
          <SkeletonPlaceholder backgroundColor={GRAY4}>
            <View style={styles.repoLang} />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder backgroundColor={GRAY4}>
            <View style={styles.repoDate} />
          </SkeletonPlaceholder>
        </View>
      </View>
      <View style={styles.cardRepo}>
        <SkeletonPlaceholder backgroundColor={GRAY4}>
          <View style={styles.repoTitle} />
          <View style={styles.repoDesc} />
        </SkeletonPlaceholder>
        <View style={styles.cardRepoFooter}>
          <SkeletonPlaceholder backgroundColor={GRAY4}>
            <View style={styles.repoLang} />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder backgroundColor={GRAY4}>
            <View style={styles.repoDate} />
          </SkeletonPlaceholder>
        </View>
      </View>
    </>
  );
};

export default CardRepoSkeleton;

const styles = StyleSheet.create({
  wrapperTitle: {marginBottom: 10, marginHorizontal: 6, marginTop: 20},
  txtSection: {
    height: 25,
    width: 100,
    marginTop: 20,
    marginBottom: 10,
  },
  cardRepo: {
    padding: 15,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 20,
    marginHorizontal: 6,
    backgroundColor: AZURE,
  },
  cardRepoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  repoTitle: {width: width / 2, height: 20},
  repoDesc: {width: width / 1.5, height: 15, marginVertical: 20},
  repoLang: {width: 100, height: 20},
  repoDate: {width: 150, height: 20},
});
