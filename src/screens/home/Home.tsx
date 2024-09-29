import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NoteCard, Wrapper} from '../../components/reuseables';
import {Text} from '../../components/reuseables';
import CreateButton from '../../components/svgs/CreateButton';
import {data} from '../../data';
import {Colors} from '../../constants';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../navigation/HomeStack';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Songs} from '../../interfaces/songs';
import useNotes from '../../hooks/useNotes';
import EmptyNotes from '../../components/svgs/EmptyNotes';

const Home = () => {
  const {notes, loadSongNotes} = useNotes();
  const navigation = useNavigation<StackNavigationProp<HomeStackParamsList>>();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getNotes();
    }
  }, [isFocused]);

  const getNotes = () => {
    setRefreshing(true);
    loadSongNotes();
    setRefreshing(false);
  };

  return (
    <Wrapper>
      <FlatList
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={getNotes}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <EmptyNotes />
            <Text
              style={{width: '80%', textAlign: 'center'}}
              size="xl"
              color={Colors.text.base}>
              Create Something Magical. Start Now
            </Text>
          </View>
        )}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        data={notes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <NoteCard item={item} />}
        numColumns={2}
      />
      <CreateButton
        onPress={() => navigation.navigate('Editor')}
        style={styles.fab}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    // paddingBottom: 100, // To provide space for the FAB at the bottom
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 20,
    flexDirection: 'column',
    marginTop: 50,
  },
});

export default Home;
