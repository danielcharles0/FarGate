import { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

export default class App extends Component {
  //Rendering the View, at opening app
  render() {
    //returning the View
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.blue} onPress={() => gate()}>
          <Text style={styles.text}>Cancello</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.orange} onPress={() => lights()}>
          <Text style={styles.text}>Luci</Text>
        </TouchableOpacity>

        <FlashMessage position="center" />
      </View>
    );
  }
}

// Replace 'BOT_TOKEN_SENDER' and 'CHANNEL_ID' with your bot token and channel ID between two bots
const botSender = 'BOT_TOKEN_SENDER';
const channelID = 'CHANNEL_ID'; //channel chat between the bots

//send message for gate
const gate = async () => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${botSender}/sendMessage`,
      {
        chat_id: channelID,
        text: '/cancello',
      }
    );

    showMessage({
      message: 'Message sent',
      type: 'info',
      duration: 1500, 
      backgroundColor: 'green'
    });
  } catch (error) {
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
      `https://api.telegram.org/bot${botSender}/sendMessage`,
      {
        chat_id: channelID,
        text: '/luci',
      }
    );

    showMessage({
      message: 'Message sent',
      type: 'info',
      duration: 1500, 
      backgroundColor: 'green'
    });
  } catch (error) {
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
    justifyContent: 'center',
  },
  blue: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
  orange: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },
});
