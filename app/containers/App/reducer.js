import { fromJS } from 'immutable';

const initialState = fromJS({});

function appReducer(state = initialState, action = {}) {
    return initialState;
}

export default appReducer;
