import { createSelector } from 'reselect';

const selectHome = () => state => state.get('home');

const selectFeeds = () => createSelector(
    selectHome(),
    homeState => homeState.get('feeds').toJS()
);

export {
    selectFeeds
};
