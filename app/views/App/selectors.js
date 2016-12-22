import { createSelector } from 'reselect';

const selectGlobal = () => state => state.get('global');

const selectCurrentUser = () => createSelector(
    selectGlobal(),
    globalState => globalState.get('user')
);

const selectLoading = () => createSelector(
    selectGlobal(),
    globalState => globalState.get('loading')
);

const selectError = () => createSelector(
    selectGlobal(),
    globalState => globalState.get('error')
);

const selectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
        const routingState = state.get('route'); // or state.route

        if (!routingState.equals(prevRoutingState)) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }

        return prevRoutingStateJS;
    };
};

export {
    selectGlobal,
    selectCurrentUser,
    selectLoading,
    selectError,
    selectLocationState
};