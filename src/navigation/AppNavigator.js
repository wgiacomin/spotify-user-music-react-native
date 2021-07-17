import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from '../../RootNavigation';
import { useAuthState } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import MainNavigator from "./MainNavigator"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, Alert } from 'react-native';
import { useAuthDispatch } from "../context/AuthContext";
import { Image, View, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function AppNavigator() {
    const { logout } = useAuthDispatch();
    const { access_token } = useAuthState();

    useEffect(() => {
    }, [access_token]);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                {access_token == null ? (
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name="Home" component={MainNavigator}
                        options={
                            {
                                headerTitleAlign: 'center',
                                title: 'TADSongs',
                                headerStyle: { backgroundColor: '#333333' },
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                                headerTintColor: '#fff',
                                headerRight: () => (
                                    <TouchableOpacity
                                        onPress={() =>
                                            Alert.alert(
                                                'Você está saindo!',
                                                'Tem certeza que deseja realizar o logout?',
                                                [
                                                    {
                                                        text: 'Cancelar',
                                                    },
                                                    { text: 'Logout', onPress: () => logout() }
                                                ],
                                                { cancelable: true }
                                            )
                                        }
                                    >
                                        <Ionicons style={styles.exitbtn} name="exit-outline" color='#f0e2e1' size={30} />
                                    </TouchableOpacity>),
                            }
                        } />
                )}
            </Stack.Navigator>
        </NavigationContainer >
    );
}

const styles = StyleSheet.create({
  exitbtn: {
    padding: 30,
  },
});