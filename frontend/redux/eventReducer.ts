import { ItemInterface } from './../components/calendar/calendarContent/events/eventItem/eventItem';

const UPDATE_DATE = 'UPDATE_DATE'
const UPDATE_PROGRESS = 'UPDATE_PROGRESS'
const ADD_EVENT = 'ADD_EVENT'
const DELETE_EVENT = 'DELETE_EVENT'

interface EventState {
    eventItems: ItemInterface[];
    eventActiveItems: ItemInterface[];
}

export interface EventPage {
    eventComponent: EventState; 
}

const initilState: EventState = {
    eventItems: [
        {
            id: '1',
            done: false,
            title: 'buy milk',
            start: new Date(2023, 7, 23, 8, 15),
            time: 60,
            color: 'rgba(222, 36, 36, 0.4)',
            icon: './coffee.png',
            description: '1 litr'
        },
        {
            id: '7',
            title: 'THU',
            done: false,
            start: new Date(2023, 7, 23, 6, 15),
            time: 30,
            color: 'rgba(36, 55, 222, 0.4)',
            icon: './coffee.png',
            description: '1 litr'
        },
        {
            id: '8',
            title: 'Tuesday',
            done: false,
            start: new Date(2023, 7, 23, 10, 15),
            time: 80,
            color: 'rgba(222, 36, 203, 0.4)',
            icon: './coffee.png',
            description: '1 litr'
        },
        {
            id: '10',
            title: 'Tuesday',
            done: false,
            start: new Date(2023, 7, 24, 12, 15),
            time: 60,
            color: 'rgba(222, 192, 36, 0.4)',
            description: '1 litr',
            icon: './coffee.png',
        },
    ],
    eventActiveItems: [
    ]
}

const eventReducer = (state = initilState, action: { type: string, payload: any }) => {
    let newState;
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
        case ADD_EVENT: 
            newState = {
                eventItems: [
                    ...state.eventItems,
                    {...action.payload}
                ]
            }
            return newState
        case DELETE_EVENT:
            const updatedEventItems = state.eventItems.filter((item: ItemInterface) => item.id !== action.payload);
            const updatedEventActiveItems = state.eventActiveItems.filter((item: ItemInterface) => item.id !== action.payload);
        
            return {
                ...state,
                eventItems: updatedEventItems,
                eventActiveItems: updatedEventActiveItems
            };
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

export const AddEventActionCreator = (event: ItemInterface) => {
    return ({
        type: ADD_EVENT,
        payload: event,
    })
}

export const DeleteEventActionCreator = (id: string) => {
    return ({
        type: DELETE_EVENT,
        payload: id,
    })
}

export default eventReducer;