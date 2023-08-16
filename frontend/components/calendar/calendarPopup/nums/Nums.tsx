import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type Props = {
    setNumber: (par: number) => void;
    num: number;
    nums: number[]
}

const Nums: React.FC<Props> = ({setNumber, num, nums}) => {
    const week: string[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    return (
        <View style={styles.nums}>
            <View style={styles.nums__header}>       
                {week.map(day => <Text style={styles.nums__day}>{day}</Text>)}
            </View>
            <View style={styles.nums__items}>
                {nums.map((n) => {
                    return(
                        <TouchableOpacity
                            style={n === num? styles.nums__item_active : styles.nums__item} 
                            onPress={() => {if(n != 0){setNumber(n)}}}
                        >
                            <Text style={styles.nums__item_text}>{n != 0 ? n : ''}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default Nums;

const styles = StyleSheet.create({
    nums: {
        padding: 10,
        height: 300
    },
    nums__header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    nums__day:{
        height: 40,
        textTransform: 'uppercase',
        color: '#509EA4',
        fontWeight: '700'
    },
    nums__items: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    nums__item: {
        width: '14.2%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nums__item_active: {
        width: '14.3%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#73E2EA',
        borderRadius: 30,
    },
    nums__item_text: {
        fontSize: 16,
        fontFamily: 'Futura'
    }
})