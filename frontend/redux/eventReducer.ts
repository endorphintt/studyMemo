import { EVENT_ACTION } from "./types";

const UPDATE_DATE = 'UPDATE_DATE'

const someDate = new Date()

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

const eventReducer = (state = initilState, action: { type: string, activeDate: Date}) => {
    let newState: any;
    switch(action.type) {
        case UPDATE_DATE:
            newState = {...state, eventActiveItems: []}
            state.eventItems.forEach((item) => {
                if( 
                    item.date.getFullYear() === action.activeDate.getFullYear()  &&
                    item.date.getDate() === action.activeDate.getDate() &&
                    item.date.getMonth() === action.activeDate.getMonth()             
                ) {
                    newState.eventActiveItems.push(item)
                }
            })
            return newState
        default: 
            return state
    }
}

export const UpdateDateActionCreator = (date: Date) => {
    return ({
        type: UPDATE_DATE,
        activeDate: date,
    })
}

export default eventReducer;