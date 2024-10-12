import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {NoteCard, TextInput, Wrapper} from '../../components/reuseables';
import {Text} from '../../components/reuseables';
import CreateButton from '../../components/svgs/CreateButton';
import {Colors} from '../../constants';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../navigation/HomeStack';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Songs} from '../../interfaces/songs';
import useNotes from '../../hooks/useNotes';
import EmptyNotes from '../../components/svgs/EmptyNotes';
import Searchbar from '../../components/reuseables/Searchbar';

const Home = () => {
  const {notes, loadSongNotes} = useNotes();
  const navigation = useNavigation<StackNavigationProp<HomeStackParamsList>>();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [searchText, setSearchText] = useState('');

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

  const onChangeText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const memoizedNotes = useMemo(() => {
    if (!searchText) return notes;
    const filteredNotes = notes.filter(
      item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.content.toLowerCase().includes(searchText.toLowerCase()),
    );
    return filteredNotes;
  }, [searchText, notes]);

  const onClear = () => {
    setSearchText('');
    getNotes();
  };

  return (
    <Wrapper>
      {notes.length > 0 && (
        <Searchbar
          onClear={onClear}
          onSearch={getNotes}
          searchText={searchText}
          onChangeText={onChangeText}
        />
      )}
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
        data={memoizedNotes || notes}
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
