import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, StatusBar } from 'react-native';
import Footer from '../../components/Footer/Footer';

const CentralAjuda = ({ navigation }) => {
  const [expandedId, setExpandedId] = useState(null);

  const buttons = [
    { id: 1, label: 'Minha Conta', description: 'Aqui você encontra informações sobre como gerenciar sua conta.' },
    { id: 2, label: 'Comunidade', description: 'Saiba mais sobre como interagir e se engajar na comunidade.' },
    { id: 3, label: 'Como Funciona', description: 'Entenda como utilizar a plataforma e acessar seus recursos.' },
    { id: 4, label: 'Soluções', description: 'Veja soluções para problemas comuns enfrentados pelos usuários.' },
    { id: 5, label: 'Dúvidas Frequentes', description: 'Respostas para perguntas comuns que podem ajudar você.' },
    { id: 6, label: 'Políticas e Privacidades', description: 'Leia sobre nossas políticas e como protegemos seus dados.' },
  ];

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.helpCenterTitle}>
        <Text style={styles.text}>Conteúdo da Central de Ajuda</Text>
      </View>

      <View style={styles.helpCenterButtons}>
        {buttons.map((button) => (
          <View key={button.id} style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={() => toggleExpand(button.id)}>
              <Text style={styles.buttonText}>{button.label}</Text>
            </TouchableOpacity>
            {expandedId === button.id && (
              <View style={styles.expandedContent}>
                <Text style={styles.expandedText}>{button.description}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#054C69', // Fundo escuro
    paddingTop: StatusBar.currentHeight || 10,
  },
  helpCenterTitle: {
    marginTop: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingBottom: 20,
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
    color: '#fff', // Texto branco
    fontWeight: 'bold',
  },
  helpCenterButtons: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 10,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#86B049', // Verde
    width: '100%',
    paddingVertical: 15,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    alignItems: 'center',
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#333', // Texto escuro
    fontWeight: 'bold',
  },
  expandedContent: {
    backgroundColor: '#E5F4E3', // Fundo claro para o texto expandido
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    padding: 10,
    // marginTop: 5,
  },
  expandedText: {
    fontSize: 14,
    color: '#333', // Cor do texto expandido
  },
});

export default CentralAjuda;
