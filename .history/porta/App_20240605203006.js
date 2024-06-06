import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselData = [
    { id: '1', image: require('./assets/image1.png') },
    { id: '2', image: require('./assets/image1.png') },
    { id: '3', image: require('./assets/image1.png') }
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={require('./assets/menu.png')} style={styles.menuIcon} />
          <Text style={styles.headerTitle}>Porta Laboris</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.carousel}>
          <FlatList
            data={carouselData}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
              const newIndex = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
              setCurrentIndex(newIndex);
            }}
            renderItem={({ item }) => (
              <Image source={item.image} style={styles.carouselImage} />
            )}
          />
          <View style={styles.indicatorContainer}>
            {carouselData.map((_, index) => (
              <View
                key={index}
                style={[styles.indicator, index === currentIndex ? styles.activeIndicator : null]}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nosso Objetivo</Text>
          <Text style={styles.sectionText}>
            Informar o trabalhador sobre as normas, regulamentos, história e edificação da tão famosa CLT (Consolidação das Leis do Trabalho), e como o operário médio pode fazer uso desse importante regulamento.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.card}>
            <Image source={require('./assets/defini2.png')} style={styles.cardBackgroundImage} />
          </View>
          <View style={styles.card}>
            <Image source={require('./assets/historia2.png')} style={styles.cardBackgroundImage} />
          </View>
          <View style={styles.card}>
            <Image source={require('./assets/reform.png')} style={styles.cardBackgroundImage} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle2}>Criadores</Text>
          <View style={styles.sectionSeparator}></View>
          <Text style={styles.sectionText}>Equipe que contribuiu com a produção do aplicativo.</Text>
          <View style={styles.creators}>
            {/* Add creator images here */}
            <View style={styles.creatorPlaceholder}></View>
            <View style={styles.creatorPlaceholder}></View>
            <View style={styles.creatorPlaceholder}></View>
            <View style={styles.creatorPlaceholder}></View>
            <View style={styles.creatorPlaceholder}></View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fale conosco</Text>
          <View style={styles.sectionSeparator}></View>
          <TextInput style={styles.input} placeholder="Nome" />
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} placeholder="Seu telefone (opicional)" />
          <TextInput style={styles.input} placeholder="Mensagem" multiline />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text>Telefone</Text>
          <Text>Email</Text>
          <Text>Endereço</Text>
        </View>

        <View style={styles.footerNote}>
          <Text>2024 - Porta Laboris</Text>
          <Text>Política de Privacidade - Política de Cookies</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252843',
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  headerTitle: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 15,
  },
  menuIcon: {
    width: 40,
    height: 40,
    marginLeft: 325,
    top: 58,
  },
  carousel: {
    height: 280,
  },
  carouselImage: {
    width: screenWidth, // Ensure the image takes the full width
    height: '100%', // Take full height of the container
    resizeMode: 'cover',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#FF6F00',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center', // Centraliza o texto
    fontWeight: 'bold',
    top: 25,
  },
  sectionSeparator: {
    borderBottomColor: 'white', // Adiciona uma linha branca abaixo do título
    borderBottomWidth: 1,
    marginBottom: 10, // Espaçamento abaixo da linha
    top: 35,
    width: 160,
    alignSelf: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center', // Centraliza o texto
    top: 50,
  },
  card: {
    top: 45,
    marginVertical: 10,
    borderRadius: 10,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  creators: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop:   80,
  },
  creatorPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#555',
    borderRadius: 40,
    margin: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF6F00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  footer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2C2F4A',
  },
  footerNote: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2C2F4A',
  },
});

export default App;

