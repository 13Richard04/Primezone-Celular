import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore'; // Firestore para ouvir as perguntas
import { db } from '../../DB/firebaseConfig'; // Configuração do Firebase
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Home = ({ navigation }) => {
  const [questions, setQuestions] = useState([]); // Estado para armazenar perguntas
  const [expandedQuestions, setExpandedQuestions] = useState({}); // Controle de "Ver mais"

  const materias = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Inglês'];

  useEffect(() => {
    // Referência para a coleção "perguntas"
    const perguntasRef = collection(db, 'perguntas');

    // Listener para atualizações em tempo real
    const unsubscribe = onSnapshot(perguntasRef, (snapshot) => {
      const perguntasList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(perguntasList); // Atualiza o estado com os dados do Firestore
    });

    // Limpa a assinatura quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  const toggleExpand = (id) => {
    setExpandedQuestions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderQuestionText = (text, id) => {
    const isExpanded = expandedQuestions[id];
    if (text.length <= 160 || isExpanded) {
      return (
        <>
          <Text style={styles.questionText}>{text}</Text>
          {text.length > 160 && (
            <TouchableOpacity onPress={() => toggleExpand(id)}>
              <Text style={styles.toggleText}>Ver menos</Text>
            </TouchableOpacity>
          )}
        </>
      );
    }
    return (
      <>
        <Text style={styles.questionText}>{text.substring(0, 160)}...</Text>
        <TouchableOpacity onPress={() => toggleExpand(id)}>
          <Text style={styles.toggleText}>Ver mais</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
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

      <ScrollView contentContainerStyle={styles.questionsContainer} style={styles.questionsScroll}>
        {questions.map((item) => (
          <View key={item.id} style={styles.questionBox}>
            <View style={styles.questionHeader}>
              <Image source={{ uri: item.fotoPerfil }} style={styles.profileImage} />
              <Text style={styles.name}>{item.nome}</Text>
            </View>
            {renderQuestionText(item.pergunta, item.id)}
          </View>
        ))}
      </ScrollView>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselWrapper: {
    maxHeight: 100,
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
    height: 40,
    justifyContent: 'center',
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
    paddingBottom: 70,
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
  toggleText: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 5,
  },
});

export default Home;
