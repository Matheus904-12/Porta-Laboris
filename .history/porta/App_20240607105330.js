import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Image, FlatList, Dimensions, Animated, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';

const { width: screenWidth } = Dimensions.get('window');

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCreatorIndex, setCurrentCreatorIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const translateX = useRef(new Animated.Value(screenWidth)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: screenWidth,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: screenWidth * 0.25,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const carouselData = [
    { id: '1', image: require('./assets/image1.png') },
    { id: '2', image: require('./assets/image2.png') },
    { id: '3', image: require('./assets/image3.png') }
  ];

  const creatorsData = [
    { id: '1', image: require('./assets/edgar.jpg'), name: 'Edgar Feitoza De Almeida' },
    { id: '2', image: require('./assets/matheus.jpg'), name: 'Matheus Lucindo dos Santos' },
    { id: '3', image: require('./assets/luiss.png'), name: 'Luiz Henrique Barbosa Dias' },
    { id: '4', image: require('./assets/image1.png'), name: 'Luis' },
    { id: '5', image: require('./assets/kaua.jpg'), name: 'Kauã Santos de Lima' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCreatorIndex((prevIndex) => (prevIndex + 1) % creatorsData.length);
    }, 3000); // Change creator every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openWebPage = (url) => {
    Linking.openURL(url);
    toggleMenu();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={toggleMenu}>
            <Image source={require('./assets/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
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
          <TouchableOpacity onPress={() => openModal('animation')} style={styles.card}>
            <Image source={require('./assets/defini2.png')} style={styles.cardBackgroundImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('history')} style={styles.card}>
            <Image source={require('./assets/historia2.png')} style={styles.cardBackgroundImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('reforms')} style={styles.card}>
            <Image source={require('./assets/reform.png')} style={styles.cardBackgroundImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle2}>Criadores</Text>
          <View style={styles.sectionSeparator}></View>
          <Text style={styles.sectionText2}>Equipe que contribuiu com a produção do aplicativo.</Text>
          <View style={styles.creators}>
            {creatorsData.map((creator, index) => (
              index === currentCreatorIndex && (
                <Animatable.View
                  key={creator.id}
                  animation="bounceIn"
                  duration={1500}
                  style={styles.creator}
                >
                  <Image source={creator.image} style={styles.creatorImage} />
                  <Text style={styles.creatorName}>{creator.name}</Text>
                </Animatable.View>
              )
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle3}>Fale conosco</Text>
          <View style={styles.sectionSeparator3}></View>
          <Text style={styles.sectionText3}>Preencha os Campos abaixo para entrar em contato conosco!</Text>
          <TextInput style={styles.input} placeholder="Nome" />
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} placeholder="Seu telefone (opicional)" keyboardType="numeric" />
          <TextInput style={[styles.input, styles.messageInput]} placeholder="Mensagem" multiline />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionSeparator4}></View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => openModal('Telefone: (11) 99999-9999')} style={styles.iconTextContainer}>
            <Image source={require('./assets/fone.png')} style={styles.icon} />
            <Text style={styles.footerText}>Telefone</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('Email: networkdev2010@gmail.com')} style={styles.iconTextContainer}>
            <Image source={require('./assets/email.png')} style={styles.icon} />
            <Text style={styles.footerText}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('Endereço: R. Francisco A Zeiler, 20 - Ferraz de Vasconcelos - SP,')} style={styles.iconTextContainer}>
            <Image source={require('./assets/corp.png')} style={styles.icon} />
            <Text style={styles.footerText}>Endereço</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerNote}>
          <Text style={styles.fottext}>2024 - Porta Laboris</Text>
          <Text style={styles.fottext}>Política de Privacidade - Política de Cookies</Text>
        </View>
      </ScrollView>

      {menuVisible && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <TouchableOpacity style={styles.overlayTouchable} onPress={toggleMenu} />
        </Animated.View>
      )}

      <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
        <Text style={styles.menuTitle}>Menu</Text>
        <TouchableOpacity onPress={() => openWebPage('https://www.google.com')}>
          <Text style={styles.menuItem}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openWebPage('https://www.facebook.com')}>
          <Text style={styles.menuItem}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openWebPage('https://www.instagram.com')}>
          <Text style={styles.menuItem}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openWebPage('https://www.twitter.com')}>
          <Text style={styles.menuItem}>Twitter</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalContent}</Text>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    height: 60,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  carousel: {
    height: 200,
    marginBottom: 20,
  },
  carouselImage: {
    width: screenWidth - 40,
    height: 200,
    borderRadius: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#2c3e50',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    marginBottom: 10,
  },
  cardBackgroundImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  sectionTitle2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2980b9',
    textAlign: 'center',
  },
  sectionSeparator: {
    height: 2,
    backgroundColor: '#2980b9',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  sectionText2: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  creators: {
    alignItems: 'center',
  },
  creator: {
    alignItems: 'center',
  },
  creatorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle3: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#27ae60',
    textAlign: 'center',
  },
  sectionSeparator3: {
    height: 2,
    backgroundColor: '#27ae60',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  sectionText3: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  messageInput: {
    height: 100,
  },
  button: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#2c3e50',
  },
  iconTextContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  footerNote: {
    padding: 10,
    backgroundColor: '#34495e',
    alignItems: 'center',
  },
  fottext: {
    color: '#fff',
    fontSize: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouchable: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: screenWidth * 0.75,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 12,
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#2980b9',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
