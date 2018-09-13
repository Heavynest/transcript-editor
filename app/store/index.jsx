import {createStore,combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userUpdate from '../reducers';

const all_reducer = combineReducers({
  userUpdate,
  form: formReducer
});

const store = (window.devToolsExtension
? devToolsExtension()(createStore):createStore)(all_reducer);

export default store;
