// App.js

import 'react-native-gesture-handler'; // Importar no topo do arquivo
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { AppRegistry } from 'react-native';

const Drawer = createDrawerNavigator();

const CustomHeader = ({ title, navigation }) => {
  return (
    <Animatable.View animation="bounceIn" style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
    </Animatable.View>
  );
};

const CarouselImages = () => {
  const { width } = Dimensions.get('window');
  const images = [
    { uri: 'https://via.placeholder.com/400x200', title: 'IMG - Carrossel 1' },
    { uri: 'https://via.placeholder.com/400x200', title: 'IMG - Carrossel 2' },
    { uri: 'https://via.placeholder.com/400x200', title: 'IMG - Carrossel 3' },
  ];

  const renderItem = ({ item }) => (
    <Animatable.View animation="bounceIn" style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Text style={styles.carouselText}>{item.title}</Text>
    </Animatable.View>
  );

  return (
    <Carousel
      data={images}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={width - 40}
    />
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CustomHeader title="Porta Laboris" navigation={navigation} />
        <CarouselImages />
        <Animatable.View animation="bounceIn" style={styles.objectiveContainer}>
          <Text style={styles.objectiveTitle}>Nosso Objetivo</Text>
          <Text style={styles.objectiveText}>
            Informar o trabalhador sobre as normas, regulamentos, história e definição da tão famosa CLT (Consolidação das Leis do Trabalho), e como o operário médio pode fazer uso desse importante regulamento.
          </Text>
        </Animatable.View>
        <Animatable.View animation="bounceIn" style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Definição</Text>
          <Image source={{ uri: 'https://via.placeholder.com/400x200' }} style={styles.sectionImage} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>História</Text>
          <Image source={{ uri: 'https://via.placeholder.com/400x200' }} style={styles.sectionImage} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Reformas</Text>
          <Image source={{ uri: 'https://via.placeholder.com/400x200' }} style={styles.sectionImage} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" style={styles.creatorsContainer}>
          <Text style={styles.creatorsTitle}>Criadores</Text>
          <View style={styles.creatorsRow}>
            <View style={styles.creatorCircle} />
            <View style={styles.creatorCircle} />
            <View style={styles.creatorCircle} />
          </View>
          <View style={styles.creatorsRow}>
            <View style={styles.creatorCircle} />
            <View style={styles.creatorCircle} />
          </View>
        </Animatable.View>
        <Animatable.View animation="bounceIn" style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Fale conosco</Text>
          <Text style={styles.contactSubtitle}>Preencha os Campos abaixo para entrar em contato conosco!</Text>
          <TextInput style={styles.input} placeholder="Nome" />
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} placeholder="Seu telefone (opcional)" />
          <TextInput style={styles.input} placeholder="Mensagem" multiline />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Enviar</Text>
          </TouchableOpacity>
        </Animatable.View>
        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Feather name="phone" size={24} color="white" />
            <Text style={styles.footerText}>Telefone</Text>
          </View>
          <View style={styles.footerRow}>
            <Feather name="mail" size={24} color="white" />
            <Text style={styles.footerText}>Email</Text>
          </View>
          <View style={styles.footerRow}>
            <Feather name="map-pin" size={24} color="white" />
            <Text style={styles.footerText}>Endereço</Text>
          </View>
        </View>
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>2024 - Porta Laboris</Text>
          <Text style={styles.footerText}>Política de Privacidade - Política de Cookies</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

// Certifique-se de registrar o componente principal
AppRegistry.registerComponent('main', () => App);

export default App;

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
    width: '100%',
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
  sectionContainer: {
    padding: 20,
    backgroundColor: '#252843',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  sectionImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  creatorsContainer: {
    padding: 20,
    backgroundColor: '#252843',
    alignItems: 'center',
  },
  creatorsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  creatorsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  creatorCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  contactContainer: {
    padding: 20,
    backgroundColor: '#252843',
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  contactSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#ff5722',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#252843',
    paddingVertical: 20,
  },
  footerRow: {
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    marginTop: 5,
  },
  copyright: {
    backgroundColor: '#252843',
    padding: 20,
    alignItems: 'center',
  },
  copyrightText: {
    color: '#fff',
    marginBottom: 5,
  },
});
