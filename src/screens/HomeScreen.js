import { Text, Input } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import spotify from "../api/spotify"
const qs = require('qs');
import { useAuthState } from "../context/AuthContext";

const HomeScreen = () => {

  const [dados, setDados] = useState([]);
  const [search, setText] = useState('');
  const { name } = useAuthState();
  const image = { uri: "https://reactjs.org/logo-og.png" };


  return (

    <View style={styles.container}>
      <ImageBackground source={require('../../assets/bghome.gif')} style={styles.bgimage}>
        <View>
          <Image source={{ uri: 'https://i.imgur.com/tS7jvGg.png' }} style={styles.headerbanner} />
        </View>
        <View>
          <Text style={styles.texto}>
            Olá <Text style={styles.textoNome}>{name}!</Text>{"\n"}
  com o <Text style={styles.textoGrande}>TADSongs</Text> você pode salvar fácilmente suas playlists do Spotify!
  </Text>
        </View>
        <View style={{ flex: 0.50 }}>

        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={Object.entries(dados)}
            keyExtractor={item => item[0]}
            numColumns={2}
            renderItem={(item) => {
              return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View style={{ flex: 1, }}>
                    <Image source={{ uri: item.item[1].image }} style={styles.cover} />
                    <Text style={styles.textoPequeno}> {item.item[1].name} {"\n"} {item.item[1].owner}</Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => savePlaylist(item.item[0])}
                    >
                      <Text> Salvar </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}
          />
        </View>
      </ImageBackground>

    </View>
  )
}


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 0,
    paddingTop: 0,
  },
  bgimage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    resizeMode: "contain",
    paddingTop: 110,
  },
  logo: {
    alignSelf: 'center',
    width: 200,
    height: 100,
    marginTop: 40,
  },
  cover: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginTop: 5,
    borderRadius: 10,
  },
  headerbanner: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  coverRow: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  background: {
    flex: 1,
    backgroundColor: '#212121',
  },
  itensStand: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 100,
  },
  inputbox: {
    flex: 1,
    textAlign: 'center',
  },
  texto: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 10,
    paddingBottom: 15,
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  textoGrande: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  textoNome: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  textoPequeno: {
    color: 'white',
    fontSize: 15,
    paddingLeft: 10,
    paddingBottom: 15,
    fontFamily: 'Roboto',
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 0,
  },
  button: {
    borderRadius: 30,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#1db954',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '80%',

  },
  btnBusca: {
    borderRadius: 30,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#1db954',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    marginBottom: 10,

  },
  btnlogin: {
    color: 'white',
    margin: 'auto',
    fontWeight: 'bold',
  },
  nomePlaylist: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  btnSave: {
    color: 'white',
    margin: 'auto',
    fontWeight: 'bold',
  },
});