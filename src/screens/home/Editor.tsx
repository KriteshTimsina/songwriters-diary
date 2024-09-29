import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../navigation/HomeStack';
import {Wrapper} from '../../components/reuseables';
import TextInput from '../../components/reuseables/TextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type EditorScreenProps = StackScreenProps<HomeStackParamsList, 'Editor'>;

const Editor = ({navigation, route}: EditorScreenProps) => {
  const {song} = route.params || {};
  return (
    <Wrapper>
      <KeyboardAwareScrollView>
        <TextInput value={song?.title} />
        <Text>{route.params?.song.content}</Text>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

export default Editor;

const styles = StyleSheet.create({});
