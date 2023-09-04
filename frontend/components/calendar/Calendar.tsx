import { View, StyleSheet } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import CalendarHeader from "./calendarHeader/CalendarHeader";
import { useState } from "react";
import CalendarContent from "./calendarContent/CalendarContent";
import CalendarPopup from "./calendarPopup/CalendarPopup";

const Calendar: React.FC = () => {
    const unixTimestamp = Date.now();
    const timezoneOffsetInMinutes = new Date().getTimezoneOffset();
    const timezoneOffsetMilliseconds = timezoneOffsetInMinutes * 60 * 1000;
    const currentDateInYourTimezone = new Date(unixTimestamp - timezoneOffsetMilliseconds);

    const [date, setDate] = useState<Date>(currentDateInYourTimezone); 
    const [calendarPopup, setCalendarPopup] = useState<boolean>(false)

    return (
        <View style={style.calendar}>
            <CalendarHeader setCalendarPopup={() => setCalendarPopup(true)} date={date} setDate={setDate}/>
            <CalendarContent date={date} setDate={setDate} />
            <CalendarPopup setCalendarPopup={() => setCalendarPopup(false)} date={date} setDate={setDate} display={calendarPopup}/>
        </View>
    )
}

const style = StyleSheet.create({
    calendar: {
        paddingTop: getStatusBarHeight(),
        height: '100%',
        backgroundColor: 'white',
        position: 'relative'
    }
})

export default Calendar;