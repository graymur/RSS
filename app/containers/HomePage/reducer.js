import { fromJS } from 'immutable';

const initialState = fromJS({});

function homeReducer(state = initialState, action = {}) {
    return initialState;
}

export default homeReducer;
