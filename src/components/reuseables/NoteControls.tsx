import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {NoteControlsProps} from '../../interfaces/songs';

const NoteControls = ({
  saveNote,
  onStartRecord,
  isRecording,
  onStopRecord,
}: NoteControlsProps) => {
  return (
    <View style={styles.container}>
      {isRecording ? (
        <Button onPress={onStopRecord} mode="contained-tonal">
          Stop
        </Button>
      ) : (
        <Button onPress={onStartRecord} mode="contained-tonal">
          Record
        </Button>
      )}

      <Button onPress={saveNote}>Save</Button>
    </View>
  );
};

export default NoteControls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
