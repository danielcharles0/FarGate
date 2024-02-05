import {useState} from 'react';
import { Text, TextInput, StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const InitScreen = ({navigation}) => {
  const [token, setToken] = useState(global.botSender)
  const [channel, setChannel] = useState(global.channelID)

  const handleInputChange1 = (text) => {
    setToken(text);
  };
  const handleInputChange2 = (text) => {
    setChannel(text);
  };

  const done = () => {
    try {
      //await AsyncStorage.setItem('botSender', token);
      //await AsyncStorage.setItem('channelID', channel);
    
    } catch (e) {
      console.log("Error while saving in storage:", e)
    }

    global.botSender = token
    global.channelID = channel
    
    navigation.navigate('Commands')
  };

  const handleTapOutside = () => {
    Keyboard.dismiss();
  };

  return(
    <TouchableWithoutFeedback onPress={handleTapOutside}>
      <View style={styles.container}>
        <Text style={styles.instrucions}>Insert sender bot's token:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insert here..."
          placeholderTextColor = 'black'
          onChangeText={handleInputChange1}
          value={token}
        />

        <Text style={styles.instrucions}>Insert Telegram channel ID:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insert here..."
          placeholderTextColor = 'black'
          onChangeText={handleInputChange2}
          value={channel}
        />

        <TouchableOpacity style={styles.blue} onPress={done}>
          <Text style={styles.text}>Done</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'wheat'
  },
  blue: {
    height: '7%',
    width: '80%',
    marginTop: '8%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    borderRadius: 14,
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  instrucions: {
    fontSize: 23,
    color: 'black',
    marginBottom: '5%',
    textAlign: 'left'
  },
  input: {
    fontSize: 18,
    height: '7%',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: '10%',
    paddingLeft: 3,
    paddingRight: 3,
    width: '80%',
    borderRadius: 14,
    justifyContent: 'center'
  },
});

export default InitScreen;