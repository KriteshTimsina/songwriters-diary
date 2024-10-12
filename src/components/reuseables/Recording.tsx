import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {RecordOptions} from '../../interfaces/songs';
import {Text} from '.';
import {Colors} from '../../constants';
import {Ioni, Octi} from '../icons';
import Waveform from '../svgs/WaveForm';
import CText from './Text';

const Recording = ({
  records,
  onStartPlay,
  onStopPlay,
  isPlaying,
  playTime,
  duration,
}: RecordOptions) => {
  return (
    <View style={styles.container}>
      <View style={styles.playbackContainer}>
        {isPlaying ? (
          <Pressable onPress={onStopPlay} style={styles.playContainer}>
            <Ioni color={Colors.primary.main} name="pause" size={20} />
          </Pressable>
        ) : (
          <Pressable onPress={onStartPlay} style={styles.playContainer}>
            <Ioni color={Colors.primary.main} name="play-sharp" size={20} />
          </Pressable>
        )}
        <CText color={Colors.primary.main} weight="600" size="sm">
          {isPlaying ? `${playTime}` : `${duration}`}
        </CText>
      </View>
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
  playbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
