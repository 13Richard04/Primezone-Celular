import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../DB/firebaseConfig'; 
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Home = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchText, setSearchText] = useState(''); // Estado para armazenar o texto de pesquisa

  const materias = [
    { name: 'matematica', label: 'Matemática' },
    { name: 'portugues', label: 'Português' },
    { name: 'quimica', label: 'Química' },
    { name: 'biologia', label: 'Biologia' },
    { name: 'fisica', label: 'Física' },
    { name: 'geografia', label: 'Geografia' },
    { name: 'historia', label: 'História' },
    { name: 'sociologia', label: 'Sociologia' },
  ];

  useEffect(() => {
    const perguntasRef = collection(db, 'perguntas');
    const perguntasQuery = selectedSubject
      ? query(perguntasRef, where('materia', '==', selectedSubject))
      : perguntasRef;

    const unsubscribe = onSnapshot(perguntasQuery, (snapshot) => {
      const perguntasList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(perguntasList);
    });

    return () => unsubscribe();
  }, [selectedSubject]);

  const toggleExpand = (id) => {
    setExpandedQuestions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSubjectPress = (materia) => {
    if (selectedSubject === materia) {
      setSelectedSubject('');
    } else {
      setSelectedSubject(materia);
    }
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

  // Função de filtro das questões com base no texto da pesquisa
  const filteredQuestions = questions.filter((item) =>
    item.pergunta.toLowerCase().includes(searchText.toLowerCase()) // Filtro insensível a maiúsculas/minúsculas
  );

  return (
    <View style={styles.container}>
      <Header onSearch={setSearchText} /> {/* Passa a função setSearchText para o Header */}
      <View style={styles.carouselWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer}>
          {materias.map((materia, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.carouselItem, selectedSubject === materia.name && styles.selectedCarouselItem]}
              onPress={() => handleSubjectPress(materia.name)}
            >
              <Text style={styles.carouselText}>{materia.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.questionsContainer} style={styles.questionsScroll}>
        {filteredQuestions.map((item) => (
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
    backgroundColor: 'rgba(217, 217, 217, 0.25)',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
  },
  selectedCarouselItem: {
    backgroundColor: 'rgba(217, 217, 217, 0.05)',
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
    minHeight: 510,
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
