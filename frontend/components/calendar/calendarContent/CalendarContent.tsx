import { View, Text, StyleSheet } from 'react-native'
import CalendarSwiper from './calendarSwiper/CalendarSwiper';
import Events from './events/Events';
import { useState } from 'react';
import AddEvent from './events/addEvent/AddEvent';

type Props = {
    date: Date;
    setDate: (date: Date) => void; 
}

const CalendarContent: React.FC<Props> = ({date, setDate}) => {
    const [addEvent, setAddEvent] = useState<boolean>(false)

    return (
        <View style={styles.calendarContent}>
            <CalendarSwiper date={date} setDate={setDate} />
            <Events setAddEvent={setAddEvent} date={date}/>
            <AddEvent setDisplay={() => setAddEvent(false)} display={addEvent}/>
        </View>
    )
}

const styles = StyleSheet.create({
    calendarContent: {
        position: 'relative',
        flex: 1
    }, 
})

export default CalendarContent;