import { useEffect, useRef, useLayoutEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native'

type Props = {
    year: number;
    setYear: (year: number) => void;
    month: number;
    setMonth: (month: number) => void;
}

const Slider: React.FC<Props> = ({year, setYear, month, setMonth}) => {
    const years = Array.from({ length: 100 }, (_, index) => 2020 + index);
    const months = [
                    {num: -1, name: ''}, {num: -1, name: ''}, {num: -1, name: ''}, 
                    {num: 0, name: 'January'}, {num: 1, name: 'February'}, {num: 2, name: 'March'}, {num: 3, name: 'April'},
                    {num: 4, name: 'May'}, {num: 5, name: 'June'}, {num: 6, name: 'July'}, {num: 7, name: 'August'},
                    {num: 8, name: 'September'}, {num: 9, name: 'October'}, {num: 10, name: 'November'}, {num: 11, name: 'December'},
                    {num: -1, name: ''}, {num: -1, name: ''}, {num: -1, name: ''},
                ]

    const scrollViewRef = useRef<ScrollView | null>(null);
    const scrollViewMonthsRef = useRef<ScrollView | null>(null);
    
    useLayoutEffect(() => {
        const selectedIndex = years.findIndex((item) => year === item);
        const scrollToY = selectedIndex * 45; 
        if(scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: scrollToY, animated: true });
        } 
        const selectedMonthIndex = months.findIndex((item) => month === item.num);
        const scrollToMonthY = selectedIndex * 45; 
        if(scrollViewMonthsRef.current) {
            scrollViewMonthsRef.current.scrollTo({ y: scrollToY, animated: true });
        } 
      }, []);   
    return (
        <View style={styles.slider}>
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.yearsContainer}
                onScroll={(event) => {
                    const offsetY = event.nativeEvent.contentOffset.y
                    const visibleHeight = event.nativeEvent.layoutMeasurement.height;
                    const index = Math.round((offsetY + visibleHeight / 2) / 46)
                    setYear(years[index])
                }}
            >
                {years.map((item, index) => (
                    <Text key={index} style={[styles.yearText, year === item && styles.selectedYear]}>
                        {item}
                    </Text>
                ))}
            </ScrollView>
            <ScrollView
                ref={scrollViewMonthsRef}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.monthsContainer}
                onScroll={(event) => {
                    const offsetY = event.nativeEvent.contentOffset.y
                    const visibleHeight = event.nativeEvent.layoutMeasurement.height;
                    const index = Math.round((offsetY + visibleHeight / 2) / 46)
                    setMonth(months[index].num)
                }}
            >
                {months.map((item, index) => (
                    <Text key={index} style={[styles.monthText, item.num === month && styles.selectedMonth]}>
                        {item.name}
                    </Text>
                ))}
            </ScrollView>
            <View style={styles.poput__line}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    slider: {
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        position: 'relative'
    },
    yearsContainer: {
        width: '50%',
        alignItems: 'center',
        zIndex: 2
    },
    selectedYear: {
        color: '#73E2EA'
    },
    yearText: {
        paddingLeft: 40,
        fontSize: 20,
        height: 45,
        color: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    monthsContainer: {
        width: '50%',
        alignItems: 'center',
        zIndex: 2
    },
    monthText: {
        fontSize: 20,
        height: 45,
        color: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedMonth: {
        color: '#73E2EA'
    },
    poput__line: {
        height: 45,
        width: '100%',
        backgroundColor: 'rgba(111, 111, 111, 0.3 )',
        position: 'absolute',
        top: 125
    }
})

export default Slider;