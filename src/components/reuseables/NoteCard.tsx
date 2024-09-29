import {Pressable, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {Songs} from '../../interfaces/songs';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../navigation/HomeStack';
import {Colors} from '../../constants';
import {Text} from '.';

const NoteCard = ({item}: {item: Songs}) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamsList>>();
  return (
    <Pressable
      onPress={() => navigation.navigate('Editor', {song: item})}
      style={[styles.card, {backgroundColor: item.color ?? '#D9E8FC'}]}>
      <Text size="lg" weight="700">
        {item.title}
      </Text>
      <Text color={Colors.text.base}>{item.content}</Text>
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
});
