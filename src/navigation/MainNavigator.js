
import React from "react";
import PlaylistScreen from "../screens/PlaylistScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import PlayScreen from "../screens/Playlists";
import MeuRanking from "../screens/UltimasTocadasScreen";

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = focused ? 'home-outline' : 'home-outline';
                }  else if (route.name == 'Meu Ranking'){
                    iconName = focused ? 'trophy-outline' : 'trophy-outline';
                } else if (route.name === 'Procurar') {
                    iconName = focused ? 'musical-notes-outline' : 'musical-notes-outline';
                }  else if (route.name === 'Playlists') {
                    iconName = focused ? 'list-outline' : 'list-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: '#1db954',
            activeBackgroundColor: '#333333',
            inactiveTintColor: 'gray',
            inactiveBackgroundColor: '#222222'
        }}
    >

<Tab.Screen name="Home" component={HomeScreen} />
<Tab.Screen name="Playlists" component={PlayScreen} />
<Tab.Screen name="Procurar" component={PlaylistScreen} />
<Tab.Screen name="Meu Ranking" component={MeuRanking} />
</Tab.Navigator>
        );

export default MainNavigator;