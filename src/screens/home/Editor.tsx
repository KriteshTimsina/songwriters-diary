import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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

type EditorScreenProps = StackScreenProps<HomeStackParamsList, 'Editor'>;

const initialValue = {
  title: '',
  content: '',
};

const Editor = ({navigation, route}: EditorScreenProps) => {
  const {song} = route.params || {};
  const [note, setNote] = useState<SongInput>(song ?? initialValue);
  const {onSaveNote} = useNotes();

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
      </KeyboardAwareScrollView>

      <Button onPress={saveNote}>Save</Button>
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
  },
});
