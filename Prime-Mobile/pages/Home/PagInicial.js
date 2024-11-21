// src/Pages/Home/Home.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';

const Home = () => {
  // Lista de matérias
  const materias = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Inglês'];

  return (
    <View style={styles.container}>
      <Header />
      {/* Adicionamos um espaçamento para compensar o Header absoluto */}
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
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  carouselContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  carouselItem: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#FFEC5C',
    borderRadius: 8,
    maxHeight: 40,
    marginTop: 30,
  },
  carouselText: {
    fontSize: 16,
    color: '#000',
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
