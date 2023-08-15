import { View, Text, StyleSheet } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import CalendarHeader from "./calendarHeader/CalendarHeader";
import { useState } from "react";

const Calendar: React.FC = () => {
    const [date, setDate] = useState<Date>(new Date); 
    
    return (
        <View style={style.calendar}>
            <CalendarHeader date={date} setDate={setDate}/>
        </View>
    )
}

const style = StyleSheet.create({
    calendar: {
        paddingTop: getStatusBarHeight(),
        height: '100%',
        backgroundColor: 'white',
    }
})

export default Calendar;