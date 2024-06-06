import React from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const App = () => {
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
          <Text style={styles.carouselText}>IMG - Carrossel</Text>
          {/* Implement the image carousel here */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nosso Objetivo</Text>
          <Text style={styles.sectionText}>
            Informar o trabalhador sobre as normas, regulamentos, história e edificação da tão famosa CLT (Consolidação das Leis do Trabalho), e como o operário médio pode fazer uso desse importante regulamento.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.card}>Definição</Text>
          <Text style={styles.card}>História</Text>
          <Text style={styles.card}>Reformas</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Criadores</Text>
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
    backgroundColor: '#2C2F4A',
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
    marginTop: 35,
  },
  menuIcon: {
    width: 40,
    height: 30,
    marginLeft: 315,
  },
  carousel: {
    height: 200,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselText: {
    fontSize: 18,
    color: '#000',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#fff',
  },
  card: {
    backgroundColor: '#3C4164',
    padding: 20,
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
    marginTop: 20,
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
