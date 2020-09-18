import React, {useState, useEffect} from 'react';
import View from "react-native-web/src/exports/View";
import Text from "react-native-web/src/exports/Text";
import Axios from "axios";
import Message from "./Message";
import {FlatList, SafeAreaView} from "react-native";

function MessageCity(props) {
    const cityCode = props.citycode;
    const category = props.category;
    const setLastMessage = props.setLastMessage;
    const token = props.token;
    const [message, setMessage] = useState([])
    const [ListUsers, setListUsers] = useState([])

    useEffect(function () {
        setInterval(getMessages, 2000)
    }, []);
    useEffect(getUsers, [])

    function getMessages() {
        Axios.get("https://api.dunarr.com/api/messages",
            {
                headers: {Authorization: "Bearer " + token},
                params: {
                    "citycode": cityCode,
                    "category": category,
                    // "last_message": 0
                }
            }).then(response => setMessage(response.data.results))
    }

    function getUsers() {
        Axios.get("https://api.dunarr.com/api/users", {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(response => setListUsers(response.data))
    }

    function findUser(authorId) {
        const author = listUsers.find(function (author) {
            authorId === author.id
        })
        return author?.username
    }


    return (

        <SafeAreaView>
            <Message token={token} cityCode={cityCode} setLastMessage={setLastMessage} category={category}/>


            <FlatList
                data={message}
                renderItem={function (data) {
                    return <Text style={{
                        textAlign: 'center',
                        padding: 20,
                        marginHorizontal: 200,
                        marginBottom: 5,
                        color: 'purple',
                        backgroundColor: 'powderblue',
                    }}>
                        {data.item.content}</Text>
                }}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

    )
}


export default MessageCity;