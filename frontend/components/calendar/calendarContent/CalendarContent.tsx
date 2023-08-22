import { View, Text, StyleSheet } from 'react-native'
import CalendarSwiper from './calendarSwiper/CalendarSwiper';
import Events from './events/Events';

type Props = {
    date: Date;
    setDate: (date: Date) => void; 
}

const CalendarContent: React.FC<Props> = ({date, setDate}) => {
    return (
        <View style={styles.calendarContent}>
            <CalendarSwiper date={date} setDate={setDate} />
            <Events date={date}/>
        </View>
    )
}

const styles = StyleSheet.create({
    calendarContent: {
        position: 'relative',
        flex: 1
    }
})

export default CalendarContent;