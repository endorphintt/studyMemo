import { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'

type Props = {
    active: {hour: number, minute: number}
    setActive: (arg: {hour: number, minute: number}) => void;
}

const HourSlider: React.FC<Props> = ({active, setActive}) => {
    const items: {hour: number, minute: number}[] = []
    const slider = useRef<ScrollView>(null)
    
    for(let i = 0; i < 24; i++){
        for(let j = 0; j <= 45; j += 15){
            items.push({hour: i, minute: j})
        }
    }

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const yOffset = event.nativeEvent.contentOffset.y;

        items.forEach(item => {
            let itemTop = (item.hour * 4 + item.minute / 15) * 35
            if(yOffset >= itemTop && yOffset <= itemTop + 34) {
                setActive(item)
            }
        })
    }

    const onLayout = () => {
        const selectedItem = (active.hour * 4 + active.minute / 15) * 35
        slider.current?.scrollTo({y: selectedItem, animated: true})
    }

    return (
        <View
            style={styles.hourSlider}
        >
            <ScrollView
                style={styles.hourSlider__scroll}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                ref={slider}
                onLayout={onLayout}
                scrollEventThrottle={4}
            >
                {items.map((item) => 
                    <Text style={styles.hourSlider__item}>
                        {item.hour.toString().length === 1? '0' + item.hour : item.hour}:
                        {item.minute.toString().length === 1? '0' + item.minute : item.minute}
                    </Text>
                )}
            </ScrollView>
            <View style={styles.hourSlider__active}>
                <Text style={styles.hourSlider__active_text}>
                    {active.hour.toString().length === 1? '0' + active.hour : active.hour}:
                    {active.minute.toString().length === 1? '0' + active.minute : active.minute}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    hourSlider: {
        height: 210,
        borderRadius: 20,
        marginVertical: 10,
        overflow: 'hidden',
        alignItems: 'center'
    },
    hourSlider__scroll: {
    },
    hourSlider__item: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 35
    },
    hourSlider__active: {
        position: 'absolute',
        top: 80,
        left: '20%',
        width: '60%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'rgba(115, 226, 234, 1)'
    },
    hourSlider__active_text: {
        fontSize: 25,
        color: 'white'
    }
})

export default HourSlider