import React, { useEffect, useState, } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator, Switch } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import spotify from "../api/spotify"

const MeuRanking = () => {

    const [dados, setDados] = useState({});
    const [valid, setValid] = useState(0)
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

    async function getMusic() {
        let music = []
        const time = (isEnabled2) ? 'short_term' : 'long_term'
        const limit = (isEnabled) ? 20 : 10
        let data = await spotify.get(`/me/top/tracks?limit=${limit}&time_range=${time}`)
        data = data.data.items
        data.forEach(element => {
            music = {
                ...music, [element.id]: { name: element.name, artist: element.album.artists[0].name, image: element.album.images[0].url }
            }
        });

        setDados(music)
        setValid(1)
    }

    useEffect(() => {
        getMusic()
    }, [isEnabled, isEnabled2]);

    return (
        <View style={{ flex: 1, flexDirection:'column', backgroundColor: '#212121', }}>
            <Text style={styles.texto }>Suas mais ouvidas:</Text>
            <View style={{ flex: 0.15, flexDirection: 'row', justifyContent: 'center', paddingBottom: 20, alignContent: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.textoPequeno}>Número de faixas:{"\n"}10/20</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#00cf07' }}
                        thumbColor={isEnabled ? '#00ff00' : '#81b0ff'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={{ flex: 1,  flexDirection: 'column', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.textoPequeno}>Tempo de análise:{"\n"}Anos/1 mês</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#00cf07' }}
                        thumbColor={isEnabled2 ? '#00ff00' : '#81b0ff'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch2}
                        value={isEnabled2}
                    />
                </View>
            </View>
            <View style={{flex:1}}>
                {(valid == 1) ?
                    <FlatList
                        data={Object.entries(dados)}
                        keyExtractor={item => item[0]}
                        numColumns={2}
                        renderItem={(item) => {
                            return (
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={{ flex: 1, }}>
                                        <Image source={{ uri: item.item[1].image }} style={styles.cover} />
                                        <Text style={styles.nomePlaylist}> {item.item[1].name} </Text>
                                        <Text style={styles.nomeAutor}> {item.item[1].artist} </Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                    :
                    <ActivityIndicator size={60} color="#00ff00" style={styles.background} />}
            </View>
        </View>
    );
}
export default MeuRanking;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        padding: 30,
        paddingTop: 50,
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
    texto: {
        color: 'white',
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 20,
        fontFamily: 'Roboto',
        textAlign: 'center',
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
        paddingTop: 10,
        fontFamily: 'Roboto',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 20,
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
