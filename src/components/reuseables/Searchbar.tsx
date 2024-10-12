import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants';
import TextInput from './TextInput';
import {Ioni} from '../icons';
import {SearchbarProps} from '../../interfaces/songs';

const Searchbar = ({
  onClear,
  onSearch,
  searchText,
  onChangeText,
}: SearchbarProps) => {
  return (
    <View style={styles.searchContainer}>
      <Ioni name="search-outline" size={25} color={Colors.text.base} />
      <TextInput
        style={styles.input}
        value={searchText}
        placeholder="Search for songs..."
        onChangeText={text => onChangeText(text)}
        placeholderTextColor={Colors.text.base}
      />
      {searchText.length > 0 && (
        <Ioni
          name="close-outline"
          size={25}
          color={Colors.text.base}
          onPress={onClear}
        />
      )}
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    gap: 10,
    borderColor: Colors.text.base,
    borderWidth: 0.8,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    color: Colors.text.base,
    flex: 1,
  },
});
