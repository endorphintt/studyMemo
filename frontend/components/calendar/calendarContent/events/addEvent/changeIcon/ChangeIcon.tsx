import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from "react-native";

type Props = {
    setActive: (name: string) => void;
    imageData: {name: string, type: string}[];
    close: () => void
}

const ChangeIcon: React.FC<Props> = ({setActive, imageData, close}) => {
    console.log(imageData)
    return (
        <ScrollView style={styles.icons}>
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
        backgroundColor: 'blue',
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
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icons__image: {
        width: 60,
        height: 60
    }
})

export default ChangeIcon;