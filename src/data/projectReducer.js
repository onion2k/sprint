
import { ADD_PROJECT, UPDATE_PROJECT } from './constants.js';

const initialState = { 'title': 'Redux' }

export default function project(state = initialState, action) {
    
    switch (action.type) {

        case UPDATE_PROJECT:
            state.title = action.contents.title;
            return { ...state }

        case ADD_PROJECT:
            return { project: action.project, contents: action.contents }

        default:
            return state

    }

}