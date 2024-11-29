import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../DB/firebaseConfig'; 
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { onSnapshot } from 'firebase/firestore';

const PerguntasMaterias = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);  // Controle do modal
  const [newQuestionText, setNewQuestionText] = useState('');  // Texto da nova pergunta
  const [selectedMateria, setSelectedMateria] = useState('');  // Matéria selecionada no modal

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
    const unsubscribe = onSnapshot(perguntasRef, (snapshot) => {
      const perguntasList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(perguntasList);
    });

    return () => unsubscribe();
  }, []);

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

  const handleCreateQuestion = async () => {
    if (newQuestionText.trim() && selectedMateria) {
      try {
        await addDoc(collection(db, 'perguntas'), {
          pergunta: newQuestionText,
          materia: selectedMateria,
          nome: 'Nome do Usuário', // Substitua pelo nome do usuário real
          fotoPerfil: 'https://lncimg.lance.com.br/cdn-cgi/image/width=850,quality=75,format=webp/uploads/2024/11/cr7-alnassr.jpeg', // Foto padrão
          tempo: new Date().toLocaleString(), // Adiciona a data e hora da criação
        });
        setNewQuestionText('');
        setSelectedMateria('');
        setModalVisible(false);
        alert('Pergunta enviada com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar a pergunta:', error);
        alert('Erro ao salvar a pergunta. Tente novamente.');
      }
    } else {
      alert('Preencha todos os campos');
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

  // Filtra as perguntas com base na pesquisa e na matéria selecionada
  const filteredQuestions = questions.filter((item) => {
    const matchesSearch = item.pergunta.toLowerCase().includes(searchText.toLowerCase());
    const matchesSubject = selectedSubject ? item.materia === selectedSubject : true;
    return matchesSearch && matchesSubject;
  });

  return (
    <View style={styles.container}>
      <Header onSearch={setSearchText} />
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
          <TouchableOpacity 
            key={item.id} 
            style={styles.questionBox}
            onPress={() => navigation.navigate('PerguntaPage', { questionId: item.id })}
          >        
            <View style={styles.questionHeader}>
              <Image source={{ uri: item.fotoPerfil }} style={styles.profileImage} />
              <Text style={styles.name}>{item.nome}</Text>
            </View>
            {renderQuestionText(item.pergunta, item.id)}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Footer navigation={navigation} />

      {/* Botão flutuante para abrir o modal */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal para criar pergunta */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>DIGITE SUA PERGUNTA</Text>

            {/* Campo para descrição da pergunta */}
            <TextInput
              style={styles.modalInput}
              placeholder="Digite sua pergunta"
              value={newQuestionText}
              onChangeText={setNewQuestionText}
            />

            {/* Seletor de matéria */}
            <Text style={styles.modalSubtitle}>Selecione a matéria:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {materias.map((materia) => (
                <TouchableOpacity
                  key={materia.name}
                  style={[styles.subjectButton, selectedMateria === materia.name && styles.selectedSubjectButton]}
                  onPress={() => setSelectedMateria(materia.name)}
                >
                  <Text style={styles.subjectText}>{materia.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Botões de Enviar e Fechar */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.createButton} onPress={handleCreateQuestion}>
                <Text style={styles.createButtonText}>Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007BFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    height: 'auto',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subjectButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  selectedSubjectButton: {
    backgroundColor: '#FFEC5C',
  },
  subjectText: {
    fontSize: 14,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  createButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default PerguntasMaterias;
