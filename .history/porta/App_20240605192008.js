import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth } = Dimensions.get('window');

const carouselItems = [
  { id: 1, title: 'Image 1', image: 'https://via.placeholder.com/400x200' },
  { id: 2, title: 'Image 2', image: 'https://via.placeholder.com/400x200' },
  { id: 3, title: 'Image 3', image: 'https://via.placeholder.com/400x200' },
];

const App = () => {
  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
      <Text style={styles.carouselText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Porta Laboris</Text>
      <Carousel
        data={carouselItems}
        renderItem={renderItem}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        loop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2F4A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    height: 200,
  },
  carouselImage: {
    width: viewportWidth,
    height: 200,
  },
  carouselText: {
    fontSize: 18,
    color: '#000',
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 10,
  },
});

export default App;
