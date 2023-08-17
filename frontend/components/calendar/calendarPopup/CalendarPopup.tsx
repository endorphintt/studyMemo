import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Nums from './nums/Nums';
import Slider from './slider/Slider';

type Props = {
    date: Date;
    display: boolean;
    setCalendarPopup: () => void;
    setDate: (date: Date) => void;
}

const CalendarPopup: React.FC<Props> = ({date, setDate, display, setCalendarPopup}) => {
    const [num, setNum] = useState<number>(date.getDate())
    const [month, setMonth] = useState<number>(date.getMonth())
    const [year, setYear] = useState<number>(date.getFullYear())
    const [menu, setMenu] = useState<boolean>(true)

    const months = [
        {i: 0, name: 'January'}, {i: 1, name: 'February'}, {i: 2, name: 'March'}, {i: 3, name: 'April'},
        {i: 4, name: 'May'}, {i: 5, name: 'June'}, {i: 6, name: 'July'}, {i: 7, name: 'August'},
        {i: 8, name: 'September'}, {i: 9, name: 'October'}, {i: 10, name: 'November'}, {i: 11, name: 'December'},
    ]

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    }

    const getFirstDayOfWeek = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    }

    const newDate = new Date(year, month, num)
    const daysInMonth = getDaysInMonth(newDate)
    const firstDayOfWeek = getFirstDayOfWeek(newDate)

    let nums: number[] = []
    if(firstDayOfWeek === 0){
        for(let i = 1; i < 43; i++){
            if(i <= 6){
                nums.push(0)
            } else if (i >= firstDayOfWeek && i < 7 + daysInMonth ){
                nums.push(i - 6)
            } else {
                nums.push(0)
            }
        }
    } else {
        for(let i = 1; i < 43; i++){
            if(i < firstDayOfWeek){
                nums.push(0)
            } else if (i >= firstDayOfWeek && i < firstDayOfWeek + daysInMonth ){
                nums.push(i - firstDayOfWeek + 1)
            } else {
                nums.push(0)
            }
        }
    }   

    return (
        <View 
            style={{display: (display ? 'flex' : 'none'), ...styles.calendarPopup}}
        >            
            <TouchableOpacity
                style={styles.popup__close}
                onPress={setCalendarPopup}
            >
                <View style={styles.popup__close_container}>
                    <Image
                        style={styles.pupup__close_img}
                        source={require('./close.png')}
                    />
                </View>
            </TouchableOpacity>   
            <TouchableOpacity
                style={styles.poput__header}
                onPress={() => setMenu(!menu)}
            >
                <Text style={styles.poput__text}>{months.filter(mon => mon.i === month)[0].name}</Text>
                <Text style={styles.poput__text}>{year}</Text>
                <View style={{transform: [{rotate: menu? '0deg' : '90deg'}], ...styles.popup__point_container}}>
                    <Text style={styles.popup__point}>{'>'}</Text>
                </View>
            </TouchableOpacity> 
            <View style={styles.popup__menu}>
                {menu?
                <Nums num={num} nums={nums} setNumber={setNum}/>
                :
                <Slider month={month} year={year} setMonth={setMonth} setYear={setYear}/>
                }
            </View>   
            <View>
                <TouchableOpacity
                    style={styles.pupup__button}
                    onPress={() => {
                        setDate(new Date(year, month, num))
                        setCalendarPopup()
                    }}
                >
                    <Text style={styles.pupup__button_text}>change</Text>
                </TouchableOpacity>
            </View>   
        </View>
    )
}

const styles = StyleSheet.create({
    calendarPopup: {
        width: '95%',
        height: 500,
        position: 'absolute',
        bottom: '10%',
        left: '2.5%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: 'black',       
        shadowOffset: {            
        width: 0,
        height: 0,
        },
        shadowOpacity: 1,        
        shadowRadius: 10,           
        elevation: 40,  
        boxSizing: 'content-box',
    },
    popup__close: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    popup__close_container:{
        padding: 7.5,
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D9D9D9'
    },
    pupup__close_img: {
        width: 20,
        height: 20,
    },
    poput__header: {
        width: '100%',
        height: 55,
        flexDirection: 'row',
        alignContent: 'center'
    },
    poput__text: {
        margin: 5,
        fontFamily: 'Futura',
        fontSize: 20,
    },
    popup__point_container:{
        flex: 0,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5
    },
    popup__point: {
        color: '#509EA4',
        fontSize: 30,
        padding: 0
    },
    popup__menu: {
        width: '100%',
        height: 315,
    },
    pupup__button: {
        height: 50,
        backgroundColor: '#73E2EA',
        width: 150,
        margin: 5,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pupup__button_text: {
        fontFamily: 'Futura',
        textTransform: 'uppercase',
        fontSize: 18,
        color: 'white'
    }
})

export default CalendarPopup;