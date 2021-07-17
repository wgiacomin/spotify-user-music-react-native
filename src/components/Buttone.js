import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
const qs = require('qs');
import base64 from 'react-native-base64'
import { useAuthDispatch } from "../context/AuthContext";
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';


const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const Buttone = () => {
    const [valid, setValid] = useState(0);
    const { signIn } = useAuthDispatch();

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: <insert>,
            scopes: ['user-read-email', 'playlist-modify-public', 'user-follow-modify', 'user-read-recently-played', 'user-library-read', 'user-top-read'],
            usePKCE: false,
            redirectUri: makeRedirectUri({}),
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            (async () => await spotifyGetKey(code, false))()
        }
    }, [response]);


    async function spotifyGetKey(code, refresh) {

        const client = base64.encode(<insert>)
        let data = ''
        if (refresh == true) {
            data = qs.stringify({
                'grant_type': 'refresh_token',
                'refresh_token': code
            })
        }
        else {
            data = qs.stringify({
                'grant_type': 'authorization_code',
                'redirect_uri': makeRedirectUri({}),
                'code': code
            })
        }

        await axios.post('https://accounts.spotify.com/api/token',
            data = data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${client}`
                }
            })
            .then(result => {
                if (refresh)
                    signIn(result.data.access_token, null)
                else
                    signIn(result.data.access_token, result.data.refresh_token)
                setValid(1);
            })
            .catch((error) => console.error("b", error))
    };

    useEffect(() => {
        (async () => await AsyncStorage.getItem('refresh_token')
            .then(result => {
                if (result) {
                    (async () => await spotifyGetKey(result, true))()
                } else {
                    setValid(2)
                }
            })
        )()
    }, []);

    if (valid == 2) {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    promptAsync()
                }}
            >
                
                <Text style={styles.btnlogin}>Login com Spotify</Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <ActivityIndicator size={60} color="#00ff00" />
        )
    }
}


export default Buttone;


const styles = StyleSheet.create({
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
    btnlogin: {
        color: 'white',
        margin: 'auto',
        fontWeight: 'bold',
    }
});