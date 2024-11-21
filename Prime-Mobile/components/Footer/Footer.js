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
    height: 70,
    backgroundColor: '#FFEC5C',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  footerImages: {
    flexDirection: 'row', // Alinha as imagens em uma linha
    justifyContent: 'space-around', // Espalha as imagens igualmente
    alignItems: 'center',
    width: '100%', // Largura total
  },
  footerImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain', 
  },
});

export default Footer;
