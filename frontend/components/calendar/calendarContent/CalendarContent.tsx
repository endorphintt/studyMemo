import { View, Text, StyleSheet } from 'react-native'
import CalendarSwiper from './calendarSwiper/CalendarSwiper';

type Props = {
    date: Date;
    setDate: (date: Date) => void; 
}

const CalendarContent: React.FC<Props> = ({date, setDate}) => {
    return (
        <View style={styles.calendarContent}>
            <CalendarSwiper date={date} setDate={setDate} />
        </View>
    )
}

const styles = StyleSheet.create({
    calendarContent: {
        position: 'relative'
    }
})

export default CalendarContent;