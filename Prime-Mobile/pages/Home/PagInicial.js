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
      {/* Conteúdo principal */}
      <View style={styles.mainContent}>
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
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Mantém Header no topo e Footer no final
  },
  mainContent: {
    flex: 1, // Preenche o espaço restante
    padding: 20,
    backgroundColor: '#E0F7FA', // Cor de fundo do Main
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
});

export default Home;
