import { EVENT_ACTION } from "./types";

const UPDATE_DATE = 'UPDATE_DATE'

const someDate = new Date()
console.log(new Date(someDate.getTime() + 24 * 60 * 60 * 1000))

const initilState = {
    eventItems: [
        {
            id: '1',
            date: someDate,
            title: 'buy milk',
            start: '11:45',
            time: '60',
            color: 'blue',
            description: '1 litr'
        },
        {
            id: '2',
            date: someDate,
            title: 'buy milk',
            start: '11:45',
            time: '60',
            color: 'blue',
            description: '1 litr'
        },
        {
            id: '3',
            date: someDate,
            title: 'buy milk',
            start: '11:45',
            time: '60',
            color: 'blue',
            description: '1 litr'
        },
        {
            id: '4',
            date: someDate,
            title: 'buy milk',
            start: '11:45',
            time: '60',
            color: 'blue',
            description: '1 litr'
        },
        {
            id: '5',
            date: someDate,
            title: 'buy milk',
            start: '11:45',
            time: '60',
            color: 'blue',
            description: '1 litr'
        },
        {
            id: '7',
            date: new Date(someDate.getTime() + 24 * 60 * 60 * 1000),
            title: 'THU',
            start: '11:45',
            time: '60',
            color: 'blue',
            description: '1 litr'
        },
        {
            id: '8',
            date: someDate,
            title: 'Tuesday',
            start: '11:45',
            time: '60',
            color: 'blue',
            description: '1 litr'
        },
        {
            id: '8',
            date: someDate,
            title: 'Tuesday',
            start: '11:45',
            time: '60',
            color: 'blue',
            description: '1 litr'
        },
        {
            id: '9',
            date: someDate,
            title: 'Tuesday',
            start: '11:45',
            time: '60',
            color: 'blue',
            description: '1 litr'
        },
        {
            id: '10',
            date: someDate,
            title: 'Tuesday',
            start: '11:45',
            time: '60',
            color: 'blue',
            description: '1 litr'
        },
    ],
    eventActiveItems: [
        {
            id: '6',
            date: someDate,
            title: 'buy milk',
            start: '11:45',
            time: '60',
            color: 'blue',
            description: '1 litr'
        },
        {
            id: '7',
            date: someDate,
            title: 'buy milk',
            start: '11:45',
            time: '60',
            color: 'blue',
            description: '1 litr'
        },
    ]
}

const eventReducer = (state = initilState, action: { type: string, activeDate: Date }) => {
    switch(action.type) {
        case UPDATE_DATE:
            const newEventActiveItems = state.eventItems.filter(item => {
                const itemDate = new Date(item.date);
                return (
                    itemDate.getFullYear() === action.activeDate.getFullYear() &&
                    itemDate.getDate() === action.activeDate.getDate() &&
                    itemDate.getMonth() === action.activeDate.getMonth()
                );
            });

            return {
                ...state,
                eventActiveItems: newEventActiveItems,
            };
        default: 
            return state;
    }
}

export const UpdateDateActionCreator = (date: Date) => {
    return ({
        type: UPDATE_DATE,
        activeDate: date,
    })
}

export default eventReducer;