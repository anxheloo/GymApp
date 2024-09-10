import React, {useCallback, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import StoryComponent from './StoryComponent';
import UseFetch from '../utils/useFetch';

const windowHeight = Dimensions.get('window').height;

const Feed: React.FC = () => {
  const [visibleItemIndex, setVisibleItemIndex] = useState<number | null>(0);
  const flatListRef = useRef<FlatList<any> | null>(null);
  const {datas, isLoading, error, refetch} = UseFetch();

  const scrollTo = (workoutIdx: number) => {
    console.log('This is workout index:', workoutIdx);
    if (workoutIdx < datas?.length - 1) {
      flatListRef?.current?.scrollToIndex({index: workoutIdx + 1});
    }
  };

  const onViewableItemsChanged = useCallback(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setVisibleItemIndex(viewableItems[0].index);
    }
  }, []);

  if (isLoading) {
    return (
      <>
        <ActivityIndicator size="large" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Text>Error fetching data: {error.message}</Text>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        refreshing={isLoading}
        onRefresh={refetch}
        decelerationRate="fast"
        snapToInterval={windowHeight}
        snapToAlignment="start"
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        data={datas}
        keyExtractor={({id}) => id}
        removeClippedSubviews={true}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 100}}
        onEndReached={() => console.log('Ready to fetch next items ')}
        renderItem={({item, index}) => (
          <StoryComponent
            stories={item}
            scrollTo={scrollTo}
            isVisible={index === visibleItemIndex}
            workoutIndex={index}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Feed;
