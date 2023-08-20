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

    const onScrollMonthsEnd = () => {
        const scrollMonthsToY = month * 45
        monthsRef.current?.scrollTo({y: scrollMonthsToY})
    }

    const onScrollYearsEnd = () => {
        const scrollYearsToY = ( year - 2023 ) * 45 
        yearsRef.current?.scrollTo({y: scrollYearsToY})
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
                onScrollEndDrag={onScrollMonthsEnd}
            >   
                {months.map((mon) => 
                    <View style={styles.slider__item} key={mon.index}>
                        <Text style={[styles.slider__monthText, month === mon.index && styles.slider__selectedMonth]}>{mon.name? mon.name: ''}</Text> 
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
                onScrollEndDrag={onScrollYearsEnd}
            >   
                {years.map((y) => 
                    <View style={styles.slider__item} key={y}>
                        <Text style={[styles.slider__yearText, year === y && styles.slider__selectedYear]}>{y}</Text> 
                    </View>
                )}
            </ScrollView>
            <View style={styles.poput__line}></View>
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
    poput__line: {
        height: 45,
        width: '100%',
        backgroundColor: 'rgba(111, 111, 111, 0.3 )',
        position: 'absolute',
        top: 125
    },
    slider__yearText: {
        padding: 0,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
        fontSize: 20
    },
    slider__selectedYear: {
        color: 'blue'
    },
    slider__monthText: {
        padding: 0,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
        fontSize: 20
    },
    slider__selectedMonth: {
        color: 'blue'
    }
})

export default Slider;