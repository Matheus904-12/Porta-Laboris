import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Dimensions, Animated, Linking } from 'react-native';
import Modal from 'react-native-modal';

const { width: screenWidth } = Dimensions.get('window');

const App = () => {
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
        <View style={styles.section}>
          <TouchableOpacity onPress={() => openModal('Conteúdo do Modal 1')} style={styles.card}>
            <Image source={require('./assets/defini2.png')} style={styles.cardBackgroundImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('Conteúdo do Modal 2')} style={styles.card}>
            <Image source={require('./assets/historia2.png')} style={styles.cardBackgroundImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('Conteúdo do Modal 3')} style={styles.card}>
            <Image source={require('./assets/reform.png')} style={styles.cardBackgroundImage} />
          </TouchableOpacity>
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
    backgroundColor: '#FFF',
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
    tintColor: '#FFF',
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
  section: {
    padding: 20,
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
});

export default App;
