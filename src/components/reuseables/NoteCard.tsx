import {Alert, Pressable, StyleSheet, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {Songs} from '../../interfaces/songs';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../navigation/HomeStack';
import {Colors} from '../../constants';
import {Text} from '.';
import useNotes from '../../hooks/useNotes';
import {Feather, Ioni, Material} from '../icons';
import {Modal, Portal} from 'react-native-paper';

const NoteCard = ({item}: {item: Songs}) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamsList>>();
  const [showOptions, setShowOptions] = useState(false);
  const {deleteNote} = useNotes();

  useEffect(() => {
    return () => setShowOptions(false);
  }, []);

  const onDeleteNote = (id: number) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      {
        text: 'Cancel',
        onPress: () => setShowOptions(false),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          deleteNote(id);
          setShowOptions(false);
        },
        style: 'destructive',
      },
    ]);
  };

  const onLongPress = () => setShowOptions(true);
  const onDismiss = () => setShowOptions(false);

  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={() => navigation.navigate('Editor', {song: item})}
      style={[styles.card, {backgroundColor: item.theme ?? '#D9E8FC'}]}>
      <View style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={1} size="lg" weight="700">
          {item.title}
        </Text>
        {item.clip !== '' && <Material name="multitrack-audio" size={20} />}
      </View>
      {showOptions && (
        <Portal>
          <Modal
            key={item.id}
            visible={showOptions}
            onDismiss={onDismiss}
            contentContainerStyle={styles.modalContainer}>
            <Pressable style={styles.modalButton}>
              <Ioni size={25} name="lock-closed-outline" />
              <Text>Hide</Text>
            </Pressable>
            <Pressable style={styles.modalButton}>
              <Ioni size={25} name="lock-closed-outline" />
              <Text>Pin</Text>
            </Pressable>
            <Pressable style={styles.modalButton}>
              <Ioni size={25} name="lock-closed-outline" />
              <Text>Move to</Text>
            </Pressable>
            <Pressable
              onPress={() => onDeleteNote(item.id)}
              style={styles.modalButton}>
              <Feather size={25} name="trash" />
              <Text>Delete</Text>
            </Pressable>
          </Modal>
        </Portal>
      )}
      <Text numberOfLines={6} color={Colors.text.base}>
        {item.content}
      </Text>
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
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    backgroundColor: Colors.background,
    right: 0,
    left: 0,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modalButton: {
    alignItems: 'center',
    gap: 5,
  },
  title: {
    width: '80%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
