import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {NoteControlsProps} from '../../interfaces/songs';

const NoteControls = ({saveNote}: NoteControlsProps) => {
  return (
    <View>
      <Button onPress={saveNote}>Save</Button>
    </View>
  );
};

export default NoteControls;

const styles = StyleSheet.create({});
