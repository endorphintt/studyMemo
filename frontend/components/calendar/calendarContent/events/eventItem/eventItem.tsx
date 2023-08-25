import { useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { useDispatch } from "react-redux";
import { UpdateProgressActionCreator } from "../../../../../redux/eventReducer";

export interface ItemInterface {
    id: string;
    title: string;
    start: Date;
    time: number;
    color: string;
    description: string;
    done: boolean;
    icon: string;
}

type Props = {
    item: ItemInterface;
}

const EventItem: React.FC<Props> = ({item}) => {
    const dispatch = useDispatch()
 
    const buttonIsDone = (id: string) => {
        dispatch(UpdateProgressActionCreator(id))
    }

    return(
        <View
            style={{
                ...styles.eventItem,
            }}
        >            
            <View style={styles.eventScrollItem}>   
                <View style={styles.eventItem__content}>
                    <View 
                        style={{...styles.eventIcon__container, backgroundColor: item.color}}     
                    >
                        <Image
                            style={styles.eventIcon}
                            source={require('./coffee.png')}
                        />
                    </View>
                    <Text style={styles.eventItem__title}>
                        {item.title}
                    </Text>
                    <Text style={styles.eventItem__start}>
                        {item.start.getHours() + ':' + item.start.getMinutes()}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => buttonIsDone(item.id)}
                    style={styles.eventItem__button_container}
                >
                    <View
                        style={{...styles.eventItem__button,
                            backgroundColor: item.done? 'white' : 'transparent',
                        }}
                    >
                        <Image
                            style={{
                                ...styles.eventItem__img, 
                                opacity: item.done? 1 : 0,
                            }}
                            source={require('./done.png')} 
                        />
                    </View>
                </TouchableOpacity>
            </View>          
        </View>
    )
}

const styles = StyleSheet.create({
    eventItem: {
        fontSize: 20,
        width: '100%',
        flexGrow: 1,
        borderRadius: 20,
        height: 80,
        overflow: 'hidden', 
        marginBottom: 3,
    },
    eventScrollItem: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    eventItem__content: {
        padding: 10,
        width: '90%',
        position: 'relative',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    eventItem__title: {
        fontSize: 20,
        fontFamily: 'Futura',
    },
    eventItem__start: {
        position: 'absolute',
        left: 80,
        top: 5,
        fontWeight: '600',
        color: 'rgba(155, 155, 155, 0.7)'
    },
    eventItem__button_container: {
        padding: 2,
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventItem__button: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventItem__img: {
        width: 13,
        height: 13
    },
    eventIcon: {
        width: 50,
        height: 50
    },
    eventIcon__container: {
        marginRight: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default EventItem;