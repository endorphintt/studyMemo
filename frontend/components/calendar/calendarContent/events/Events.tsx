import { View, Text, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { UpdateDateActionCreator } from "../../../../redux/eventReducer";
import { reducers } from "../../../../redux/redux_store";

type Props = {
    date: Date;
}

const Events: React.FC<Props> = ({date}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(UpdateDateActionCreator(date))
    }, [date])

    const activeItems = useSelector((state: reducers) => state.eventComponent.eventActiveItems)

    return (
        <View style={styles.events}>
            <Text>{activeItems.map((e) => 
                <Text>{e.title}</Text>
            )}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    events: {
        flex: 1,
        backgroundColor: 'rgba(115, 226, 234, 0.58)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20
    }
})

export default Events;