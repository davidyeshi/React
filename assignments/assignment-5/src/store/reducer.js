const initialState = {
    persons: []
}

const reducer = (state = initialState, action) => {

    if(action.type === 'ADD_PERSON') {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: action.personData.name,
            age: action.personData.age
        }

        return {
            persons: state.persons.concat(newPerson)
        }
    }
    if(action.type === 'DELETE_PERSON') {
        
        const updatedArray = state.persons.filter((person) => person.id !== action.id);
        return {
            ...state,
            persons: updatedArray
        }
    }
    return state;
}

export default reducer;