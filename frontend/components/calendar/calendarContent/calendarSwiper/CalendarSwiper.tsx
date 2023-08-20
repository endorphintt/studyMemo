import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'

type Props = {
    date: Date;
    setDate: (date: Date) => void;
}

const CalendarSwiper: React.FC<Props> = ({date, setDate}) => {
    const firstDayOfCurrentWeek = (date: Date) => {
        let dateData = new Date(date)
        const dayOfCurrentDate = dateData.getDay() === 0 ? 6 : date.getDay() - 1
        const yearOfCurrentDate = dateData.getFullYear() 
        const numberOfCurrentDate = dateData.getDate()
        const monthOfCurrentDate = dateData.getMonth()
        const numOfDaysLastMonth = new Date(yearOfCurrentDate, monthOfCurrentDate, 0).getDate()
    
        if(numberOfCurrentDate - dayOfCurrentDate >= 0) {
            dateData.setDate(numberOfCurrentDate - dayOfCurrentDate)   
        } else if (numberOfCurrentDate - dayOfCurrentDate < 0) {
            if (monthOfCurrentDate != 0) {
                dateData.setMonth(monthOfCurrentDate - 1)
                dateData.setDate(numOfDaysLastMonth + (numberOfCurrentDate - dayOfCurrentDate))
            } else {
                console.log('setYear')
                dateData.setMonth(11)
                dateData.setDate(numOfDaysLastMonth + (numberOfCurrentDate - dayOfCurrentDate))
                dateData.setFullYear(yearOfCurrentDate - 1)
            }
        } 
        
        return dateData;
    }

    const week = [];

    for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfCurrentWeek(date));
    day.setDate(firstDayOfCurrentWeek(date).getDate() + i);
    week.push(day);
    } 

    return (
        <View style={{left: '-300%' , ...styles.swiper}}>
            {/* {weeks.map((week: Date[]) => 
                <View style={styles.swiper__week}>
                    <View style={styles.swiper__item}>
                        <Text style={styles.swiper__title}>Mon</Text>
                        <Text style={styles.swiper__day}>{week[0].getDate()}</Text>
                    </View>
                    <View style={styles.swiper__item}>
                        <Text style={styles.swiper__title}>Tue</Text>
                        <Text style={styles.swiper__day}>{week[1].getDate()}</Text>
                    </View>
                    <View style={styles.swiper__item}>
                        <Text style={styles.swiper__title}>Wed</Text>
                        <Text style={styles.swiper__day}>{week[2].getDate()}</Text>
                    </View>
                    <View style={styles.swiper__item}>
                        <Text style={styles.swiper__title}>Thu</Text>
                        <Text style={styles.swiper__day}>{week[3].getDate()}</Text>
                    </View>
                    <View style={styles.swiper__item}>
                        <Text style={styles.swiper__title}>Fri</Text>
                        <Text style={styles.swiper__day}>{week[4].getDate()}</Text>
                    </View>
                    <View style={styles.swiper__item}>
                        <Text style={styles.swiper__title}>Sat</Text>
                        <Text style={styles.swiper__day}>{week[5].getDate()}</Text>
                    </View>
                    <View style={styles.swiper__item}>
                        <Text style={styles.swiper__title}>Sun</Text>
                        <Text style={styles.swiper__day}>{week[6].getDate()}</Text>
                    </View>
                </View>
            )} */}
        </View>
    )
}

const styles = StyleSheet.create({
    swiper: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        width: '700%'
    },
    swiper__week: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        width: '14.28%',
    },
    swiper__item: {
       width: '14.27%'
    },
    swiper__title: {},
    swiper__day: {}
})

export default CalendarSwiper;