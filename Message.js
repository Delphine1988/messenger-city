import React, {useState, useEffect} from 'react';
import View from "react-native-web/src/exports/View";
import Text from "react-native-web/src/exports/Text";
import TextInput from "react-native-web/dist/exports/TextInput";
import {Button} from "react-native-web";
import MessageCity from "./MessageCity";
import Axios from "axios";
import {useHistory} from 'react-router-native';

function Message(props) {


    const [currentMessage, setCurrentMessage] = useState("");
    const category = props.category;
    const token = props.token;
    const cityCode = props.cityCode;
    const setLastMessage = props.setLastMessage;
    const history = useHistory();


    function postMessage() {

        Axios.post("https://api.dunarr.com/api/messages",
            {
                message: currentMessage,
                category: category,
                citycode: cityCode
            },
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(response => {
            setLastMessage(response.data.id)

        })

    }


    return (
        <View style={{alignItems: 'center'}}>

            <View style={{margin: 20}}><Text style={{fontSize: 30}}>Message</Text></View>
            <View>
                <TextInput
                    onChangeText={setCurrentMessage}
                    value={currentMessage}
                    style={{textAlign: "center", height: 100, width: 300, borderColor: 'purple', borderWidth: 1}}
                ></TextInput>
            </View>
            <View style={{margin: 20, height: 25, width: 150}}>
                <Button
                    onPress={postMessage}
                    title="Envoyer"
                    color="purple"
                />
            </View>

        </View>)
}

export default Message;