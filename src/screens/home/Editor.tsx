import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../navigation/HomeStack';
import {Wrapper, TextInput} from '../../components/reuseables';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Songs} from '../../interfaces/songs';

type EditorScreenProps = StackScreenProps<HomeStackParamsList, 'Editor'>;

type SongInput = Pick<Songs, 'title' | 'content'>;

const initialValue = {
  title: '',
  content: '',
};

const Editor = ({navigation, route}: EditorScreenProps) => {
  const {song} = route.params || {};
  const [note, setNote] = useState<SongInput>(song || initialValue);

  const onChange = (key: keyof SongInput, value: string) => {
    setNote((prev: SongInput) => ({
      ...prev,
      [key]: value,
    }));
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
