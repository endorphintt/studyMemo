import { View, Text } from 'react-native'

type Props = {
    date: Date;
    setDate: (date: Date) => void; 
}

const CalendarContent: React.FC<Props> = ({date}) => {
    return (
        <View>
            <Text>calendar content</Text>
        </View>
    )
}

export default CalendarContent;