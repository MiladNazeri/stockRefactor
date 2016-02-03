import { QUERY_COMPANY } from '../actions/index.js';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
    switch(action.type){
    case QUERY_COMPANY:
        console.log("state:", state)
        console.log("action:", action)
        return [...state, action.payload]
        // let newState = { ...state};
        // newState.companies.push(action.payload);
        // return newState;
    default:
        return state;
    }
}