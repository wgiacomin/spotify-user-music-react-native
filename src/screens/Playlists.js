import { Text, Input } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import spotify from "../api/spotify"
const qs = require('qs');
import { useAuthState } from "../context/AuthContext";

const PlayScreen = () => {

    const [dados, setDados] = useState([]);
    const [search, setText] = useState('');
    const { name } = useAuthState();

    async function searchSpotify(query) {
        let busca = []
        let data = await spotify.get(`/search?${qs.stringify({ q: query })}&type=playlist&limit=20`)
        data = data.data.playlists
        data.items.forEach(element => {
            busca = {
                ...busca,
                [element.id]: { name: element.name, owner: element.owner.display_name, image: element.images[0].url }
            }
        });
        setDados(busca);
    }

    async function savePlaylist(id) {
        let sucesso = 'Sucesso!'
        let msg = ''
        await spotify.put(`/playlists/${id}/followers`).catch((res) => sucesso = "Falha!")
        msg = (sucesso == 'Sucesso!') ? `Playlist salva com sucesso.` : `Não foi possível salvar a Playlist.`
        Alert.alert(
            sucesso,
            msg,
            [
                {
                    text: 'Ok!',
                },
            ]
        )
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
                                <View style={{ height: 275 }}>
                                    <View style={{ flex: 1, }}>
                                        <Image source={{ uri: item.item[1].image }} style={styles.cover} />
                                        <Text style={styles.nomePlaylist}> {item.item[1].name} </Text>
                                        <Text style={styles.nomeAutor}> {item.item[1].owner}</Text>
                                    </View>
                                    <View >
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => savePlaylist(item.item[0])}
                                        >
                                            <Text style={styles.txtSave}> Seguir </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>

        </View >
    )
}


export default PlayScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        padding: 20,
        paddingTop: 10,
        backgroundColor: '#212121',
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
    coverRow: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15,
    },
    background: {
        flex: 1,
        backgroundColor: '#212121',
    },
    txtSave: {
        color: 'white',
        fontWeight: 'bold',
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
        marginBottom: 15

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
     nomePlaylist: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
    },
    nomeAutor: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        fontStyle: 'italic'
    },
});
