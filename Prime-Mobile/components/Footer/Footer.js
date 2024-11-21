// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerImages}>
        <Image
        source={require('../../assets/Images/mainFooter.png')}
        style={styles.footerImage}
        />
        <Image
        source={require('../../assets/Images/bookFooter.png')}
        style={styles.footerImage}
        />
        <Image
        source={require('../../assets/Images/profileFooter.png')}
        style={styles.footerImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FFEC5C'
  },
  footerImages: {
    flexDirection: 'row', // Alinha as imagens em uma linha (colunas)
    justifyContent: 'space-around', // Espalha as imagens igualmente
    alignItems: 'center', // Centraliza as imagens verticalmente
    width: '100%', // A largura total disponível
  },
  footerImage: {
    width: 50, // Tamanho das imagens (ajuste conforme necessário)
    height: 50,
    resizeMode: 'contain', // Faz a imagem se ajustar dentro do espaço
  },
});

export default Footer;
