import { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

const CommandsScreen = ({ navigation }) => {
  const settings = () =>{
    navigation.navigate('Init')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.blue} onPress={() => gate()}>
        <Text style={styles.text}>Cancello</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.orange} onPress={() => lights()}>
        <Text style={styles.text}>Luci</Text>
      </TouchableOpacity>

      <FlashMessage position="center" />

      <TouchableOpacity onPress={settings} style={styles.upright}>
        <Image source={require('../assets/settings.png')} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}

//send message for gate
const gate = async () => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${global.botSender}/sendMessage`,
      {
        chat_id: global.channelID,
        text: '/cancello',
      }
    );

    console.log('Message sent:', response.data);
    showMessage({
      message: 'Message sent',
      type: 'info',
      duration: 1500, 
      backgroundColor: 'green'
    });
  } catch (error) {
    console.error('Error sending message:', error);
    showMessage({
      message: 'Error, try again',
      type: 'info',
      duration: 1500, 
      backgroundColor: 'red'
    });
  }
};

//send message for lights
const lights = async () => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${global.botSender}/sendMessage`,
      {
        chat_id: global.channelID,
        text: '/luci',
      }
    );

    console.log('Message sent:', response.data);
    showMessage({
      message: 'Message sent',
      type: 'info',
      duration: 1500, 
      backgroundColor: 'green'
    });
  } catch (error) {
    console.error('Error sending message:', error);
    showMessage({
      message: 'Error, try again',
      type: 'info',
      duration: 1500, 
      backgroundColor: 'red'
    });
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  blue: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  orange: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'center'
  },
  text: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center'
  },
  upright: {
    position: 'absolute',
    top: '50%+35',
    right: '2%'
  },
  image: {
    width: 70, 
    height: 70, 
    resizeMode: 'contain' 
  }
});

export default CommandsScreen;