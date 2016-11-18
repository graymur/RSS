import { fromJS } from 'immutable';
import expect from 'expect';

import {
    selectLoading,
    selectCurrentUser,
} from '../selectors';

describe('selectUsername', () => {
    it('should select the username', () => {
        const name = 'graymur';
        const state = fromJS({
            global: { user: { name } }
        });

        expect(selectCurrentUser()(state).get('name')).toEqual(name);
    });
});

describe('selectLoading', () => {
    it('should select the username', () => {
        const state = fromJS({
            global: { loading: true }
        });

        expect(selectLoading()(state)).toEqual(true);
    });
});
