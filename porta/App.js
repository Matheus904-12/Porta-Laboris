// App.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

const CustomHeader = ({ title, navigation }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const CarouselImages = () => {
  const images = [
    { uri: 'https://via.placeholder.com/400x200', title: 'IMG - Carrossel 1' },
    { uri: 'https://via.placeholder.com/400x200', title: 'IMG - Carrossel 2' },
    { uri: 'https://via.placeholder.com/400x200', title: 'IMG - Carrossel 3' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Text style={styles.carouselText}>{item.title}</Text>
    </View>
  );

  return (
    <Carousel
      data={images}
      renderItem={renderItem}
      sliderWidth={400}
      itemWidth={400}
    />
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Porta Laboris" navigation={navigation} />
      <CarouselImages />
      <View style={styles.objectiveContainer}>
        <Text style={styles.objectiveTitle}>Nosso Objetivo</Text>
        <Text style={styles.objectiveText}>
          Informar o trabalhador sobre as normas, regulamentos, história e definição da tão famosa CLT (Consolidação das Leis do Trabalho), e como o operário médio pode fazer uso desse importante regulamento.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252843',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#252843',
  },
  menuButton: {
    padding: 5,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 200,
    borderRadius: 10,
  },
  carouselText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontSize: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  objectiveContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  objectiveTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#252843',
  },
  objectiveText: {
    fontSize: 16,
    color: '#252843',
  },
});
