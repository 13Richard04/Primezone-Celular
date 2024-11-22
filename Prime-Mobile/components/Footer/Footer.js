import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerImages}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../assets/Images/mainFooter.png')}
            style={styles.footerImage}
          />
        </TouchableOpacity>
        <Image
          source={require('../../assets/Images/bookFooter.png')}
          style={styles.footerImage}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Image
            source={require('../../assets/Images/profileFooter.png')}
            style={styles.footerImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 70,
    width: '100%',
    backgroundColor: '#FFEC5C',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Posiciona o footer de forma fixa
    bottom: 0, // Alinha na parte inferior da tela
  },
  footerImages: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  footerImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default Footer;
