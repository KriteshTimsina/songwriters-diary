import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../navigation/HomeStack';
import {Wrapper, TextInput} from '../../components/reuseables';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SongInput, Songs} from '../../interfaces/songs';
import {saveNote} from '../../database/database';
import {Button} from 'react-native-paper';
import useNotes from '../../hooks/useNotes';
import {FontAwesome5} from '../../components/icons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Recording from '../../components/reuseables/Recording';
import useKeyboardVisible from '../../hooks/useKeyboardVisible';
import NoteControls from '../../components/reuseables/NoteControls';

type EditorScreenProps = StackScreenProps<HomeStackParamsList, 'Editor'>;

const initialValue = {
  title: '',
  content: '',
};
const contentHeight = Dimensions.get('screen').height / 2;

const Editor = ({navigation, route}: EditorScreenProps) => {
  const {song} = route.params || {};
  const [note, setNote] = useState<SongInput>(song ?? initialValue);
  const {onSaveNote} = useNotes();
  const isKeyboardVisible = useKeyboardVisible();

  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [audioPath, setAudioPath] = useState<string | null>(null);
  const [state, setState] = useState({isRecording: false, isPlaying: false});

  ////data/user/0/com.songwritersdiary/cache/sound.mp4

  console.log(audioPath, '|WHA');
  const onStartRecord = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      console.log('Recording started, file saved at:', result); // Check this log
      audioRecorderPlayer.addRecordBackListener(cb => {
        console.log(cb, 'K XA ');
      });
      setAudioPath(result); // Store the path of the recording
      setState({...state, isRecording: true});
    } catch (error) {
      console.error('Error while recording:', error);
    }
  };

  // Stop Recording
  const onStopRecord = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener(); // Ensure we remove the listener
      console.log(result, 'STOPPD');
      setState({...state, isRecording: false});
    } catch (error) {
      console.error('Error while stopping the recorder:', error);
    }
  };

  const onStartPlay = async () => {
    try {
      // Stop the player if it's already running
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();

      console.log('onStartPlay');
      const msg = await audioRecorderPlayer.startPlayer(audioPath);
      console.log(msg, 'Playing from:', audioPath);

      audioRecorderPlayer.addPlayBackListener(e => {
        console.log('Playing audio', e);
        return;
      });
    } catch (error) {
      console.error('Error while playing audio:', error);
    }
  };

  // Stop Playing Audio
  const onStopPlay = async () => {
    try {
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setState({...state, isPlaying: false});
      console.log('Stopped playing');
    } catch (error) {
      console.error('Error while stopping the player:', error);
    }
  };
  const onChange = async (key: keyof SongInput, value: string) => {
    if (value.trim() === '') return;
    setNote((prev: SongInput) => ({
      ...prev,
      [key]: value,
    }));
    // setTimeout(async () => {
    //   const {title, content} = note;
    //   console.log(title, content, 'NOTE');
    //   if (title && content) {
    //     const savedNote = await saveNote(note);
    //     console.log(savedNote, 'WHAT');
    //     if (savedNote) {
    //       ToastAndroid.showWithGravity(
    //         'Saved',
    //         ToastAndroid.SHORT,
    //         ToastAndroid.BOTTOM,
    //       );
    //     }
    //   }
    // }, 3000);
  };

  const saveNote = async () => {
    try {
      if (note.content === '' || note.title === '') {
        return;
      }
      const saved = await onSaveNote(note);
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

  return (
    <Wrapper>
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

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={[1]}
          renderItem={({item}) => <Recording records={item} />}
          contentContainerStyle={{gap: 10}}
        />
        {/* <Button onPress ={onStartPlay}>Play</Button> */}
      </KeyboardAwareScrollView>

      {isKeyboardVisible && <NoteControls saveNote={saveNote} />}
      {/* <View>
      {state.isRecording ? (
        <Pressable onPress={onStopRecord}>
          <FontAwesome5 size={25} name="stop" />
        </Pressable>
         ) : ( 
        <Button onPress={onStartRecord}>
          <FontAwesome5 size={25} name="microphone" />
        </Button>
        )} 
      </View> */}
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
});
