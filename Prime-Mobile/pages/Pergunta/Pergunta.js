import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Footer from '../../components/Footer/Footer';

const PerguntaPage = ({ navigation }) => {
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
          <Text style={styles.timestamp}>Horário da Pergunta</Text>
        </View>
      </View>

      {/* Respostas */}
      {[1, 2, 3].map((_, index) => (
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

      <Footer navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // Removendo o padding da tela principal para evitar margens extras
    paddingHorizontal: 0, // Remover padding horizontal
    marginTop: 40,
    paddingVertical: 10, // Ajuste o padding conforme necessário
  },
  questionBox: {
    backgroundColor: '#4CAF50', // Cor de fundo verde para a pergunta
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '100%', // Garante que a largura ocupe a tela inteira
    alignSelf: 'stretch', // Garante que o componente ocupe toda a largura
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
    color: '#fff',
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
    color: '#fff',
  },
  questionFooter: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: '#fff',
  },
  answerBox: {
    backgroundColor: '#FFEB3B', // Cor de fundo amarela para as respostas
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '100%', // Garante que a largura ocupe a tela inteira
    alignSelf: 'stretch', // Garante que o componente ocupe toda a largura
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
});

export default PerguntaPage;
