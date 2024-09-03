import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import UseFetch from '../utils/useFetch';
import Workout from './Workout';

const windowHeight = Dimensions.get('window').height;

const Feed = () => {
  const {datas, isLoading, error, refetch} = UseFetch();

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  if (error) {
    return (
      <Text style={styles.item}>Error fetching data: {error.message}</Text>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        // refreshing={isLoading}
        // onRefresh={refetch}
        decelerationRate="fast"
        snapToInterval={windowHeight - 40 + 15}
        snapToAlignment="start"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistContainer}
        bounces={false}
        overScrollMode="never"
        data={datas}
        keyExtractor={({id}) => id}
        renderItem={({item}) => <Workout details={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 13,
  },

  flatlistContainer: {
    gap: 15,
  },
});

export default Feed;
