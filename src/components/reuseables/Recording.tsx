import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {RecordOptions} from '../../interfaces/songs';
import {Text} from '.';
import {Colors} from '../../constants';
import {Ioni, Octi} from '../icons';
import Waveform from '../svgs/WaveForm';

const Recording = ({records}: RecordOptions) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.playContainer}>
        <Ioni name="play-sharp" size={20} />
      </Pressable>
      <View style={styles.waveForm}>
        <Waveform strokeColor={Colors.primary.main} />
        <Waveform strokeColor={Colors.primary.main} />
      </View>
      <Octi color={Colors.primary.main} size={20} name="trash" />
    </View>
  );
};

export default Recording;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.light,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  playContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  waveForm: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
