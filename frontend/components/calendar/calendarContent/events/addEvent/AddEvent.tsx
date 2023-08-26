import { useState } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import HourSlider from './HourSlider.tsx/HourSlider'
import { useDispatch } from 'react-redux';
import { AddEventActionCreator, UpdateDateActionCreator } from '../../../../../redux/eventReducer';

type Props = {
    display: boolean,
    setDisplay: () => void;
    date: Date;
}

type start = {
    hour: number;
    minute: number;
    id: string
}

const AddEvent: React.FC<Props> = ({display, setDisplay, date}) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [icon, setIcon] = useState<string>('./changeIcon/coffee.png')
    const [color, setColor] = useState<string>('rgba(155, 155, 155, 0.5)')
    const [start, setStart] = useState<start>({hour: 12, minute: 0, id: '1002010012'})

    const dispatch = useDispatch()

    function generateRandomNumber(): number {
        const randomNumber: number = Math.floor(Math.random() * 90000000) + 10000000;
        return randomNumber;
    }

    const getEventDate = (date: Date, hour: number, minute: number): Date => {
        const eventDate = new Date(date)
        eventDate.setHours(hour)
        eventDate.setMinutes(minute)
        return eventDate 
    }

    const AddEvent = () => {
        if(title.length > 0){
            const data = {
                id: generateRandomNumber().toString(),
                title: title,
                start: getEventDate(date, start.hour, start.minute),
                time: 60,
                color: color,
                description: description,
                done: false,
                icon: 'none'
            }
            dispatch(AddEventActionCreator(data))
            setDisplay()
            setTitle('')
            setStart({hour: 12, minute: 0, id: '1002010012'})
            setColor('rgba(155, 155, 155, 0.5)')
            setIcon('./changeIcon/coffee.png')
            setDescription('')
            dispatch(UpdateDateActionCreator(date))
        } else {
            alert('provide title!')
        }
    }

    const colors = ['rgba(222, 192, 36, 0.5)',
                    'rgba(222, 70, 36, 0.5)', 
                    'rgba(36, 144, 222, 0.5)', 
                    'rgba(196, 36, 222, 0.5)', 
                    'rgba(222, 36, 81, 0.5)', 
                    'rgba(84, 222, 36, 0.5)', 
                    'rgba(36, 177, 222, 0.5)', 
                    'rgba(1, 31, 106, 0.52)',]

    return (
        <View style={{...styles.addEvent, display: display ? 'flex' : 'none'}}>
            <ScrollView style={styles.addEvent__scroll}>
                <View style={styles.addEvent__close_container}>
                    <TouchableOpacity 
                        onPress={setDisplay}
                        style={styles.addEvent__close}>
                        <Image
                            style={styles.addEvent__close_img}
                            source={require('./../../../calendarPopup/close.png')}
                        />
                    </TouchableOpacity>
                </View>
                <Text
                    style={styles.addEvent__sign}
                >title and icon</Text>
                <View style={styles.addEvent__header}>
                    <TouchableOpacity
                        style={{...styles.changeIcon, backgroundColor: color}}
                    >
                        <Image
                            style={styles.changeIcon__image}
                            source={require('./changeIcon/coffee.png')}
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder=""
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        style={styles.addEvent__title}
                    />
                </View>
                <HourSlider active={start} setActive={setStart} />
                <Text
                    style={styles.addEvent__sign}
                >Color</Text>
                <View style={styles.addEvent__color_container}>
                    {colors.map((item: string) => 
                        <TouchableOpacity
                            key={item}
                            style= {{...styles.addEvent__color, backgroundColor: item}}
                            onPress={() => setColor(item)}
                        >
                        </TouchableOpacity>
                    )}
                </View>
                <Text
                    style={styles.addEvent__sign}
                >Deskription (optional)</Text>
                <TextInput
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    multiline={true}
                    style={styles.addEvent__text}
                />
                <TouchableOpacity
                    onPress={AddEvent}
                    style={styles.addEvent__submit}
                >
                    <Text
                        style={styles.addEvent__submitText}
                    >add event</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    addEvent: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderTopRightRadius: 20,
        borderTopRightLeft: 20,
        backgroundColor: 'white',
        left: 0,
        shadowColor: 'rgba(115, 226, 234, 1)', 
        shadowOffset: {
        width: 10,
        height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 5, 
    },
    addEvent__scroll: {
        padding: 10,
        flexDirection: 'column',
    },
    addEvent__sign: {
        fontSize: 25,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10,
        color: 'rgba(115, 226, 234, 1)',
        fontFamily: 'Futura'
    },
    addEvent__header: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        marginBottom: 10,
    },
    changeIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    changeIcon__image: {
        width: 40,
        height: 40,
    },
    addEvent__title: {
        height: 50,
        marginLeft: 10,
        flex: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize: 20,
        textAlign: 'center'
    },
    addEvent__text: {
        marginVertical: 30,
        width: '100%',
        borderRadius: 20,
        backgroundColor: 'rgba(155, 155, 155, 0.5)',
        height: 200,
        padding: 10,
        fontSize: 20
    },
    addEvent__color_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 30,
    },
    addEvent__color: {
        width: 25,
        height: 25,
        borderRadius: 12.5
    },
    addEvent__submit: {
        marginBottom: 100,
        marginHorizontal: '10%',
        width: '80%',
        height: 50,
        backgroundColor: 'rgba(115, 226, 234, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    addEvent__submitText: {
        fontSize: 20,
        color: 'white',
        textTransform: 'uppercase',
        letterSpacing: 2
    },
    addEvent__close_container: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    addEvent__close:{
        padding: 7.5,
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D9D9D9'
    },
    addEvent__close_img: {
        width: 20,
        height: 20,
    },
})

export default AddEvent;