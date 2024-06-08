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

      {menuVisible && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <TouchableOpacity style={styles.overlayTouchable} onPress={toggleMenu} />
        </Animated.View>
      )}
      <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
        <Text style={styles.menuTitle}>Menu</Text>
        <View style={styles.menuSeparator} />
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Contact</Text>
        </TouchableOpacity>
      </Animated.View>

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
          <TextInput style={styles.input} placeholder="Seu telefone (opicional)" />
          <TextInput style={styles.input} placeholder="Mensagem" multiline />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionSeparator4}></View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => openModal('Telefone: (11) 1234-5678')} style={styles.iconTextContainer}>
            <Image source={require('./assets/fone.png')} style={styles.icon} />
            <Text style={styles.footerText}>Telefone</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('Email: contato@portalaboris.com')} style={styles.iconTextContainer}>
            <Image source={require('./assets/email.png')} style={styles.icon} />
            <Text style={styles.footerText}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('Endereço: Rua Exemplo, 123, São Paulo, SP')} style={styles.iconTextContainer}>
            <Image source={require('./assets/corp.png')} style={styles.icon} />
            <Text style={styles.footerText}>Endereço</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>
            © 2023 Porta Laboris. Todos os direitos reservados.
          </Text>
        </View>
      </ScrollView>

      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)} animationIn="zoomIn" animationOut="zoomOut">
        <View style={styles.modalContent}>
          <Text>{modalContent}</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#000', padding: 20, alignItems: 'center', justifyContent: 'center' },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  menuIcon: { width: 30, height: 30, tintColor: '#fff', marginRight: 10 },
  content: { padding: 20 },
  carousel: { marginBottom: 20 },
  carouselImage: { width: screenWidth - 40, height: 200, borderRadius: 10 },
  indicatorContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  indicator: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ddd', marginHorizontal: 5 },
  activeIndicator: { backgroundColor: '#333' },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  sectionText: { fontSize: 16, color: '#666' },
  card: { marginBottom: 10, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', elevation: 2 },
  cardBackgroundImage: { width: '100%', height: 150, resizeMode: 'cover' },
  creators: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  creator: { alignItems: 'center', margin: 10 },
  creatorImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  creatorName: { fontSize: 14, fontWeight: 'bold' },
  input: { backgroundColor: '#f1f1f1', padding: 10, borderRadius: 10, marginVertical: 10 },
  button: { backgroundColor: '#000', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  iconTextContainer: { alignItems: 'center' },
  icon: { width: 30, height: 30, marginBottom: 5 },
  footerText: { fontSize: 14, fontWeight: 'bold' },
  footerNote: { alignItems: 'center', padding: 20 },
  footerNoteText: { fontSize: 14, color: '#aaa' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  overlayTouchable: { flex: 1 },
  menu: { position: 'absolute', top: 0, left: 0, bottom: 0, width: screenWidth * 0.75, backgroundColor: '#fff', padding: 20 },
  menuTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  menuSeparator: { height: 1, backgroundColor: '#ccc', marginVertical: 10 },
  menuButton: { padding: 15, borderRadius: 10, backgroundColor: '#f1f1f1', marginVertical: 5 },
  menuButtonText: { fontSize: 16, fontWeight: 'bold' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10 }
});

export default App;
