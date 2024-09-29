import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Wrapper} from '../../components/reuseables';
import {Text} from '../../components/reuseables';
import {FAB} from 'react-native-paper';
import CreateButton from '../../components/svgs/CreateButton';
import {Colors} from '../../constants';

const Home = () => {
  return (
    <Wrapper>
      <CreateButton onPress={() => {}} style={styles.fab} />
    </Wrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
