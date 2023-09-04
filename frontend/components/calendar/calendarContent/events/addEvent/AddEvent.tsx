import { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import HourSlider from './HourSlider.tsx/HourSlider'
import { useDispatch } from 'react-redux';
import { AddEventActionCreator, UpdateDateActionCreator } from '../../../../../redux/eventReducer';
import ChangeIcon from './changeIcon/ChangeIcon';
import axios from 'axios'
import { ItemInterface } from '../eventItem/eventItem';


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
    const [chooseIcon, setChooseIcon] = useState<boolean>(false)
    const [icon, setIcon] = useState<string>('')
    const [color, setColor] = useState<string>('rgba(155, 155, 155, 0.5)')
    const [start, setStart] = useState<start>({hour: 12, minute: 0, id: '1002010012'})
    const [images, setImages] = useState<{name: string, type: string}[]>([]);

    const serverUrl = 'http://localhost:4000'
    
    useEffect(() => {
        fetchImages();
      }, []);
    
      async function fetchImages() {
        try {
            const response = await fetch('http://localhost:4000/images/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const imagesData = await response.json();
            setImages(imagesData);
            setIcon(imagesData[0].name)
        } catch (error: any) {
            console.error('Помилка при отриманні зображень:', error.message);
        }
    }

    const dispatch = useDispatch()

    function generateRandomNumber(): number {
        const randomNumber: number = Math.floor(Math.random() * 90000000) + 10000000;
        return randomNumber;
    }

    const getEventDate = (): Date => {
        const eventDate = new Date(date)
        eventDate.setHours(start.hour)
        eventDate.setMinutes(start.minute)
        return eventDate 
    }

    const addEvent = () => {
        const eventData = {
            id: generateRandomNumber().toString(),
            title: title,
            start: getEventDate(),
            time: 60,
            color: color,
            description: description,
            done: false,
            icon: icon
        }
        if(eventData.title.length > 0){
            sendEventToServer(eventData)
        } else {
            alert('provide title!')
        }
    }

    async function sendEventToServer(eventData: ItemInterface) {
    
        try {
            const response = await axios.post(`${serverUrl}/events`, eventData);
    
            if (response.status === 201) {
                dispatch(AddEventActionCreator(eventData))
                setDisplay()
                setTitle('')
                setStart({hour: 12, minute: 0, id: ''})
                setColor('rgba(155, 155, 155, 0.5)')
                setIcon('./changeIcon/coffee.png')
                setDescription('')
                dispatch(UpdateDateActionCreator(date))
            } else {
                console.error('event error');
            }
        } catch (error) {
            console.error('error', error);
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
                        onPress={() => setChooseIcon(true)}
                        style={{...styles.changeIcon, backgroundColor: color}}
                    >
                        <Image
                            style={styles.changeIcon__image}
                            source={{
                                uri: `http://localhost:4000/${icon}`
                            }}
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
                    onPress={addEvent}
                    style={styles.addEvent__submit}
                >
                    <Text
                        style={styles.addEvent__submitText}
                    >add event</Text>
                </TouchableOpacity>
            </ScrollView>
            {chooseIcon?
                <ChangeIcon imageData={images} close={() => setChooseIcon(false)} setActive={setIcon}/>
                :
                <></>
            }        
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


