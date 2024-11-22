import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { questions } from '../../components/Questions/questions';

const Home = () => {
  // Lista de matérias
  const materias = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Inglês'];

  return (
    <View style={styles.container}>
      <Header />
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

      {/* Container de questões com rolagem vertical */}
      <ScrollView
        contentContainerStyle={styles.questionsContainer}
        style={styles.questionsScroll}
      >
        {questions.map((item) => (
          <View key={item.id} style={styles.questionBox}>
            <View style={styles.questionHeader}>
              <Image source={item.imageSource} style={styles.profileImage} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <Text style={styles.questionText}>{item.question}</Text>
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
    backgroundColor: 'black',
    maxHeight: 80,
    height: 80,
  },
  carouselItem: {
    marginHorizontal: 10,
    padding: 8,
    backgroundColor: '#FFEC5C',
    borderRadius: 8,
    maxHeight: 40,
    marginTop: 20,  // Diminui o espaçamento superior do carrossel
  },
  carouselText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  questionsScroll: {
    flex: 1, // Impede que o ScrollView das perguntas afete o carrossel
  },
  questionsContainer: {
    paddingHorizontal: 10,
    backgroundColor: 'grey',
    paddingTop: 10,  // Garante que o conteúdo das perguntas comece próximo do topo
  },
  questionBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  questionText: {
    fontSize: 14,
    color: '#555',
  },
});

export default Home;
