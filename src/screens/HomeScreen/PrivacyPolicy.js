import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';

const PrivacyPolicy = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text>PRIVACY POLICY</Text>
            </View>
            <Text style={styles.text}>
                <Text style={styles.capitalLetter}>
                    L
                </Text>

                <Text>
                    orem ipsum dolor sit amet, sed do eiusmod.
                </Text>

                <Text>
                    Ut enim ad <Text style={styles.wordBold}>minim </Text> veniam,
                    quis aliquip ex ea commodo consequat.
                </Text>

                <Text style={styles.italicText}>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
                </Text>

                <Text style={styles.textShadow}>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </Text>
            </Text>

        </View>
    )
}
export default PrivacyPolicy;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 100,
        padding: 20
    },
    text: {
        color: '#41cdf4',
    },
    capitalLetter: {
        color: 'red',
        fontSize: 20
    },
    wordBold: {
        fontWeight: 'bold',
        color: 'black'
    },
    italicText: {
        color: '#37859b',
        fontStyle: 'italic'
    },
    textShadow: {
        textShadowColor: 'red',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5
    }
})