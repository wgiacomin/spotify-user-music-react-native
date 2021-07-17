import { Text, Input } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import spotify from "../api/spotify"
const qs = require('qs');

const PlaylistScreen = () => {
  const [dados, setDados] = useState([]);
  const [search, setText] = useState('');


  async function searchSpotify(query) {
    let busca = []
    let data = await spotify.get(`/search?${qs.stringify({ q: query })}&type=track&limit=20`)
    data = data.data.tracks
    data.items.forEach(element => {
      busca = {
        ...busca,
        [element.id]: { name: element.name, artist: element.album.artists[0].name, image: element.album.images[0].url }
      }
    });
    setDados(busca);
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.50 }}>
        <View style={styles.inputbox}>
          <View style={{ paddingTop: 25 }}>
            <Text style={styles.texto}>
              Procure as suas musicas preferidas!
        </Text>
          </View>

          <Input
            placeholder="Escolha uma música..."
            style={styles.input}
            inputStyle={{ padding: 7, paddingLeft: 15, fontSize: 16, textAlign: 'center', }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={value => setText(value)}
          />
          <View style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <TouchableOpacity
              style={styles.btnBusca}
              onPress={async () => { await searchSpotify(search) }
              }          >
              <Text style={styles.txtSave}>Buscar...</Text>
            </TouchableOpacity>
          </View>
        </View>
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
                  <Text style={styles.textoPequeno}> {item.item[1].name} </Text>
                </View>
              </View>
            )
          }}
        />
      </View>

    </View >
  )
}
export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#212121',
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
  input: {
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 0,
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
  txtSave: {
    color: 'white',
    fontWeight: 'bold',
  },
  cover: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginTop: 5,
    borderRadius: 10,
  },
  textoPequeno: {
    color: 'white',
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 20,
    fontFamily: 'Roboto',
    alignSelf: 'center',
    textAlign: 'center',
},
});