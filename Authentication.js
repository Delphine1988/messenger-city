import React, {useState, useEffect} from 'react';
import View from "react-native-web/src/exports/View";
import Text from "react-native-web/src/exports/Text";
import {TextInput, Button} from 'react-native';
import Axios from "axios";
import * as Location from 'expo-location';
import {useHistory} from 'react-router-native';


function Authentication(props) {
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const setToken = props.setToken
    const setLatitude = props.setLatitude
    const setLongitude = props.setLongitude
    const setCityCode = props.setCityCode


    function Register() {
        Axios.post("https://api.dunarr.com/api/register",
            {
                username: username,
                password: password
            })
            .then(function () {
                Login();
            })
    }

    function Login() {
        Axios.post("https://api.dunarr.com/api/login",
            {
                username: username,
                password: password
            }).then(response => {
            setToken(response.data.token);
            LocationUser();
        })

    }

    async function LocationUser() {
        const {status} = await Location.requestPermissionsAsync();
        if (status != "granted") {
            console.error("permission not granted")
        }
        const position = await Location.getCurrentPositionAsync()
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        getCityCode(position.coords.longitude, position.coords.latitude);
    }

    function getCityCode(long, lat) {
        Axios.get("https://api-adresse.data.gouv.fr/reverse/?lon=" + long + "&lat=" + lat)
            .then(response => {
                setCityCode(response.data.features[0].properties.citycode)
                history.push("/MessageCity")
            })
    }

    return (
        <View style={{margin: 300, textAlign: 'center'}}>
            <Text style={{fontSize: 30, marginBottom: 20}}> Connexion </Text>
            <View>
                <TextInput

                    onChangeText={setUsername}
                    value={username}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    placeholder="Username"></TextInput>
            </View>


            <View style={{marginTop: 20}}>
                <TextInput

                    onChangeText={setPassword}
                    value={password}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    placeholder="Password">

                </TextInput>
            </View>

            <View style={{alignItems: 'center', marginTop: 20}}>
                <View style={{marginBottom: 20, width: 150}}>
                    <Button
                        title="S'incrire"
                        onPress={Register}
                        color="powderblue"
                    />
                </View>

                <View style={{marginBottom: 20, width: 150}}>
                    <Button
                        title="Se connecter"
                        onPress={Login}
                        color="powderblue"
                    />
                </View>
            </View>
        </View>
    );
}

export default Authentication;