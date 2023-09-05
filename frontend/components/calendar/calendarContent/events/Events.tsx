import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { AddEventActionCreator, DeleteEventActionCreator, UpdateDateActionCreator } from "../../../../redux/eventReducer";
import EventItem, { ItemInterface } from "./eventItem/eventItem";
import { EventPage } from "../../../../redux/eventReducer";
import axios from "axios";

type Props = {
    date: Date;
    setAddEvent: (arg: boolean) => void;
}

const Events: React.FC<Props> = ({date, setAddEvent}) => {
    const [eventInfoItem, setEventInfoItem] = useState<ItemInterface>()
    const [eventInfoDisplay, setEventInfoDisplay] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getEventInfo = (data: ItemInterface) => {
        setEventInfoItem(data)
        setEventInfoDisplay(true)
    }

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

    const deleteEventItem = (item: any) => {
        dispatch(DeleteEventActionCreator(item.id))
        setEventInfoDisplay(false)
        dispatch(UpdateDateActionCreator(date))

        const deleteEventById = async (item: any, date: Date) => {
            const serverUrl = `http://localhost:4000/events/${item.id}`;
          
            try {
              const response = await axios.delete(serverUrl);         
              if (response.status === 204) {
                console.log('deleted')                
                } else {
                    console.error('error on server');
                    dispatch(AddEventActionCreator(item))
                    dispatch(UpdateDateActionCreator(date))
                }
            } catch (error) {
                console.error('error during fetching:', error);
                dispatch(AddEventActionCreator(item))
                dispatch(UpdateDateActionCreator(date))
            }
        };
        deleteEventById(item, date)
    }

    const activeSortedItems = activeItems? bubbleSort(activeItems) : activeItems

    return (
        <View style={styles.events__container}>
            <ScrollView style={styles.events}
                showsVerticalScrollIndicator={false}
            >
                {activeSortedItems?.map((e: ItemInterface) => 
                    <EventItem getEventInfo={getEventInfo} key={e.id} item={e} />
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
            {eventInfoItem? 
                <View style={{...styles.eventItem__info, display: eventInfoDisplay? 'flex' : 'none'}}>
                    <View style={styles.eventInfo__close_container}>
                    <TouchableOpacity 
                        onPress={() => setEventInfoDisplay(false)}
                        style={styles.eventInfo__close}>
                        <Image
                            style={styles.eventInfo__close_img}
                            source={require('./../../calendarPopup/close.png')}
                        />
                    </TouchableOpacity>
                </View>
                    <Text style={styles.eventInfoItem__title} >{eventInfoItem.title}</Text>
                    <Text style={styles.eventInfoItem__start}>{eventInfoItem.start.getHours()}:{eventInfoItem?.start.getMinutes()}</Text>
                    <Text style={styles.eventInfoItem__description}>{eventInfoItem.description}</Text>
                    <TouchableOpacity
                        onPress={() => deleteEventItem(eventInfoItem)}
                        style={styles.eventItem__delete}
                    >
                        <Image
                            style={styles.eventItem__delete_img}
                            source={require('./delete.png')}
                        />
                    </TouchableOpacity>
                </View>
            :
                <View style={{display: 'none'}}></View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    eventItem__info: {
        position: 'absolute',
        marginTop: -50,
        left: 20,
        minHeight: 250,
        backgroundColor: 'white',
        width: '100%',
        top: 0,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 3,
    },
    eventInfo__close_container: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    eventInfo__close:{
        padding: 7.5,
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D9D9D9'
    },
    eventInfo__close_img: {
        width: 20,
        height: 20,
    },
    eventInfoItem__title: {
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'Futura'
    },
    eventInfoItem__start: {
        textAlign: 'right',
        color: 'rgba(155, 155, 155, 0.8)',
        paddingRight: 10
    },
    eventInfoItem__description: {
        backgroundColor: 'rgba(155, 155, 155, 0.6)',
        flex: 1,
        borderRadius: 30,
        margin: 5,
        padding: 10
    },
    eventItem__delete: {
        width: '100%',
        height: 50,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.5)'
    },
    eventItem__delete_img: {
        height: 40,
        width: 40
    },
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