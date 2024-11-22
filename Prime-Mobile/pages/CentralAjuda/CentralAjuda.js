import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, StatusBar, ScrollView } from 'react-native';
import Footer from '../../components/Footer/Footer';
import { useFonts } from 'expo-font';

const CentralAjuda = ({ navigation }) => {
  const [expandedId, setExpandedId] = useState(null);
  const animations = useRef({}).current;
  const [fontsLoaded] = useFonts({
    'Jomhuria': require('../../assets/Fontes/Jomhuria/Jomhuria-Regular.ttf')
  });

  const buttons = [
    { id: 1, label: 'Minha Conta', description: 'Aqui você encontra informações sobre como gerenciar sua conta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.' },
    { id: 2, label: 'Comunidade', description: 'Saiba mais sobre como interagir e se engajar na comunidade. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.' },
    { id: 3, label: 'Como Funciona', description: 'Entenda como utilizar a plataforma e acessar seus recursos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.' },
    { id: 4, label: 'Soluções', description: 'Veja soluções para problemas comuns enfrentados pelos usuários. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.' },
    { id: 5, label: 'Dúvidas Frequentes', description: 'Respostas para perguntas comuns que podem ajudar você. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.' },
    { id: 6, label: 'Políticas e Privacidades', description: 'Leia sobre nossas políticas e como protegemos seus dados. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.' },
  ];

  buttons.forEach((button) => {
    if (!animations[button.id]) {
      animations[button.id] = new Animated.Value(0); // Altura inicial do conteúdo expandido
    }
  });

  const toggleExpand = (id) => {
    if (expandedId === id) {
      Animated.timing(animations[id], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpandedId(null));
    } else {
      if (expandedId !== null) {
        Animated.timing(animations[expandedId], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
      Animated.timing(animations[id], {
        toValue: 150, // Aumente o valor da altura expandida para permitir mais espaço
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpandedId(id));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.helpCenterTitle}>
        <Text style={styles.tittle}>CENTRAL DE AJUDA</Text>
      </View>

      {/* Adicionando ScrollView para rolar os botões */}
      <ScrollView contentContainerStyle={styles.helpCenterButtons} style={styles.scrollView}>
        {buttons.map((button) => (
          <View key={button.id} style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={() => toggleExpand(button.id)}>
              <Text style={styles.buttonText}>{button.label}</Text>
            </TouchableOpacity>
            <Animated.View style={[styles.expandedContent, { height: animations[button.id] }]}>
              {expandedId === button.id && (
                <ScrollView style={styles.scrollContent}>
                  <Text style={styles.expandedText}>{button.description}</Text>
                </ScrollView>
              )}
            </Animated.View>
          </View>
        ))}
      </ScrollView>

      {/* Footer com espaço extra */}
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#054C69',
    paddingTop: StatusBar.currentHeight || 10,
  },
  helpCenterTitle: {
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingBottom: 20,
    marginBottom: 40,
    width: 350,
  },
  tittle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '800',
    fontFamily: 'Jomhuria',
  },
  helpCenterButtons: {
    flexGrow: 1,
    paddingHorizontal: 20,
    gap: 10,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#86B049',
    width: '100%',
    paddingVertical: 15,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  expandedContent: {
    overflow: 'hidden',
    backgroundColor: '#E5F4E3',
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  scrollContent: {
    maxHeight: 200, // Limita a altura máxima para rolar
  },
  expandedText: {
    fontSize: 14,
    color: '#333',
  },
  scrollView: {
    marginBottom: 80, // Adicionando espaço entre o ScrollView e o Footer
  },
});

export default CentralAjuda;
