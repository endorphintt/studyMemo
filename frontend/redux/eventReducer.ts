import { ItemInterface } from './../components/calendar/calendarContent/events/eventItem/eventItem';

const SET_STATE = 'SET_STATE'
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
    ],
    eventActiveItems: [
    ]
}

const eventReducer = (state = initilState, action: { type: string, payload: any }) => {
    let newState;
    switch(action.type) {
        case SET_STATE:
            const NewState = {
                eventItems: action.payload,
                eventActiveItems: []
            }
            return NewState
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

export const setStateActionCreator = (state: ItemInterface[]) => {
    return ({
        type: SET_STATE,
        payload: state,
    })
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