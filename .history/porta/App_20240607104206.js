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
        <View style={styles.menuSeparator}></View>
        <TouchableOpacity style={styles.menuButton} onPress={() => openWebPage('https://example.com/page1')}>
          <Text style={styles.menuButtonText}>Página 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => openWebPage('https://example.com/page2')}>
          <Text style={styles.menuButtonText}>Página 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => openWebPage('https://example.com/page3')}>
          <Text style={styles.menuButtonText}>Página 3</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContent}>
          <Text>{modalContent}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  header: {
    height: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    tintColor: '#FFF'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  carousel: {
    height: 200,
  },
  carouselImage: {
    width: screenWidth,
    height: 200,
    resizeMode: 'cover',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#000',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  sectionSeparator: {
    height: 2,
    backgroundColor: '#000',
    marginVertical: 10,
    marginHorizontal: 50,
  },
  sectionText2: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  creators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  creator: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  creatorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  creatorName: {
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle3: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  sectionSeparator3: {
    height: 2,
    backgroundColor: '#000',
    marginVertical: 10,
    marginHorizontal: 50,
  },
  sectionText3: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  sectionSeparator4: {
    height: 2,
    backgroundColor: '#000',
    marginVertical: 10,
    marginHorizontal: 50,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  iconTextContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#000'
  },
  footerText: {
    marginTop: 5,
    fontSize: 16,
  },
  footerNote: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  fottext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
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
    right: 0,
    bottom: 0,
    width: screenWidth * 0.75,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 1000,
    padding: 20,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuSeparator: {
    height: 2,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  menuButton: {
    paddingVertical: 10,
  },
  menuButtonText: {
    fontSize: 18,
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 20,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardBackgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default App;
