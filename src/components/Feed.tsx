import React, {useCallback, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  // ActivityIndicator,
  // Text,
} from 'react-native';
import StoryComponent from './StoryComponent';
import {stories} from '../helper/exportedFunction';
// import UseFetch from '../utils/useFetch';

const windowHeight = Dimensions.get('window').height;

const Feed: React.FC = () => {
  // const {datas, isLoading, error, refetch} = UseFetch();

  // if (isLoading) {
  //   return (
  //     <>
  //       <ActivityIndicator size="large" />
  //     </>
  //   );
  // }

  // if (error) {
  //   return (
  //     <>
  //       <Text>Error fetching data: {error.message}</Text>
  //     </>
  //   );
  // }

  const [visibleItemIndex, setVisibleItemIndex] = useState<number | null>(0);

  const flatListRef = useRef<FlatList<any> | null>(null);

  const scrollTo = (index: number) => {
    if (index < stories.length - 1) {
      flatListRef?.current?.scrollToIndex({index: index + 1});
    }
  };

  const onViewableItemsChanged = useCallback(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setVisibleItemIndex(viewableItems[0].index);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
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
        keyExtractor={({id}) => id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 50}}
        renderItem={({item, index}) => (
          <StoryComponent
            stories={item.items}
            scrollTo={() => scrollTo(index)}
            isVisible={index === visibleItemIndex}
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
