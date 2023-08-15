import { StyleSheet, Image, View, Animated, Easing } from 'react-native';
import { useEffect } from 'react';

const Intro = () => {
    const scaleValue = new Animated.Value(1)

    const pulsating = () => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1.1,
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),

            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start(() => {
            pulsating()
        })
    }

    useEffect(() => {
        pulsating();
    })

    const animatedStyle = {
        transform: [{ scaleX: scaleValue }, { scaleY: scaleValue }],
    };
    
    return(
        <View style={styles.intro}>
            <Animated.Image
                source={require('./logo.png')}
                style={{
                    width: 120,
                    height: 115,
                    ...animatedStyle,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    intro: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#73E2EA',
    },
    // intro__logo: {
        
    // }
});

export default Intro;