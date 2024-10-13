import {
  Alert,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../navigation/HomeStack';
import {Wrapper, TextInput} from '../../components/reuseables';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SongInput, Songs} from '../../interfaces/songs';
import useNotes from '../../hooks/useNotes';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import useKeyboardVisible from '../../hooks/useKeyboardVisible';
import {NoteControls, Recording} from '../../components/reuseables';
import {AntDesign} from '../../components/icons';
import {Colors} from '../../constants';
import {Modal, Portal} from 'react-native-paper';
import {backgrounds} from '../../constants/Colors';

type EditorScreenProps = StackScreenProps<HomeStackParamsList, 'Editor'>;

const initialValue = {
  title: '',
  content: '',
  duration: '00:00:00',
  clip: '',
  theme: backgrounds[0],
};
const contentHeight = Dimensions.get('screen').height / 2;

const Editor = ({navigation, route}: EditorScreenProps) => {
  const {song} = route.params || {};
  const [note, setNote] = useState<SongInput>(song ?? initialValue);
  const {onSaveNote} = useNotes();
  const isKeyboardVisible = useKeyboardVisible();
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  const audioRecorderPlayer = useRef(new AudioRecorderPlayer());

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={{marginRight: 20}} onPress={openThemeModal}>
          <AntDesign name="skin" size={25} color={Colors.primary.main} />
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: note.theme ?? backgrounds[0],
      },
    });
  }, [note.theme]);

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

  useEffect(() => {
    if (note) {
      setRecordedUri(note.clip);
      setDuration(note.duration);
    }
  }, []);

  const onChange = async (key: keyof SongInput, value: string) => {
    setNote((prev: SongInput) => ({
      ...prev,
      [key]: value,
    }));
  };

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

  const saveNote = async () => {
    try {
      if (note.content === '' || note.title === '') {
        return;
      }
      const noteData = {...note, clip: recordedUri ?? '', duration: duration};
      const saved = await onSaveNote(noteData);
      if (saved) {
        setNote(saved);
        ToastAndroid.showWithGravity(
          'Saved',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } catch (error) {}
  };

  const openThemeModal = () => setThemeModalVisible(true);
  const closeThemeModal = () => setThemeModalVisible(false);

  const onChangeTheme = (background: string) => {
    setThemeModalVisible(false);
    setNote({...note, theme: background});
  };

  return (
    <Wrapper style={{backgroundColor: note?.theme ?? backgrounds[0]}}>
      <KeyboardAwareScrollView>
        <TextInput
          autoFocus
          placeholder="Your title here"
          onChangeText={text => onChange('title', text)}
          style={styles.title}
          value={note?.title}
        />
        <TextInput
          placeholder="Your song here"
          onChangeText={text => onChange('content', text)}
          multiline
          style={styles.content}
          value={note?.content}
        />

        <View style={styles.recordings}>
          {recordedUri && (
            <Recording
              onStartPlay={onStartPlay}
              onStopPlay={onStopPlay}
              isPlaying={isPlaying}
              // key={record}
              duration={duration}
              playTime={playTime}
              records={recordedUri}
            />
          )}
        </View>
      </KeyboardAwareScrollView>

      {isKeyboardVisible && (
        <NoteControls
          isRecording={isRecording}
          onStopRecord={onStopRecord}
          onStartRecord={onStartRecord}
          saveNote={saveNote}
        />
      )}

      <Portal>
        <Modal
          visible={themeModalVisible}
          onDismiss={closeThemeModal}
          contentContainerStyle={styles.modalContainer}>
          <Text>Choose color background</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 20,
            }}>
            {backgrounds.map(background => {
              return (
                <TouchableOpacity
                  onPress={() => onChangeTheme(background)}
                  key={background}
                  style={[styles.colorContainer, {backgroundColor: background}]}
                />
              );
            })}
          </View>
        </Modal>
      </Portal>
    </Wrapper>
  );
};

export default Editor;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 18,
    flex: 1,
    textAlignVertical: 'top',
    // backgroundColor: 'pink',
    minHeight: contentHeight,
  },
  recordings: {
    gap: 10,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    backgroundColor: Colors.background,
    right: 0,
    left: 0,
    elevation: 10,
    alignItems: 'center',
    gap: 10,
  },
  colorContainer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    elevation: 5,
  },
});
