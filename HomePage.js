import React, {useState, useEffect} from 'react';
import Text from "react-native-web/src/exports/Text";
import View from "react-native-web/dist/exports/View";
import {TextInput, Button} from 'react-native';
import {Link, Route} from "react-router-native";
import Authentication from "./Authentication";

function HomePage(props) {

    return (
        <View style={{textAlign: 'center', alignItems: 'center'}}>
            <View>
                <Text style={{fontSize: 50}}>Bienvenue sur MessengerCity</Text>
            </View>

            <View style={{margin: 30, height: 200, width: 300, fontSize: 50}}>
                <Button
                    title="Connexion"
                    onPress={() => props.history.push('/Connexion')}
                    color='powderblue'

                />
            </View>

        </View>
    )

}

export default HomePage;