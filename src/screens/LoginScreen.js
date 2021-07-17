import React, { useContext, useState, useEffect, useRef } from "react";
import { Image, View, StyleSheet, ImageBackground } from 'react-native';
import { Text, Input, Button } from "react-native-elements";
import Buttone from "../components/Buttone";

const LoginScreen = ({ navigation, route }) => {

    return (
        <ImageBackground
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.itensStand}>
                    <Image
                        style={styles.logo}
                        source={{
                                  uri: 'https://i.imgur.com/tS7jvGg.png',
                                }}
                    />
                </View>
                <View style={styles.inputbox}>
                    <Text style={styles.texto}>
                        Bem-vindo!
                    </Text>

                    <Buttone/>
                    
                </View>
                
            </View>
        </ImageBackground >

    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        padding: 20,
        marginTop: 100,
    },
    logo: {
        alignSelf: 'center',
        width: 200,
        height: 200,
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
        fontSize: 30,
        paddingLeft: 10,
        paddingBottom: 15,
        fontFamily: 'Roboto',
        textAlign: 'center',
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
    btnlogin: {
        color: 'white',
        margin: 'auto',
        fontWeight: 'bold',
    }
});