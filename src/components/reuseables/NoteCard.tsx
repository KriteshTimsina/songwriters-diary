import {Alert, Pressable, StyleSheet, View} from 'react-native';
import React, {memo, useState} from 'react';
import {Songs} from '../../interfaces/songs';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../navigation/HomeStack';
import {Colors} from '../../constants';
import {Text} from '.';
import Trash from '../svgs/Trash';
import useNotes from '../../hooks/useNotes';

const NoteCard = ({item}: {item: Songs}) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamsList>>();
  const [showDelete, setShowDelete] = useState(false);
  const {deleteNote} = useNotes();

  const onLongPress = () => setShowDelete(true);

  const onDeleteNote = (id: number) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      {
        text: 'Cancel',
        onPress: () => setShowDelete(false),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          deleteNote(id);
          setShowDelete(false);
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={() => navigation.navigate('Editor', {song: item})}
      style={[styles.card, {backgroundColor: item.color ?? '#D9E8FC'}]}>
      <Text size="lg" weight="700">
        {item.title}
      </Text>
      <Text color={Colors.text.base}>{item.content}</Text>

      {showDelete && (
        <Pressable onPress={onDeleteNote} style={styles.delete}>
          <Trash />
        </Pressable>
      )}
    </Pressable>
  );
};

export default memo(NoteCard);

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 10,
    margin: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  delete: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
  },
});
