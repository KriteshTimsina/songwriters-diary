import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Wrapper} from '../../components/reuseables';

const Todo = () => {
  return (
    <Wrapper>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text>Coming Soon</Text>
      </View>
    </Wrapper>
  );
};

export default Todo;

const styles = StyleSheet.create({});
