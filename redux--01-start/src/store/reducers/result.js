import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    
    switch(action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(state, {results: state.results.concat({id: new Date(), value: action.result})});

        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id, 1);
            
            const updatedArray = state.results.filter((result) => result.id !== action.resultId);
            return updatedArray(state, {results : updatedArray});

        default:
            return state;
    }
};

export default reducer;