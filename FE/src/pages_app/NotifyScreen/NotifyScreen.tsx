import React from 'react';
import {ScrollView, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {HStack} from "native-base";

export default function NotifyScreen() {

    const gcStores = ["1", "2", "3", "4", "5", "6", "7"];

    return (
        <HStack>
            <ScrollView
                horizontal
                contentContainerStyle={styles.scrollView}
            >
                {gcStores.map((obj, index) => (
                    <TouchableOpacity key={index} style={styles.nearbyStoresItems}>
                        <Text
                            style={[styles.nearbyStoresImages]}
                        >
                            {obj}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </HStack>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginTop: 7,
        paddingHorizontal: 7,
        borderWidth: 3
    },
    nearbyStoresItems: {
        marginHorizontal: 2,
        borderColor: '#1D5098'
    },
    nearbyStoresImages: {
        width: 80,
        height: 80,
        backgroundColor: 'gray'
    },
});
