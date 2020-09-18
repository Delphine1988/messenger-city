import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Location from 'expo-location';
import {NativeRouter, Link, Route, Switch} from 'react-router-native';
import HomePage from './HomePage';
import Authentication from './Authentication';
import Message from "./Message";
import MessageCity from "./MessageCity";



function App() {

    const [token, setToken] = useState(null)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const[cityCode, setCityCode] = useState(null)
    const [lastMessage, setLastMessage] = useState(null)
    const [category, setCategory] = useState(1)
    return (
        <View style={styles.container}>
            <NativeRouter>

                <Switch>

                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/Connexion"><Authentication setCityCode={setCityCode} setToken={setToken} setLatitude={setLatitude}  setLongitude={setLongitude}/>
                    </Route>
                    <Route exact path="/MessageCity"><MessageCity citycode={cityCode} category={category} last_message={lastMessage} token={token} setLastMessage={setLastMessage}/></Route>

                </Switch>
            </NativeRouter>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default App;