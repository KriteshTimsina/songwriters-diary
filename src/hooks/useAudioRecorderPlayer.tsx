import React, {useEffect, useRef, useState} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {AudioHookReturn} from '../interfaces/songs';

const useAudioRecorderPlayer = (): AudioHookReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [recordedUri, setRecordedUri] = useState<string | null>(null);

  const audioRecorderPlayer = useRef(new AudioRecorderPlayer());

  useEffect(() => {
    return () => {
      if (isRecording) {
        audioRecorderPlayer.current.stopRecorder();
      }
      if (isPlaying) {
        audioRecorderPlayer.current.stopPlayer();
      }
    };
  }, [isRecording, isPlaying]);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
          return true;
        } else {
          console.log('All required permissions not granted');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const onStartRecord = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Error',
        'Please grant the required permissions to record audio.',
      );
      return;
    }

    try {
      const uri = await audioRecorderPlayer.current.startRecorder();
      audioRecorderPlayer.current.addRecordBackListener(e => {
        setRecordTime(
          audioRecorderPlayer.current.mmssss(Math.floor(e.currentPosition)),
        );
      });
      setIsRecording(true);
      setRecordedUri(uri);
      console.log('Recording started', uri);
    } catch (error) {
      console.error('Failed to start recording', error);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const onStopRecord = async () => {
    if (!isRecording) return;

    try {
      const result = await audioRecorderPlayer.current.stopRecorder();
      audioRecorderPlayer.current.removeRecordBackListener();
      setIsRecording(false);
      setRecordTime('00:00:00');
      console.log('Recording stopped', result);
    } catch (error) {
      console.error('Failed to stop recording', error);
      Alert.alert('Error', 'Failed to stop recording. Please try again.');
    }
  };

  const onStartPlay = async () => {
    if (!recordedUri) {
      Alert.alert('Error', 'No recorded audio to play.');
      return;
    }

    try {
      console.log('onStartPlay');
      const msg = await audioRecorderPlayer.current.startPlayer(recordedUri);
      audioRecorderPlayer.current.addPlayBackListener(e => {
        if (e.currentPosition === e.duration) {
          audioRecorderPlayer.current.stopPlayer();
          setIsPlaying(false);
        }
        setPlayTime(
          audioRecorderPlayer.current.mmssss(Math.floor(e.currentPosition)),
        );
        setDuration(audioRecorderPlayer.current.mmssss(Math.floor(e.duration)));
      });
      setIsPlaying(true);
      console.log(msg);
    } catch (error) {
      console.error('Failed to start playback', error);
      Alert.alert(
        'Error',
        'Failed to play the recorded audio. Please try again.',
      );
    }
  };

  const onPausePlay = async () => {
    try {
      await audioRecorderPlayer.current.pausePlayer();
      setIsPlaying(false);
    } catch (error) {
      console.error('Failed to pause playback', error);
      Alert.alert('Error', 'Failed to pause the audio. Please try again.');
    }
  };

  const onStopPlay = async () => {
    try {
      console.log('onStopPlay');
      await audioRecorderPlayer.current.stopPlayer();
      audioRecorderPlayer.current.removePlayBackListener();
      setIsPlaying(false);
      setPlayTime('00:00:00');
    } catch (error) {
      console.error('Failed to stop playback', error);
      Alert.alert('Error', 'Failed to stop the audio. Please try again.');
    }
  };
  return {
    recordOptions: {
      recordTime,
      recordedUri,
      isRecording,
      playTime,
      duration,
      isPlaying,
    },
    onStartRecord,
    onStopRecord,
    onStartPlay,
    onPausePlay,
    onStopPlay,
    setRecordedUri,
    setDuration,
  };
};

export default useAudioRecorderPlayer;
