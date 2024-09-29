import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Wrapper} from '../../components/reuseables';
import {Text} from '../../components/reuseables';
import CreateButton from '../../components/svgs/CreateButton';
import {data} from '../../data';
import {Colors} from '../../constants';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../navigation/HomeStack';

type HomeStackProps = StackScreenProps<HomeStackParamsList, 'Home'>;

const Home = ({navigation}: HomeStackProps) => {
  return (
    <Wrapper>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={[styles.card, {backgroundColor: item.color}]}>
            <Text size="lg" weight="700">
              {item.title}
            </Text>
            <Text color={Colors.text.base}>{item.content}</Text>
          </View>
        )}
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
  card: {
    width: '48%', // To give spacing for two columns
    padding: 10,
    margin: 5,
    borderRadius: 6,
    alignSelf: 'flex-start', // Let each card expand based on its content
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
