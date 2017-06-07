import { createSelector } from 'reselect';

export const selectGlobal = () => state => state.global;

export const selectCurrentUser = () => createSelector(
    selectGlobal(),
    globalState => globalState.user
);

export const selectLoading = () => createSelector(
    selectGlobal(),
    globalState => globalState.loading
);

export const selectError = () => createSelector(
    selectGlobal(),
    globalState => globalState.error
);

export const isAuthenticated = () => createSelector(
	selectGlobal(),
	globalState => globalState.token
);

// const selectLocationState = () => {
//     let prevRoutingState;
//     let prevRoutingStateJS;
//
//     return (state) => {
//         const routingState = state.get('route'); // or state.route
//
//         if (!routingState.equals(prevRoutingState)) {
//             prevRoutingState = routingState;
//             prevRoutingStateJS = routingState.toJS();
//         }
//
//         return prevRoutingStateJS;
//     };
// };

// export {
//     selectGlobal,
//     selectCurrentUser,
//     selectLoading,
//     selectError
// };
