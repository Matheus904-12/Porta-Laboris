import React from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel from 'expo-carousel';

const images = [
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
];

const CarouselImages = () => {
  return (
    <View style={styles.container}>
      <Carousel
        layout="default"
        data={images}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
        sliderWidth={400}
        itemWidth={300}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CarouselImages;