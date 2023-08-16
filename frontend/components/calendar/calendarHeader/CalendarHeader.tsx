import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FOLDERS_ROUTE, SETTINGS_ROUTE } from "../../../variables/variables";

type Props = {
    date: Date;
    setDate: (date: Date) => void;
    setCalendarPopup: () => void;
}

const CalendarHeader: React.FC<Props> = ({date, setDate, setCalendarPopup}) => {
    const month = date.getMonth()
    const year = date.getFullYear()
    const getMonthName = (num: number) => {
        switch (num) {
            case 0:
                return 'Jan';
            case 1:
                return 'Feb';
            case 2:
                return 'Mar';
            case 3:
                return 'Apr';
            case 4:
                return 'May';
            case 5:
                return 'June';
            case 6:
                return 'July';
            case 7:
                return 'Aug';
            case 8:
                return 'Sep';
            case 9:
                return 'Nov';
            case 10:
                return 'Oct';
            case 11:
                return 'Dec';
        }
    }
    const nav = useNavigation()

    return(
        <View style={styles.calendarHeader}>
            <Text style={styles.calendarHeader__month}>{getMonthName(month)}</Text>
            <Text style={styles.calendarHeader__year}>{year}</Text>
            <TouchableOpacity onPress={() => nav.navigate(FOLDERS_ROUTE, {})}>
                <Image
                    source={require('./folders.png')} 
                    style={styles.calendarHeader__img}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nav.navigate(SETTINGS_ROUTE, {})}>
                <Image
                    source={require('./settings.png')} 
                    style={styles.calendarHeader__img}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={setCalendarPopup}>
                <Image
                    source={require('./calendar.png')} 
                    style={styles.calendarHeader__img}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    calendarHeader: {
        backgroundColor: 'white',
        height: 80,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    calendarHeader__month: {
        fontSize: 35,
        fontFamily: 'Futura',
        fontWeight: "700",
        color: '#73E2EA'
    },
    calendarHeader__year: {
        fontSize: 35,
        fontFamily: 'Futura',
        fontWeight: "700",
    },
    calendarHeader__button: {},
    calendarHeader__img: {
        width: 40,
        height: 40,
    },
})

export default CalendarHeader;