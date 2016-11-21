import { fromJS } from 'immutable';
import expect from 'expect';

import {
    selectLoading,
    selectSaved,
    selectData,
} from '../selectors';

describe('selectLoading', () => {
    it('should select loading flag', () => {
        const state = fromJS({ form: { loading: true } });
        expect(selectLoading()(state)).toEqual(true);
    });
});

describe('selectSaved', () => {
    it('should select saved flag', () => {
        const state = fromJS({ form: { saved: true } });
        expect(selectSaved()(state)).toEqual(true);
    });
});

describe('selectData', () => {
    it('should select data', () => {
        const state = fromJS({ form: { data: 'string' } });
        expect(selectData()(state)).toEqual('string');
    });
});
