import { combineReducers } from 'redux';
import { getUser, getProject, getLots, getProfiles } from './async';

export default combineReducers({
    user: getUser,
    lots: getLots,
    project: getProject,
    profiles: getProfiles
});
