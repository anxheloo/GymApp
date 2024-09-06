import React from 'react';
import {FlatList, StyleSheet, View, Dimensions} from 'react-native';
import StoryComponent from './StoryComponent';
import {stories} from '../helper/exportedFunction';

const windowHeight = Dimensions.get('window').height;

const Feed: React.FC = () => {
  // const {datas, isLoading, error, refetch} = UseFetch();

  // if (isLoading) {
  //   return (
  //     <>
  //       <ActivityIndicator size="large" style={styles.loading} />
  //     </>
  //   );
  // }

  // if (error) {
  //   return (
  //     <>
  //       <Text style={styles.item}>Error fetching data: {error.message}</Text>
  //     </>
  //   );
  // }

  return (
    <View style={styles.container}>
      <FlatList
        // refreshing={isLoading}
        // onRefresh={refetch}
        decelerationRate="fast"
        snapToInterval={windowHeight - 25}
        snapToAlignment="start"
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        // data={datas}
        data={stories}
        contentContainerStyle={styles.flatlistContainer}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          // <Workout details={item} ref={resetWorkoutRef} />
          <StoryComponent stories={item.stories} />
        )}
        // onViewableItemsChanged={onViewableItemsChanged}
        // onScroll={onViewableItemsChanged}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  flatlistContainer: {},
});

export default Feed;
