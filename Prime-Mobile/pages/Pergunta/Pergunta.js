import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Modal, Button, TouchableOpacity } from 'react-native';
import Footer from '../../components/Footer/Footer';

const PerguntaPage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');

  const handleSendAnswer = () => {
    console.log('Nova resposta:', newAnswer);
    setModalVisible(false);
    setNewAnswer(''); // Limpa o campo de texto após enviar
  };

  return (
    <View style={styles.container}>
      {/* Caixa da Pergunta */}
      <View style={styles.questionBox}>
        <View style={styles.questionHeader}>
          {/* Foto e Nome */}
          <View style={styles.userInfo}>
            <Image 
              source={require('../.././assets/Images/profileFooter.png')} // Substitua pela URL da foto
              style={styles.profileImage} 
            />
            <Text style={styles.userName}>Nome do Usuário</Text>
          </View>
          {/* Símbolo da Matéria */}
          <Image 
            source={{uri: 'https://placekitten.com/20/20'}} // Substitua pela URL do símbolo da matéria
            style={styles.subjectIcon}
          />
        </View>
        <View style={styles.questionContent}>
          <Text style={styles.questionText}>Conteúdo da Pergunta...</Text>
        </View>
        <View style={styles.questionFooter}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.replyButton}>
            <Text style={styles.replyButtonText}>+ RESPONDER</Text>
          </TouchableOpacity>
          <Text style={styles.timestamp}>Horário da Pergunta</Text>
        </View>
      </View>

      {/* Respostas com ScrollView */}
      <ScrollView style={styles.answersContainer} contentContainerStyle={styles.answersContent}>
        {[1].map((_, index) => (
          <View key={index} style={styles.answerBox}>
            <View style={styles.answerHeader}>
              {/* Foto e Nome da Resposta */}
              <View style={styles.userInfo}>
                <Image 
                  source={require('../.././assets/Images/profileFooter.png')} // Substitua pela URL da foto
                  style={styles.profileImage} 
                />
                <Text style={styles.userName}>Nome do Respondente</Text>
              </View>
            </View>
            <View style={styles.answerContent}>
              <Text style={styles.answerText}>Conteúdo da Resposta...</Text>
            </View>
          </View>
        ))}
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
              <Button style={styles.RespostaButton} title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button style={styles.RespostaButton} title="Enviar" onPress={handleSendAnswer} />
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
