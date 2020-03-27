import React, { useEffect, useState } from 'react'
import { Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../../services/api'

import styles from './styles'

function Main({ navigation }) {

    const [devs, setDevs] = useState([])
    const [currentRegion, setCurrentRegion] = useState(null)
    const [techs, setTechs] = useState('')

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync()

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })

            }
        }

        loadInitialPosition()
    }, [])

    async function loadDevs() {
        const { latitude, longitude } = currentRegion

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        })
        setDevs(response.data.devs)
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region)
    }

    if (!currentRegion) {
        return null;
    }

    return (
        <>
            <MapView
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion}
                showsUserLocation
                showsMyLocationButton
                style={styles.map}
            >
                {devs.map(dev => (
                    <Marker
                        coordinate={{
                            longitude: dev.location.coordinates[0],
                            latitude: dev.location.coordinates[1]
                        }}
                        key={dev._id}
                    >
                        <Image
                            resizeMode="contain"
                            style={styles.avatar}
                            source={{
                                uri: dev.avatar_url
                            }}
                        />
                        <Callout onPress={() => { navigation.navigate('Profile', { github_username: dev.github_username }) }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName} >{dev.name}</Text>
                                <Text style={styles.devBio} >{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <KeyboardAvoidingView contentContainerStyle={{ flex: 1 }} behavior="position" keyboardVerticalOffset={50} >
                <View style={styles.searchForm}>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar devs por techs..."
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={techs}
                        onChangeText={setTechs}
                    />
                    <TouchableOpacity
                        style={styles.loadButton}
                        onPress={loadDevs}
                    >
                        <MaterialIcons name="my-location" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>

    )
}

export default Main