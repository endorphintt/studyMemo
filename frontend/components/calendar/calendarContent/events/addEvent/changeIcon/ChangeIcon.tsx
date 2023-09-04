import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from "react-native";

type Props = {
    setActive: (name: string) => void;
    imageData: {name: string, type: string}[];
    close: () => void
}

const ChangeIcon: React.FC<Props> = ({setActive, imageData, close}) => {
    return (
        <ScrollView style={styles.icons}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.changeIcon__close_container}>
                <TouchableOpacity 
                    onPress={() => close()}
                    style={styles.changeIcon__close}>
                    <Image
                        style={styles.changeIcon__close_img}
                        source={require('../../../../calendarPopup/close.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.icons__container}>
                {imageData.map((imageItem) => 
                    <TouchableOpacity
                        style={styles.icons__image_container}
                        key={imageItem.name}
                        onPress={() => {
                            setActive(imageItem.name)
                            close()
                        }}
                    >
                        <Image
                            style={styles.icons__image}
                            source={{
                                uri: `http://localhost:4000/${imageItem.name}`
                            }}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    icons: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    icons__container: {
        margin: 10,
        flex: 1,
        minHeight: 20,
        flexDirection: 'row',
        justifyContent:'space-around',
        flexWrap: 'wrap'
    },
    icons__image_container: {
        borderRadius: 40,
        backgroundColor: 'rgba(155, 155, 155, 0.6)',
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    icons__image: {
        width: 50,
        height: 50
    },
    changeIcon__close_container: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(155, 155, 155, 0.1)'
    },
    changeIcon__close:{
        padding: 7.5,
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D9D9D9'
    },
    changeIcon__close_img: {
        width: 20,
        height: 20,
    },
})

export default ChangeIcon;