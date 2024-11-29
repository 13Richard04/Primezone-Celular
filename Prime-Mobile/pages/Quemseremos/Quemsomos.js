import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native';

import Footer from '../../components/Footer/Footer';

const Quemsomos = () => {
    return (
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.logo}>Quem Somos?</Text>
    
            <View style={styles.inputGroup}>
              <Text style={styles.label}>A PrimeZone é uma empresa dedicada à educação, com o objetivo de inovar o aprendizado digital no ensino fundamental e médio por meio da implementação de tecnologias avançadas. Seu foco é oferecer uma plataforma online gratuita, sem cobrança pelos serviços, proporcionando um atendimento personalizado e criando um ambiente de confiança.</Text>
              <Text style={styles.label}>Idealizada por um grupo de seis colegas, a PrimeZone inclui um fórum onde os usuários podem compartilhar perguntas e respostas, promovendo o aprendizado colaborativo. Além disso, será implementado um ChatBot que ajudará a comunidade com respostas automáticas, tanto no site quanto no aplicativo, com base no conteúdo disponível na plataforma.</Text>
              <Text style={styles.label}>O objetivo principal da PrimeZone é contribuir para o sistema educacional online de Santo André, auxiliando os estudantes a terem acesso a conteúdo de qualidade. A plataforma foi criada para ser um espaço de aprendizado acessível e colaborativo.</Text>
              
            </View>
    
            <View style={styles.inputGroup}>
              
            </View>
    
           
    
          </View>


          <Footer navigation={navigation} />

        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003b5a',
        padding: 20,
      },
      box: {
        width: '90%',
        backgroundColor: '#ffeb3b',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
      },
      logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#003b5a',
        marginBottom: 10,
        textAlign: 'center',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
      },
      inputGroup: {
        width: '100%',
        marginBottom: 15,
      },
      label: {
        fontSize: 13,
        color: '#333',
        padding: 2, 
      },
      input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: '#fff',
      },
      passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginTop: 5,
      },
      passwordInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        color: '#333',
      },
      options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      checkboxLabel: {
        fontSize: 14,
        color: '#333',
        marginLeft: 5,
      },
      forgotPassword: {
        fontSize: 14,
        color: '#333',
      },
      button: {
        width: '100%',
        backgroundColor: '#003b5a',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      registerText: {
        color: '#333',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
      },
      registerLink: {
        color: '#f4b400',
      },
      // Estilo para "Entrar como visitante"
      guestLoginText: {
        color: '#000', // texto preto
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        borderBottomWidth: 1, // linha embaixo
        borderBottomColor: '#000', // cor da linha
        paddingBottom: 3, // espaço entre o texto e a linha
      },
    });
    



  

export default Quemsomos;