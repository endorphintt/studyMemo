import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'

type Props = {
    year: number;
    setYear: (year: number) => void;
    month: number;
    setMonth: (month: number) => void;
}

const Slider: React.FC<Props> = ({year, setYear, month, setMonth}) => {
    const yearsRef = useRef<ScrollView>(null)
    const monthsRef = useRef<ScrollView>(null)

    const years = Array.from({ length: 100 }, (_, index) => 2020 + index);
    const months = [
        {name: '', index: -3}, {name: '', index: -2}, {name: '', index: -1}, 
        {name: 'January', index: 0}, {name: 'February', index: 1}, {name: 'March', index: 2}, {name: 'April', index: 3},
        {name: 'May', index: 4}, {name: 'June', index: 5}, {name: 'July', index: 6}, {name: 'August', index: 7},
        {name: 'September', index: 8}, {name: 'October', index: 9}, {name: 'November', index: 10}, {name: 'December', index: 11},
        {name: '', index: 12}, {name: '', index: 13}, {name: '', index: 14}, 
    ]

    const onMonthsLayout = () => {
        const selectedMonthsIndex = months.findIndex((item) => item.index === month)
        const scrollMonthsToY = selectedMonthsIndex * 45 - 3 * 45 // 4*45 because selected el should be in centre
        monthsRef.current?.scrollTo({y: scrollMonthsToY, animated: true})
    }
    
    const onYearsLayout = () => {
        const selectedYearsIndex = years.findIndex((item) => item === year)
        const scrollYearsToY = selectedYearsIndex * 45 - 3 * 45 // 4*45 because selected el should be in centre
        yearsRef.current?.scrollTo({y: scrollYearsToY, animated: true})
    }

    const monthsHandleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const yOffset = event.nativeEvent.contentOffset.y;

        months.forEach(mon => {
            if(yOffset >= mon.index * 45 - 15  && yOffset < mon.index * 45 + 30) {
                setMonth(mon.index)
            }
        })
    }

    const yearsHandleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const yOffset = event.nativeEvent.contentOffset.y;

        years.forEach(y => {
            if(yOffset >= ( y - 2023 ) * 45 - 15 && yOffset < ( y - 2023 ) * 45 + 30) {
                setYear(y)
            }
        })
    }

    const getActiveMonthName = () => {
        const activeMonth = months.find(item => item.index === month)
        if (activeMonth) {
            return activeMonth.name;
        } else {
            return 'none';
        }
    }

    return (
        <View style={styles.slider}>
            <ScrollView
                onScroll={monthsHandleScroll}
                style={styles.slider__items}
                ref={monthsRef}
                showsVerticalScrollIndicator={false}
                onLayout={onMonthsLayout}
                scrollEventThrottle={4}
            >   
                {months.map((mon) => 
                    <View style={styles.slider__item} key={mon.index}>
                        <Text style={styles.slider__monthText}>{mon.name? mon.name: ''}</Text> 
                    </View>
                )}
            </ScrollView>
            <ScrollView
                style={styles.slider__items}
                ref={yearsRef}
                showsVerticalScrollIndicator={false}
                onLayout={onYearsLayout}
                onScroll={yearsHandleScroll}
                scrollEventThrottle={4}
            >   
                {years.map((y) => 
                    <View style={styles.slider__item} key={y}>
                        <Text style={styles.slider__yearText}>{y}</Text> 
                    </View>
                )}
            </ScrollView>
            <View style={styles.slider__active}>
                <Text style={styles.slider__active_text}>{getActiveMonthName()}</Text>
                <Text style={styles.slider__active_text}>{year}</Text>
            </View>
        </View>
       
    )
}

const styles = StyleSheet.create({
    slider: {
        flexDirection: 'row',
        position: 'relative'
    },
    slider__items: {
        width: '50%'
    },
    slider__item: {
        height: 45,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    slider__active: {
        position: 'absolute',
        top: 135,
        left: 0,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'rgba(115, 226, 234, 1)',
        flexDirection: 'row'
    },
    slider__active_text: {
        fontSize: 25,
        color: 'white'
    },
    slider__yearText: {
        padding: 0,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
        fontSize: 20
    },
    slider__monthText: {
        padding: 0,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
        fontSize: 20
    },
})

export default Slider;