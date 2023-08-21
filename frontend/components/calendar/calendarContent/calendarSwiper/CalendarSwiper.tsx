import { useState } from 'react'
import { View, Text, StyleSheet, PanResponder, TouchableOpacity} from 'react-native'

type Props = {
    date: Date;
    setDate: (date: Date) => void;
}

const CalendarSwiper: React.FC<Props> = ({date, setDate}) => {
    const [position, setPosition] = useState<number>(-400)
    const [isSwiping, setIsSwiping] = useState<boolean>(false)
    const HourOfCurrentDay = date.getHours()
    const minuteOfCurrentDate = date.getMinutes()

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

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponderCapture: () => !isSwiping,
        onMoveShouldSetPanResponderCapture: () => !isSwiping,
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dx < -50 && position > -800) {
            // Свайп вліво
            if (!isSwiping) {
              setIsSwiping(true);
              setPosition(position - 100);
            }
          } else if (gestureState.dx > 50 && position < 0) {
            // Свайп вправо
            if (!isSwiping) {
              setIsSwiping(true);
              setPosition(position + 100);
            }
          }
        },
        onPanResponderRelease: () => {
          setIsSwiping(false);
        },
      });   

    return (
        <View
            style={{left: position.toString() + '%' , ...styles.swiper} as any} 
            {...panResponder.panHandlers}  
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
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.swiper__item}
                        onPress={() => onNumPress(week[1])}
                    >
                        <Text style={styles.swiper__title}>Tue</Text>
                        <View style={[styles.swiper__day, week[1].getDate() === date.getDate() && styles.swiper__day_active]}>
                            <Text>{week[1].getDate()}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.swiper__item}
                        onPress={() => onNumPress(week[2])}
                    >
                        <Text style={styles.swiper__title}>Wed</Text>
                        <View style={[styles.swiper__day, week[2].getDate() === date.getDate() && styles.swiper__day_active]}>
                            <Text>{week[2].getDate()}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.swiper__item}
                        onPress={() => onNumPress(week[3])}
                    >
                        <Text style={styles.swiper__title}>Thu</Text>
                        <View style={[styles.swiper__day, week[3].getDate() === date.getDate() && styles.swiper__day_active]}>
                            <Text>{week[3].getDate()}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.swiper__item}
                        onPress={() => onNumPress(week[4])}
                    >
                        <Text style={styles.swiper__title}>Fri</Text>
                        <View style={[styles.swiper__day, week[4].getDate() === date.getDate() && styles.swiper__day_active]}>
                            <Text>{week[4].getDate()}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.swiper__item}
                        onPress={() => onNumPress(week[5])}
                    >
                        <Text style={styles.swiper__title}>Sat</Text>
                        <View style={[styles.swiper__day, week[5].getDate() === date.getDate() && styles.swiper__day_active]}>
                            <Text>{week[5].getDate()}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.swiper__item}
                        onPress={() => onNumPress(week[6])}
                    >
                        <Text style={styles.swiper__title}>Sun</Text>
                        <View style={[styles.swiper__day, week[6].getDate() === date.getDate() && styles.swiper__day_active]}>
                            <Text>{week[6].getDate()}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View >
    )
}

const styles = StyleSheet.create({
    swiper: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        width: '700%',
        marginTop: 20,
    },
    swiper__week: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        width: '14.28%',
    },
    swiper__item: {
       width: '14.27%',
       justifyContent: 'center',
       alignItems: 'center',
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
    }
})

export default CalendarSwiper;