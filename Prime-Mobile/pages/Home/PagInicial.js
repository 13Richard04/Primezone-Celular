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
      
      {/* Envolve o ScrollView em uma View controlada */}
      <View style={styles.carouselWrapper}>
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
  },
  carouselWrapper: {
    maxHeight: 100, // Define a altura máxima do carrossel
    backgroundColor: '#054C69',
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  carouselContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  carouselItem: {
    marginHorizontal: 10,
    padding: 8,
    backgroundColor: 'rgba(217, 217, 217, 0.15)',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    height: 40, // Ajusta a altura dos itens do carrossel
    justifyContent: 'center', // Centraliza o texto verticalmente
  },
  carouselText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  questionsScroll: {
    flex: 1,
  },
  questionsContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#054C69',
    paddingTop: 10,
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
