import { createAction } from 'redux-actions';
import constant from '../../lib/constant';

const FETCH = constant('janos', 'exhibitions', 'FETCH');

export default {
  fetch: createAction(FETCH, amount => amount),
};
