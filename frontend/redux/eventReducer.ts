import { ItemInterface } from "../components/calendar/calendarContent/events/eventItem/eventItem";
import { EVENT_ACTION } from "./types";

const UPDATE_DATE = 'UPDATE_DATE'
const UPDATE_PROGRESS = 'UPDATE_PROGRESS'

interface EventState {
    eventItems: ItemInterface[];
    eventActiveItems: ItemInterface[];
}

const initilState: EventState = {
    eventItems: [
        {
            id: '1',
            done: false,
            title: 'buy milk',
            start: new Date(2023, 7, 23, 8, 15),
            time: 60,
            color: 'rgba(222, 36, 36, 0.71)',
            icon: './coffee.png',
            description: '1 litr'
        },
        {
            id: '7',
            title: 'THU',
            done: false,
            start: new Date(2023, 7, 23, 6, 15),
            time: 30,
            color: 'rgba(36, 55, 222, 0.71)',
            icon: './coffee.png',
            description: '1 litr'
        },
        {
            id: '8',
            title: 'Tuesday',
            done: false,
            start: new Date(2023, 7, 23, 10, 15),
            time: 80,
            color: 'rgba(222, 36, 203, 0.71)',
            icon: './coffee.png',
            description: '1 litr'
        },
        {
            id: '10',
            title: 'Tuesday',
            done: false,
            start: new Date(2023, 7, 24, 12, 15),
            time: 60,
            color: 'rgba(222, 192, 36, 0.71)',
            description: '1 litr',
            icon: './coffee.png',
        },
    ],
    eventActiveItems: [
    ]
}

const eventReducer = (state = initilState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case UPDATE_DATE:
            const newEventActiveItems = state.eventItems.filter(item => {
                const itemDate = new Date(item.start);
                return (
                    itemDate.getFullYear() === action.payload.getFullYear() &&
                    itemDate.getDate() === action.payload.getDate() &&
                    itemDate.getMonth() === action.payload.getMonth()
                );
            });

            return {
                ...state,
                eventActiveItems: newEventActiveItems,
            };
        case UPDATE_PROGRESS:
            const eventActiveItemsCopy = [...state.eventActiveItems]
            eventActiveItemsCopy.forEach((item) => {
                if(item.id === action.payload) {
                    item.done = item.done? false : true
                }
            })
            return {
                ...state,
                eventActiveItems: eventActiveItemsCopy
            }
        default: 
            return state;
        
    }
}

export const UpdateDateActionCreator = (date: Date) => {
    return ({
        type: UPDATE_DATE,
        payload: date,
    })
}

export const UpdateProgressActionCreator = (id: string) => {
    return ({
        type: UPDATE_PROGRESS,
        payload: id,
    })
}

export default eventReducer;