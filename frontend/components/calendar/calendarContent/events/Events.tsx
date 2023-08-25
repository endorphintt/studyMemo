import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { UpdateDateActionCreator } from "../../../../redux/eventReducer";
import { reducers } from "../../../../redux/redux_store";
import EventItem, { ItemInterface } from "./eventItem/eventItem";
import { EventPage } from "../../../../redux/eventReducer";

type Props = {
    date: Date;
    setAddEvent: (arg: boolean) => void;
}

const Events: React.FC<Props> = ({date, setAddEvent}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(UpdateDateActionCreator(date))
    }, [date])

    const activeItems = useSelector((state: EventPage) => state.eventComponent.eventActiveItems)

    const bubbleSort = (arr: ItemInterface[]): ItemInterface[] => {
        const len = arr.length;
    
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (arr[j].start > arr[j + 1].start) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
    
        return arr;
    }

    const activeSortedItems = bubbleSort(activeItems)

    return (
        <View style={styles.events__container}>
            <ScrollView style={styles.events}
                showsVerticalScrollIndicator={false}
            >
                {activeSortedItems.map((e: ItemInterface) => 
                    <EventItem key={e.id} item={e} />
                )}
            </ScrollView>
            <View style={styles.addEvent_container} >
                <TouchableOpacity
                        style={styles.addEvent}
                        onPress={() => setAddEvent(true)}
                    >
                        <Text style={styles.addEvent__text}>{'+'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    events: {
        flex: 1,
        position: 'relative',
    },
    events__container: {
        flex: 1,
        backgroundColor: 'rgba(115, 226, 234, 0.58)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'column',
        padding: 20,
        overflow: 'visible',
        paddingBottom: 100
    },
    addEvent_container: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-end',
        zIndex: 10,
    },
    addEvent: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 25,       
    },
    addEvent__text: {
        fontSize: 30,
        color: '#73E2EA',      
    }
})

export default Events;