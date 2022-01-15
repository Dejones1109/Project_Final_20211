import React, {useState} from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Storage from './firebase/storage';
import TextBase from "./components/TextBase";


export default function TestScreen1() {
    const [image, setImage] = useState(null);
    const [transferred, setTransferred] = useState(0);

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <TextBase>{transferred}</TextBase>
        </View>
    );
}

