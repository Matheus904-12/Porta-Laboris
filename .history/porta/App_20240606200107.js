import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';

const { width: screenWidth } = Dimensions.get('window');

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCreatorIndex, setCurrentCreatorIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const carouselData = [
    { id: '1', image: require('./assets/image1.png') },
    { id: '2', image: require('./assets/image1.png') },
    { id: '3', image: require('./assets/image1.png') }
  ];

  const creatorsData = [
    { id: '1', image: require('./assets/image1.png'), name: 'Edgar Feitoza' },
    { id: '2', image: require('./assets/image1.png'), name: 'Matheus Lucindo' },
    { id: '3', image: require('./assets/image1.png'), name: 'Luiz Henrique' },
    { id: '4', image: require('./assets/image1.png'), name: 'Luis' },
    { id: '5', image: require('./assets/image1.png'), name: 'LimaZ' }
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
          <Text>2024 - Porta Laboris</Text>
          <Text>Política de Privacidade - Política de Cookies</Text>
        </View>
      </ScrollView>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        useNativeDriver={true}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropTransitionOutTiming={0}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalContent}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
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
    marginTop: 5,
  },
  menuIcon: {
    width: 40,
    height: 40,
    marginLeft: 325,
    top: 50,
  },
  carousel: {
    height: 280,
  },
  carouselImage: {
    width: screenWidth,
    height: '100%',
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
    textAlign: 'center',
    fontWeight: 'bold',
    top: 25,
  },
  sectionTitle2: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    top: 45,
  },
  sectionTitle3: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    top: 75,
  },
  sectionSeparator: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 10,
    top: 65,
    width: 160,
    alignSelf: 'center',
  },
  sectionSeparator3: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 10,
    top: 95,
    width: 160,
    alignSelf: 'center',
  },
  sectionSeparator4: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 10,
    top: 175,
    width: 600,
    alignSelf: 'center',
  },
  sectionText: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    top: 50,
  },
  sectionText2: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    top: 85,
  },
  sectionText3: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    top: 115,
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
    justifyContent: 'center',
    marginTop: 190,
  },
  creator: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  creatorImage: {
    width: 200,
    height: 200,
    backgroundColor: '#555',
    borderRadius: 100,
    marginBottom: 10,
  },
  creatorName: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    top: 150,
  },
  button: {
    backgroundColor: '#FF5C00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    top: 165,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 200,
  },
  footerNote: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  iconTextContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 42,
    height: 42,
  },
  footerText: {
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 17,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#FF5C00',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
