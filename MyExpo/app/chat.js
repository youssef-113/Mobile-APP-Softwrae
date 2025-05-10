import React, {useState} from 'react';
import {
    View, Text, TextInput, TouchableOpacity, ScrollView,
    StyleSheet, KeyboardAvoidingView, Platform, Image, Alert, Dimensions,
} from 'react-native';
import axios from 'axios';
import * as image from 'expo-image-picker';
import {Stack} from "expo-router";
const isWeb = Platform.OS === 'web'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [mess, setMess] = useState('');

    const send = async () => {
        if (mess.trim() === '') return;

        const userMessage = {text: mess, sender: 'user'};
        setMessages(prev => [...prev, userMessage]);
        const s = mess;
        setMess('');

        try {
            const res = await axios.post(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    model: 'openai/gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: `
              You are a helpful pharmacy assistant.
              You only answer questions related to medicines, prescriptions, side effects, or anything related to pharmacy.
              If the user asks anything that is NOT related to pharmacy or medicine, respond with:
              "I can't talk about this."
              `,
                        },
                        {role: 'user', content: s},
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer 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`,
                    },
                }
            );

            const reply = res.data.choices[0].message.content;
            setMessages(prev => [...prev, {text: reply, sender: 'bot'}]);
        } catch (error) {
            console.error('Error from OpenRouter:', error.response?.data || error.message);
            setMessages(prev => [
                ...prev,
                {text: 'Error getting AI response.', sender: 'bot'},
            ]);
        }
    };

    const uploadImage = async () => {
        const permission = await image.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('can not upload image', 'camera access needed to take photos.');
            return;
        }

        Alert.alert(
            'Upload Image',
            'Choose an option',
            [
                {
                    text: 'open camera',
                    onPress: async () => {
                        const result = await image.launchCameraAsync({
                            mediaTypes: image.MediaTypeOptions.Images,
                            quality: 1,
                        });
                        handleImageResponse(result);
                    },
                },
                {
                    text: 'open gallery',
                    onPress: async () => {
                        const result = await image.launchImageLibraryAsync({
                            mediaTypes: image.MediaTypeOptions.Images,
                            quality: 1,
                        });
                        handleImageResponse(result);
                    },
                },
                {text: 'Cancel', style: 'cancel'},
            ],
            {cancelable: true}
        );
    };

    const handleImageResponse = (response) => {
        if (!response.canceled && response.assets?.length) {
            const uri = response.assets[0].uri;
            setMessages(prev => [...prev, {image: uri, sender: 'user'}]);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
            keyboardVerticalOffset={80}
        >
            <ScrollView contentContainerStyle={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <View
                        key={index}
                        style={[
                            styles.messageBubble,
                            msg.sender === 'user' ? styles.userBubble : styles.botBubble,
                        ]}
                    >
                        {msg.text && <Text style={styles.messageText}>{msg.text}</Text>}
                        {msg.image && (
                            <Image
                                source={{uri: msg.image}}
                                style={{width: 200, height: 200, borderRadius: 10, marginTop: 5}}
                            />
                        )}
                    </View>
                ))}
            </ScrollView>
            <Stack.Screen
                options={{
                    headerStyle:styles.headerStyle,
                    headerBackVisible: true,
                    headerTitle: () => (
                        <View style={styles.forView}>
                            <Text style ={ styles.forText}>
                                Chat
                            </Text>
                            <Image
                                source={require('../assets/images/final transparent.png')}
                                style ={styles.logo}
                            />
                        </View>
                    ),
                }}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message"
                    value={mess}
                    onChangeText={setMess}
                />
                <TouchableOpacity onPress={send} style={styles.sendButton}>
                    <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={uploadImage} style={styles.imageButton}>
                    <Text style={{fontSize: 20}}>📷</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({

    headerStyle: {
        backgroundColor: '#5B9BD5',
        height: isWeb? 100 : 120,

    },
    board: {
        width: isWeb ? Math.min(1000, width * 0.9) : width * 1.5,
        height: 300,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        alignSelf: 'center',
    },

    logo: {
        width: isWeb ? 400 : width * 0.6,
        height: isWeb ? 400 : height * 2.5,
        marginLeft: isWeb? 650 : -20,
        resizeMode: 'contain',
        alignSelf: 'center',
    },


    forText:{
        color: '#191716',
        fontWeight: 'bold',
        marginRight: isWeb ? 20 : 40,
        fontSize: isWeb ? 18 : 16,
    },
    forView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: isWeb ? 'flex-start' : 'center',
        width: '100%',
    },

    imageButton: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    },


    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#2346bc',
    },

    botBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#000000',
    },

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    messagesContainer: {
        flexGrow: 1,
        padding: 16,
        justifyContent: 'flex-end',
    },
    messageBubble: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    messageText: {
        color: '#fff'
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
    },
    input: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#eee',
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        justifyContent: 'center',
    },
    sendText: {
        color: 'white',
        fontWeight: 'bold'
    },
});
