import { useState } from 'react'
import { View, Text, StyleSheet, PanResponder, TouchableOpacity} from 'react-native'
import { useSelector } from 'react-redux'
import { ItemInterface } from '../events/eventItem/eventItem';
import { EventPage, setStateActionCreator } from '../../../../redux/eventReducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

type Props = {
    date: Date;
    setDate: (date: Date) => void;
}

const CalendarSwiper: React.FC<Props> = ({date, setDate}) => {
    const [position, setPosition] = useState<number>(-400)
    const [items, setItems] = useState<ItemInterface[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    const loaded = true

    const gotItems = useSelector((state: EventPage) => state.eventComponent.eventActiveItems)

    useEffect(() => {
        fetchData()
    },[loaded])

    const fetchData = async () => {
        const serverUrl = 'http://localhost:4000/events'; // Адреса вашого сервера
    
        try {
            const response = await axios.get(serverUrl);
    
            if (response.status === 200) {
                const events = response.data;
                dispatch(setStateActionCreator(events))
                setItems(StringToDate(events))
                setIsLoading(false)
            } else {
                console.error('Помилка при отриманні списку подій.');
            }
        } catch (error) {
            console.error('Помилка при відправці запиту на сервер:', error);
        }
    }

    const StringToDate = (array: ItemInterface[]) => {
        array.forEach((item) => {
            item.start = new Date(item.start)
        })
        return array
    }

    const firstDayOfCurrentWeek = (date: Date): Date => {
        let dateData = new Date(date)
        const dayOfCurrentDate = dateData.getDay() === 0 ? 6 : date.getDay() - 1
        const yearOfCurrentDate = dateData.getFullYear() 
        const numberOfCurrentDate = dateData.getDate()
        const monthOfCurrentDate = dateData.getMonth()
        const numOfDaysLastMonth = new Date(yearOfCurrentDate, monthOfCurrentDate, 0).getDate()

        if(numberOfCurrentDate - dayOfCurrentDate > 0) {
            dateData.setDate(numberOfCurrentDate - dayOfCurrentDate) 
        } else {
            if (monthOfCurrentDate != 0) {
                dateData.setMonth(monthOfCurrentDate - 1)
                dateData.setDate(numOfDaysLastMonth + (numberOfCurrentDate - dayOfCurrentDate))
            } else {
                dateData.setMonth(11)
                dateData.setDate(numOfDaysLastMonth + (numberOfCurrentDate - dayOfCurrentDate))
                dateData.setFullYear(yearOfCurrentDate - 1)
            }
        } 
        return dateData
    }   

    const weeks: Date[][] = [[], [], [], [], [], [], [], [], []];

    const getWeeks = (date: Date, weeks: Date[][]) => {
        for(let i = -4; i <= 4; i++){
            for(let j = 0; j <= 6; j++) {
                weeks[i + 4].push(new Date(firstDayOfCurrentWeek(date).getTime() + 24 * 60 * 60 * 1000 * (i * 7 + j)))
            }
        }
    }

    getWeeks(date, weeks)

    const onNumPress = (date: Date) => {
        setDate(date)
        setPosition(-400)
    }

    const swipeRight = () => {
        if(position > -800){
            setPosition(position - 100)
        }
    }

    const swipeLeft = () => {
        if(position < 0){
            setPosition(position + 100)
        }
    }

    const generateEventComponents = (items: ItemInterface[] | [], day: Date) => {
            return items.map((item: ItemInterface) => {
                if (
                    item.start.getFullYear() === day.getFullYear() &&
                    item.start.getDate() === day.getDate() &&
                    item.start.getMonth() === day.getMonth()
                ) {
                return (
                    <View
                    key={item.id}
                    style={{
                        backgroundColor: item.color,
                        ...styles.eventCard,
                    }}
                    >
                    </View>
                )}
        return null;
        })
    }
      

    return (
        <View>
            {isLoading?
            <Text>loading</Text>
            :
            <View style={styles.swiper__container}>
                 <TouchableOpacity
                     onPress={swipeRight}
                     style={styles.nextWeek}
                 >
                     <Text style={styles.nextWeek__text}>next week {'>'}</Text>
                 </TouchableOpacity>
                 <TouchableOpacity
                     onPress={swipeLeft}
                     style={styles.previousWeek}
                 >
                     <Text style={styles.previousWeek__text}>{'<'} previous week</Text>
                 </TouchableOpacity>
                 <View
                     style={{left: position.toString() + '%' , ...styles.swiper} as any}  
                 >
                     {weeks.map((week: Date[]) => 
                         <View style={styles.swiper__week}
                             key={week[0].toString()}
                         >
                             <TouchableOpacity style={styles.swiper__item}
                                 onPress={() => onNumPress(week[0])}
                             >
                                 <Text style={styles.swiper__title}>Mon</Text>
                                 <View style={[styles.swiper__day, week[0].getDate() === date.getDate() && styles.swiper__day_active]}>
                                     <Text>{week[0].getDate()}</Text>
                                 </View>
                                 <View style={styles.eventCard__container}>
                                     {generateEventComponents(items, week[0])}
                                 </View>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.swiper__item}
                                 onPress={() => onNumPress(week[1])}
                             >
                                 <Text style={styles.swiper__title}>Tue</Text>
                                 <View style={[styles.swiper__day, week[1].getDate() === date.getDate() && styles.swiper__day_active]}>
                                     <Text>{week[1].getDate()}</Text>
                                 </View>
                                 <View style={styles.eventCard__container}>
                                     {generateEventComponents(items, week[1])}
                                 </View>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.swiper__item}
                                 onPress={() => onNumPress(week[2])}
                             >
                                 <Text style={styles.swiper__title}>Wed</Text>
                                 <View style={[styles.swiper__day, week[2].getDate() === date.getDate() && styles.swiper__day_active]}>
                                     <Text>{week[2].getDate()}</Text>
                                 </View>
                                 <View style={styles.eventCard__container}>
                                     {generateEventComponents(items, week[2])}
                                 </View>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.swiper__item}
                                 onPress={() => onNumPress(week[3])}
                             >
                                 <Text style={styles.swiper__title}>Thu</Text>
                                 <View style={[styles.swiper__day, week[3].getDate() === date.getDate() && styles.swiper__day_active]}>
                                     <Text>{week[3].getDate()}</Text>
                                 </View>
                                 <View style={styles.eventCard__container}>
                                     {generateEventComponents(items, week[3])}
                                 </View>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.swiper__item}
                                 onPress={() => onNumPress(week[4])}
                             >
                                 <Text style={styles.swiper__title}>Fri</Text>
                                 <View style={[styles.swiper__day, week[4].getDate() === date.getDate() && styles.swiper__day_active]}>
                                     <Text>{week[4].getDate()}</Text>
                                 </View>
                                 <View style={styles.eventCard__container}>
                                     {generateEventComponents(items, week[4])}
                                 </View>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.swiper__item}
                                 onPress={() => onNumPress(week[5])}
                             >
                                 <Text style={styles.swiper__title}>Sat</Text>
                                 <View style={[styles.swiper__day, week[5].getDate() === date.getDate() && styles.swiper__day_active]}>
                                     <Text>{week[5].getDate()}</Text>
                                 </View>
                                 <View style={styles.eventCard__container}>
                                     {generateEventComponents(items, week[5])}
                                 </View>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.swiper__item}
                                 onPress={() => onNumPress(week[6])}
                             >
                                 <Text style={styles.swiper__title}>Sun</Text>
                                 <View style={[styles.swiper__day, week[6].getDate() === date.getDate() && styles.swiper__day_active]}>
                                     <Text>{week[6].getDate()}</Text>
                                 </View>
                                 <View style={styles.eventCard__container}>
                                     {generateEventComponents(items, week[6])}
                                 </View>
                             </TouchableOpacity>
                         </View>
                     )}
                 </View >
             </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    swiper__container: {
        height: 120
    },
    swiper: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        width: '700%',
        marginTop: 20,
    },
    swiper__week: {
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        width: '14.28%',
    },
    swiper__item: {
       width: '14.27%',
       alignItems: 'center'
    },
    swiper__title: {
        fontFamily: 'Futura',
        color: '#73E2EA',
        fontWeight: '700',
        marginBottom: 10
    },
    swiper__day: {
        fontFamily: 'Futura',
        width: 25,
        height: 25,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swiper__day_active: {
        backgroundColor: '#D9D9D9',
    },
    nextWeek: {
        position: 'absolute',
        right: 10,
        top: -5
    },
    nextWeek__text: {
        color: '#D9D9D9'
    },
    previousWeek: {
        position: 'absolute',
        left: 10,
        top: -5
    },
    previousWeek__text: {
        color: '#D9D9D9'
    },
    eventCard: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginTop: 10,
        marginRight: -4
    },
    eventCard__container: {
        flexDirection: 'row',
        marginRight: 5,
        backgroundColor: 'white',
        height: 10
    }
})

export default CalendarSwiper;