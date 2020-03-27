import React from 'react'
import { View, Text, Button } from 'react-native'
import { WebView } from 'react-native-webview';

import styles from './styles'

function Profile({ route, navigation }) {

    const { github_username } = route?.params

    return (
        <WebView source={{ uri: `https://github.com/${github_username}` }} style={{ flex: 1 }} >

        </WebView>
    )
}

export default Profile