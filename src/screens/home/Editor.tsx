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
import useAudioRecorderPlayer from '../../hooks/useAudioRecorderPlayer';

type EditorScreenProps = StackScreenProps<HomeStackParamsList, 'Editor'>;

const initialValue = {
  title: '',
  content: '',
  duration: '00:00:00',
  clip: '',
  theme: backgrounds[2],
};
const contentHeight = Dimensions.get('screen').height / 2;

const Editor = ({navigation, route}: EditorScreenProps) => {
  const {song} = route.params || {};
  const [note, setNote] = useState<SongInput>(song ?? initialValue);
  const {onSaveNote} = useNotes();
  const isKeyboardVisible = useKeyboardVisible();
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const {
    recordOptions: {
      duration,
      isPlaying,
      isRecording,
      playTime,
      recordTime,
      recordedUri,
    },
    onPausePlay,
    onStartPlay,
    onStartRecord,
    onStopPlay,
    onStopRecord,
    setDuration,
    setRecordedUri,
  } = useAudioRecorderPlayer();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={{marginRight: 20}} onPress={openThemeModal}>
          <AntDesign name="skin" size={25} color={Colors.primary.main} />
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: note.theme,
      },
    });
  }, [note.theme]);

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
    <Wrapper style={{backgroundColor: note?.theme}}>
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
          <View style={styles.colors}>
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
  colors: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
});
