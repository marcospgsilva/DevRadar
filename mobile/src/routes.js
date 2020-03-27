import React from 'react'
import { StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main'
import Profile from './pages/Profile'

const Stack = createStackNavigator()

function Routes() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: "#7d40e7"
                },
                headerTintColor: "#FFF",
                headerBackTitleVisible: false
            }} >
                <Stack.Screen name="Main" component={Main} options={{ title: 'DevRadar' }} />
                <Stack.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }} />
            </Stack.Navigator>
        </>
    )
}

export default Routes