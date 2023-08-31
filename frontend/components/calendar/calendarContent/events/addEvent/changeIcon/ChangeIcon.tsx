import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import SvgUri from 'react-native-svg-uri';

type Props = {
    setActive: (id: string) => void;
    imageData: {id: string, imagePath: string}[]
}

const ChangeIcon: React.FC<Props> = ({setActive, imageData}) => {
    console.log(imageData)
    return (
        <ScrollView style={styles.icons}>
            <View style={styles.icons__container}>
                {imageData.map((imageItem) => 
                    <TouchableOpacity
                        style={styles.icons__image_container}
                    >
                        {/* <SvgUri 
                            width='100'
                            height='100'
                            source={{ uri: `../../../../../../../backend/addImages/${imageItem.imagePath}` }}
                        /> */}
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
        backgroundColor: 'white',
        flex: 1,
        minHeight: 20,
        flexDirection: 'row',
        justifyContent:'space-around',
        flexWrap: 'wrap'
    },
    icons__image_container: {
        width: 100,
        height: 100,
        backgroundColor: 'gray'
    }
})

export default ChangeIcon;