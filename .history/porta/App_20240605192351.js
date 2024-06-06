import React from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const App = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Porta Laboris</Text>
        {/* Add menu icon here if needed */}
      </View>
      
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
        <Text style={styles.footerText}>Telefone</Text>
        <Text style={styles.footerText}>Email</Text>
        <Text style={styles.footerText}>Endereço</Text>
      </View>

      <View style={styles.footerNote}>
        <Text style={styles.footerNoteText}>2024 - Porta Laboris</Text>
        <Text style={styles.footerNoteText}>Política de Privacidade - Política de Cookies</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2F4A',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  carousel: {
    height: 200,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    height: 200,
  },
  carouselImage: {
    width: viewportWidth,
    height: 200,
  },
  carouselText: {
    fontSize: 18,
    color: '#000',
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 10,
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
  creatorImage: {
    width: 80,
    height: 80,
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
  footerText: {
    color: '#fff',
  },
  footerNote: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2C2F4A',
  },
  footerNoteText: {
    color: '#fff',
  },
});

export default App;
