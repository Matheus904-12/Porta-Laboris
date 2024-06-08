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
          toValue: screenWidth * 0.75,
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

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const openWebPage = (url) => {
    Linking.openURL(url);
    toggleMenu();
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={require('./assets/menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Porta Laboris</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Your existing content here */}
      </ScrollView>

      {/* Menu */}
      <Animatable.View
        style={[styles.menu, { transform: [{ translateX }] }]}
        duration={300}
        useNativeDriver
      >
        <Text style={styles.menuTitle}>Menu</Text>
        <View style={styles.menuSeparator} />
        <TouchableOpacity onPress={() => openWebPage('https://www.example.com/page1')} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Página 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openWebPage('https://www.example.com/page2')} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Página 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openWebPage('https://www.example.com/page3')} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Página 3</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Overlay */}
      {menuVisible && (
        <Animated.View
          style={[styles.overlay, { opacity: overlayOpacity }]}
          onStartShouldSetResponder={() => {
            toggleMenu();
            return true;
          }}
        />
      )}

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
          {/* Your modal content here */}
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
  },
  sectionContent: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  creatorContainer: {
    alignItems: 'center',
  },
  creatorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  creatorName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  menu: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: screenWidth * 0.75,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingLeft: 20,
    zIndex: 999,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  menuButton: {
    marginBottom: 20,
  },
  menuButtonText: {
    fontSize: 18,
    color: '#000',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
});

export default App;
