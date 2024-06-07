import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Image, FlatList, Dimensions, Animated, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';

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

      <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
        <TouchableOpacity onPress={() => openWebPage('https://github.com/MatheusLucindo')} style={styles.sidebarItem}>
          <Text style={styles.sidebarItemText}>GitHub Matheus</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openWebPage('https://github.com/LuissHenr')} style={styles.sidebarItem}>
          <Text style={styles.sidebarItemText}>GitHub Luis</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openWebPage('https://www.linkedin.com/in/matheuslucindo/')} style={styles.sidebarItem}>
          <Text style={styles.sidebarItemText}>LinkedIn Matheus</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openWebPage('https://www.linkedin.com/in/luis-henrique-barbosa-dias/')} style={styles.sidebarItem}>
          <Text style={styles.sidebarItemText}>LinkedIn Luis</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={closeModal}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropTransitionOutTiming={0}
        style={styles.modal}
      >
        <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalContent}</Text>
          <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#0019A6',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#333',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0019A6',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardBackgroundImage: {
    width: '100%',
    height: 150,
  },
  creators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#0019A6',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#0019A6',
  },
  iconTextContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
  footerNote: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0019A6',
  },
  fottext: {
    color: '#fff',
    fontSize: 12,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '75%',
    backgroundColor: '#fff',
    zIndex: 2,
  },
  sidebarItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sidebarItemText: {
    fontSize: 16,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 12,
  },
  modalButton: {
    backgroundColor: '#0019A6',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});

export default App;
