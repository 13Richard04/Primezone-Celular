// src/Pages/Home/Home.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  // Lista de matérias
  const materias = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Inglês'];

  return (
    <View style={styles.container}>
      <Header />
      {/* Adicionamos um espaçamento para compensar o Header absoluto */}
      <View style={styles.headerSpacer} />
      {/* Carrossel de matérias */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.carouselContainer}
      >
        {materias.map((materia, index) => (
          <View key={index} style={styles.carouselItem}>
            <Text style={styles.carouselText}>{materia}</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.text}>Conteúdo da Home Page</Text>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    wi
    backgroundColor: 'yellow',
  },
  headerSpacer: {
    height: 100, // Altura para compensar o Header (ajuste conforme o necessário)
  },
  carouselContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  carouselItem: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    maxHeight: 40,
    marginTop: 30,
    textAlign: 'center',
    alignContent: 'center',
  },
  carouselText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Home;
