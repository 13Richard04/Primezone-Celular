import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Modal, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import Footer from '../../components/Footer/Footer';
import { doc, collection, getDoc, query, onSnapshot, where, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
import { auth, db } from '../../DB/firebaseConfig';

const PerguntaPage = ({ route, navigation }) => {
  const { questionId } = route.params;
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');
  const [userName, setUserName] = useState(''); // Nome do usuário logado

  // Obtém informações do usuário logado
  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name || 'Usuário Anônimo');
        }
      }
    };
    fetchUserInfo();
  }, []);

  // Função para buscar os dados da pergunta
  const fetchQuestion = async () => {
    try {
      const questionDoc = await getDoc(doc(db, 'perguntas', questionId));
      if (questionDoc.exists()) {
        setQuestion({ id: questionDoc.id, ...questionDoc.data() });
      }
    } catch (error) {
      console.error('Erro ao buscar a pergunta:', error);
    }
  };

  // Função para buscar as respostas relacionadas à pergunta
  const fetchAnswers = () => {
    const answersQuery = query(
      collection(db, 'respostas'),
      where('perguntaId', '==', questionId)
    );

    const unsubscribe = onSnapshot(answersQuery, (snapshot) => {
      const answersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnswers(answersList);
      setLoading(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    fetchQuestion();
    const unsubscribeAnswers = fetchAnswers();
    return () => unsubscribeAnswers();
  }, [questionId]);

  const handleSendAnswer = async () => {
    if (newAnswer.trim() === '') {
      alert('A resposta não pode estar vazia.');
      return;
    }

    try {
      await addDoc(collection(db, 'respostas'), {
        nome: userName, // Nome do usuário logado
        fotoPerfil: auth.currentUser.photoURL || 'https://placekitten.com/40/40',
        perguntaId: questionId,
        texto: newAnswer,
        timestamp: Timestamp.fromDate(new Date()),
        uid: auth.currentUser.uid,
      });

      setModalVisible(false);
      setNewAnswer('');
    } catch (error) {
      console.error('Erro ao enviar a resposta:', error);
      alert('Erro ao enviar a resposta. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Caixa da Pergunta */}
      <View style={styles.questionBox}>
        {question && (
          <>
            <View style={styles.questionHeader}>
              <View style={styles.userInfo}>
                <Image 
                  source={{ uri: question.fotoPerfil || '../.././assets/Images/profileFooter.png' }}
                  style={styles.profileImage} 
                />
                <Text style={styles.userName}>{question.nome || 'Usuário Anônimo'}</Text>
              </View>
              <Image 
                source={{ uri: question.materiaIcon || 'https://placekitten.com/20/20' }}
                style={styles.subjectIcon}
              />
            </View>
            <View style={styles.questionContent}>
              <Text style={styles.questionText}>{question.pergunta}</Text>
            </View>
            <View style={styles.questionFooter}>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.replyButton}>
                <Text style={styles.replyButtonText}>+ RESPONDER</Text>
              </TouchableOpacity>
              <Text style={styles.timestamp}>{question.timestamp || 'Horário da Pergunta'}</Text>
            </View>
          </>
        )}
      </View>

      {/* Respostas */}
      <ScrollView style={styles.answersContainer} contentContainerStyle={styles.answersContent}>
        <Text style={styles.answersTitle}>Respostas:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FFF" />
        ) : answers.length > 0 ? (
          answers.map((answer) => (
            <View key={answer.id} style={styles.answerBox}>
              <View style={styles.answerHeader}>
                <View style={styles.userInfo}>
                  <Image 
                    source={{ uri: answer.fotoPerfil || '../.././assets/Images/profileFooter.png' }}
                    style={styles.profileImage} 
                  />
                  <Text style={styles.userName}>{answer.nome || 'Usuário Anônimo'}</Text>
                </View>
              </View>
              <View style={styles.answerContent}>
                <Text style={styles.answerText}>{answer.texto}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noResponsesText}>Nenhuma resposta encontrada.</Text>
        )}
      </ScrollView>

      {/* Modal para adicionar resposta */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>SUA RESPOSTA</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite sua resposta..."
              value={newAnswer}
              onChangeText={setNewAnswer}
              multiline
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Enviar" onPress={handleSendAnswer} />
            </View>
          </View>
        </View>
      </Modal>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#054C69',
    paddingHorizontal: 0,
    marginTop: 40,
    paddingTop: 20,
    paddingVertical: 10,
  },
  questionBox: {
    backgroundColor: '#97BF41',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignSelf: 'center',
    width: '95%',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  subjectIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  questionContent: {
    marginVertical: 10,
  },
  questionText: {
    fontSize: 16,
    color: 'black',
  },
  questionFooter: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#4A4A4A',
  },
  replyButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  replyButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  answersContainer: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 100,
    marginBottom: 40,
  },
  answersContent: {
    paddingBottom: 20,
  },
  answerBox: {
    backgroundColor: '#FFEB3B',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
  },
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  answerContent: {
    marginVertical: 10,
  },
  answerText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PerguntaPage;