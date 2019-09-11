import axios from 'axios';
import oStorage from '../../storage';
import oConfig from '../../config';
import { buildServiceUrl, getServiceLink } from '../../utils';
import querystring from 'querystring';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_DATA = 'SELECT_DATA';
export const INVALIDATE_DATA = 'INVALIDATE_DATA';

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';

export const RECEIVE_LOT_AUDIO = 'RECEIVE_LOT_AUDIO';
export const REQUEST_LOT_AUDIO = 'REQUEST_LOT_AUDIO';

export const RECEIVE_TNS = 'RECEIVE_TNS';
export const REQUEST_TNS = 'REQUEST_TNS';

export const REQUEST_REMOVE_SP = 'REQUEST_REMOVE_SP';
export const RECEIVE_REMOVE_SP = 'RECEIVE_REMOVE_SP';

export const REQUEST_PROFILES = 'REQUEST_PROFILES';
export const RECEIVE_PROFILES = 'RECEIVE_PROFILES';

export const REQUEST_UPDATE_LIST = 'REQUEST_UPDATE_LIST';
export const RECEIVE_UPDATE_LIST = 'RECEIVE_UPDATE_LIST';

export const SELECT_TAB = 'SELECT_TAB';
export const SELECT_LOT = 'SELECT_LOT';
export const SELECT_PROFILE = 'SELECT_PROFILE';

export const ADD_TO_LIST = 'ADD_TO_LIST';

export const PLAY_SOUND = 'PLAY_SOUND';
export const STOP_SOUND = 'STOP_SOUND';

export const DELETE_SOUND = 'DELETE_SOUND';

export const FAILED_LOGIN = 'FAILED_LOGIN';
export const SET_TOKEN = 'SET_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const REQUEST_MESSENGER_INFO = 'REQUEST_MESSENGER_INFO';
export const RECEIVE_MESSENGER_INFO = 'RECEIVE_MESSENGER_INFO';

export const REQUEST_LOTS_INFO = 'REQUEST_LOTS_INFO';
export const RECEIVE_LOTS_INFO = 'RECEIVE_LOTS_INFO';

export const REQUEST_NOTIFICATIONS = 'REQUEST_NOTIFICATIONS';
export const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS';

export const SELECT_POST = 'SELECT_POST';

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const GET_MESSAGE_ANSWER = 'GET_MESSAGE_ANSWER';

export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const REMOVE_COMMENT_RESPONSE = 'REMOVE_COMMENT_RESPONSE';

export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
export const HIDE_SIDEBAR = 'HIDE_SIDEBAR';

export const SELECT_PAGE = 'SELECT_PAGE';

export const SET_DEVICE_TYPE = 'SET_DEVICE_TYPE';

export const CREATE_LOT = 'CREATE_LOT';
export const CREATE_LOT_RESULT = 'CREATE_LOT_RESULT';

export const REQUEST_SP_ACTION = 'REQUEST_SP_ACTION';
export const RECEIVE_SP_ACTION = 'RECEIVE_SP_ACTION';

export const REQUEST_UPDATE_PROFILES_LIST = 'REQUEST_UPDATE_PROFILES_LIST';
export const RECEIVE_UPDATE_PROFILES_LIST = 'RECEIVE_UPDATE_PROFILES_LIST';

export const UPDAT_PROJECT = 'UPDATE_PROJECT';



// -------------- select app page
export function selectPage(sPage) {
    return {
        type: SELECT_PAGE,
        page: sPage
    }
}


// -------------- request user info

function requestUserInfo() {
    return {
        type: REQUEST_USER_INFO,
    }
}

function receiveUserInfo(oInfo) {
    return {
        type: RECEIVE_USER_INFO,
        payload: oInfo,
        receivedAt: Date.now()
    }
}

export function fetchUserInfo() {
    return (dispatch) => {
        dispatch(requestUserInfo());
        return axios.get(oConfig.getParam('me'),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true,
            })
            .then(response => dispatch(receiveUserInfo(response.data)))
            .catch(function (error) {
                if (!error.status) {
                    console.log(error)
                }
            });
    };
}

//-------------------------- GET COMMENTS ----------------

function requestComments(sMethod) {
    return {
        type: REQUEST_COMMENTS,
        method: sMethod
    }
}

function receiveComments(sMethod, oData) {
    return {
        type: RECEIVE_COMMENTS,
        method: sMethod,
        data: oData
    }
}

function shouldFetchComments({ project, lots }, start) {
    const { selected_lot } = project,
        { data } = lots,
        iLotIndex = data && Object.keys(data).findIndex(iLot => data[iLot].id === selected_lot);

    if (data[iLotIndex] && data[iLotIndex].comments && Object.keys(data[iLotIndex].comments.items).length === data[iLotIndex].comments.total)
        return false;

    return true
}

export function fetchCommentsIfNeeded(start, sMethod = 'get_live_comments') {
    return (dispatch, getState) => {
        if (shouldFetchComments(getState(), start)) {
            return dispatch(fetchComments(start, sMethod))
        }
        return Promise.resolve();
    }
}

export function fetchComments(start = 0, sMethod = 'get_live_comments') {
    return (dispatch, getState) => {

        const { project } = getState(),
            oData = {
                method: sMethod,
                module: 'bx_messenger',
                params: [project.selected_lot, start, oConfig.getParam('per_page_comments')] //$iObjectId, $sType, $iProfileId = 0
            },

            sUrl = buildServiceUrl(oData);

        dispatch(requestComments());

        return axios.get(sUrl,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
            .then(response => dispatch(receiveComments(sMethod, response.data)));
    }
}

/* ------------- send feedback comments  --------------- */
function sendMessage(iLotId, data) {
    return {
        type: SEND_MESSAGE,
        data: data,
        lot_id: iLotId
    }
}

function getMessageAnswer({ data }) {
    return {
        type: GET_MESSAGE_ANSWER,
        payload: data
    }
}

export function postComment(sText, sMethod = 'post_live_comments') {
    return (dispatch, getState) => {
        const { project, user } = getState(),
            oData = {
                method: sMethod,
                module: 'bx_messenger',
                params: [sText, project.selected_lot]
            };

        return executeRequest(
            dispatch,
            getServiceLink(sMethod),
            () => sendMessage(project.selected_lot, {
                text: sText, date: new Date().getTime() / 1000, author: {
                    icon: user.data.picture,
                    name: user.data.profile_display_name,
                    ...user.data
                }
            }),
            (oData) => getMessageAnswer(oData),
            'post',
            { text: sText, lot_id: project.selected_lot }
        );
    };
}

/* ------------- remove comment --------------- */
function removeComment(data) {
    return {
        type: REMOVE_COMMENT,
        payload: data
    }
}

function responseRemoveComment({ data }) {
    return {
        type: REMOVE_COMMENT_RESPONSE,
        payload: data
    }
}


/**
 * Main function which builds and send request to the site
 * @param dispatch
 * @param sUrl
 * @param fPrevAction
 * @param fSuccessAction
 * @param sMethod
 * @param oData
 * @returns {Promise<AxiosResponse<any>>}
 */

function executeRequest(dispatch, sUrl, fPrevAction, fSuccessAction, sMethod = 'get', oData = {}) {
    if (typeof fPrevAction === 'function')
        dispatch(fPrevAction());

    let oConfig = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        validateStatus: function (status) {
            return status < 500; // Reject only if the status code is greater than or equal to 500
        }
    };

    const fCallback = ({ data }) => {
        if (typeof fSuccessAction === 'function')
            return dispatch(fSuccessAction(data))
    };

    if (sMethod === 'post')
        return axios.post(sUrl, querystring.stringify(oData), { withCredentials: true }).then(fCallback);

    return axios.get(sUrl, oConfig).then(fCallback);
}

//------------ gets all audio files for Song Project

export function requestAudio(iLotId) {
    return {
        type: REQUEST_LOT_AUDIO,
        lot_id: iLotId
    }
}

export function receiveAudio(data) {
    return {
        type: RECEIVE_LOT_AUDIO,
        data: data
    }
}

export function fetchAudioFiles(iLotId, sMethod = 'get_audio_list') {
    const
        oData = {
            method: sMethod,
            module: 'bx_messenger',
            params: [iLotId]
        };

    return dispatch => executeRequest(
        dispatch,
        buildServiceUrl(oData),
        () => requestAudio(),
        (oData) => receiveAudio(oData)
    );
}

//-------------------------- Add Audio files to the list  ----------------

export function requestUpdateList(iProject, iAudio, sList, sAction = 'add') {
    return {
        type: REQUEST_UPDATE_LIST,
        project: iProject,
        file: iAudio,
        list: sList,
        action: sAction
    }
}

export function receiveUpdateList(oData) {
    return {
        type: RECEIVE_UPDATE_LIST,
        data: oData
    }
}

export function addAudioFileToTheList(iLotId, iAudio, sList, sMethod = 'add_file_to_list') {
    const
        oData = {
            method: sMethod,
            module: 'bx_messenger',
            params: [iLotId, iAudio, sList]
        };

    return (dispatch, getState) => {
        const { user } = getState();
        dispatch(addToList(iLotId, iAudio, user.data.id, sList));
        return executeRequest(
            dispatch,
            buildServiceUrl(oData),
            () => requestUpdateList(iLotId, iAudio, sList),
            (oData) => receiveUpdateList(oData)
        );
    }
}

export function requestUpdateMyProfileList(iSongProfile, sAction = 'add', oObject) {
    return {
        type: REQUEST_UPDATE_PROFILES_LIST,
        profile: iSongProfile,
        action: sAction,
        object: oObject
    }
}

//-------------------------- Add Song Profile to my circle list

export function receiveUpdateMyProfileList(oData) {
    return {
        type: RECEIVE_UPDATE_PROFILES_LIST,
        data: oData
    }
}

export function updateMySongProfileList(iSPId, sAction = 'add', oObject) {
    return dispatch => {
        const
            oData = {
                method: 'update_my_profiles_list',
                module: 'bx_messenger',
                params: [iSPId, sAction]
            };

        return executeRequest(
            dispatch,
            buildServiceUrl(oData),
            () => requestUpdateMyProfileList(iSPId, sAction, oObject),
            (oData) => receiveUpdateMyProfileList(oData)
        );
    }
}


// ---------------- delete sound file from song profile list
export function deleteSoundFile(iAudio, sMethod = 'delete_file_list') {
    return (dispatch, getState) => {
        const { user, project } = getState();
        const
            oData = {
                method: sMethod,
                module: 'bx_messenger',
                params: [project.selected_lot, iAudio, project.list]
            };

        dispatch(deleteSound(project.selected_lot, iAudio, user.data.id));
        return executeRequest(
            dispatch,
            buildServiceUrl(oData),
            () => requestUpdateList(project.selected_lot, iAudio, project.list, 'delete'),
            (oData) => receiveUpdateList(oData)
        );
    }
}

// ----------------------------

export function selectTab(sTab) {
    return {
        type: SELECT_TAB,
        list: sTab
    }
}

export function addToList(iLotId, iFileId, iProfile, sList) {
    return {
        type: ADD_TO_LIST,
        file_id: iFileId,
        lot_id: iLotId,
        list: sList,
        profile: iProfile
    }
}


export function playSound(oFile, sStatus) {
    return {
        type: PLAY_SOUND,
        file: oFile,
        status: sStatus
    }
}

export function stopSound(sStatus) {
    return {
        type: STOP_SOUND,
        status: sStatus
    }
}

export function deleteSound(iLotId, iFileId, iProfile) {
    return {
        type: DELETE_SOUND,
        file_id: iFileId,
        lot_id: iLotId,
        profile: iProfile
    }
}

//--------------------- gets Sound Project's info

function receiveLotsInfo(data) {
    return {
        type: RECEIVE_LOTS_INFO,
        payload: data
    }
}

function requestLotsInfo() {
    return {
        type: REQUEST_LOTS_INFO,
    }
}

export function fetchLotsInfo(mixedId = '', bBySPId = false, sMethod = 'get_lots_list') {
    const
        oData = {
            method: sMethod,
            module: 'bx_messenger',
            params: [mixedId, +bBySPId]
        };

    return dispatch => {
        return executeRequest(
            dispatch,
            buildServiceUrl(oData),
            () => requestLotsInfo(),
            (oData) => receiveLotsInfo(oData)
        );
    }
}

// select Sound Project by id

export function selectLot(iLotId, iTitle) {
    return {
        type: SELECT_LOT,
        lot: iLotId,
        title: iTitle,
    }
}

// select song profile by ID

export function selectProfile(iProfile) {
    return {
        type: SELECT_PROFILE,
        id: iProfile
    }
}

//------------------------- gets Song Profile info

export function requestSPAction(iProfId, sAction) {
    return {
        type: REQUEST_SP_ACTION,
        id: iProfId,
        action: sAction
    }
}

export function receiveSPAction(data) {
    return {
        type: RECEIVE_SP_ACTION,
        data: data
    }
}

export function performSPAction(iId, sAction) {
    const oData = {
        method: 'perform_action',
        module: 'bx_messenger',
        params: [iId, sAction]
    };

    return dispatch => executeRequest(dispatch, buildServiceUrl(oData), () => requestSPAction(iId, sAction), (oData) => receiveSPAction(oData));
}

// delete song profile from the list

export function deleteSongProfile(iSongProfileId, sMethod = 'update_my_profiles_list') {
    return dispatch => {
        const
            oData = {
                method: sMethod,
                module: 'bx_messenger',
                params: [iSongProfileId, 'remove']
            };

        return executeRequest(
            dispatch,
            buildServiceUrl(oData),
            () => requestUpdateMyProfileList(iSongProfileId, 'remove'),
            (oData) => receiveUpdateMyProfileList(oData)
        );
    }
}

//--------------------------- get Song profiles list by search criteria

export function requestProfiles(sSearch = '') {
    return {
        type: REQUEST_PROFILES,
        search: sSearch,
    }
}

export function receiveProfiles(oData) {
    return {
        type: RECEIVE_PROFILES,
        data: oData
    }
}

export function getProfiles(sSearch = '') {
    const oData = {
        method: 'get_s_p_list',
        module: 'bx_messenger',
        params: [sSearch]
    };

    return dispatch => executeRequest(dispatch, buildServiceUrl(oData), () => requestProfiles(), (oData) => receiveProfiles(oData));
}

//------------------------------- get translations
export function requestTranslation() {
    return {
        type: REQUEST_TNS,
    }
}

export function receiveTranslations(oData) {
    return {
        type: RECEIVE_TNS,
        data: oData
    }
}

export function getTNS() {
    const oData = {
        method: 'get_language_keys',
        module: 'bx_messenger',
        params: []
    };

    return dispatch => executeRequest(dispatch, buildServiceUrl(oData), () => requestTranslation(), (oData) => receiveTranslations(oData));
}

export function loadTalk(lot_id) {
    const oData = {
        method: 'load_talk',
        module: 'bx_messenger',
        params: []
    };

    return dispatch => executeRequest(dispatch,
        buildServiceUrl(oData),
        () => requestLoadTalk(),
        (oData) => receiveLoadTalk(oData),
        'post',
        { lot_id: lot_id, mark_as_read: 0 }
    );
}

export function requestLoadTalk() {
    return {
        type: REQUEST_MESSENGER_INFO,
    }
}

export function receiveLoadTalk(oData) {
    return {
        type: RECEIVE_MESSENGER_INFO,
        data: oData
    }
}

//------------------------------- remove Song Profile 

export function requestRemoveSP(iSPid) {
    return {
        type: REQUEST_REMOVE_SP,
        id: iSPid
    }
}

export function receiveRemoveSP(oData) {
    return {
        type: RECEIVE_REMOVE_SP,
        result: oData
    }
}

export function createLot(iLot, title) {
    const oData = {
        method: 'save_lots_parts',
        module: 'bx_messenger',
        params: []
    };

    return dispatch => executeRequest(dispatch,
        buildServiceUrl(oData),
        () => requestCreateLot(title),
        (oData) => receiveCreateLotResult(oData),
        'post',
        { lot: iLot, title: title }
    );
}

export function updateLot(iLot, title) {
    const oData = {
        method: 'save_lots_parts',
        module: 'bx_messenger',
        params: []
    };

    return dispatch => executeRequest(dispatch,
        buildServiceUrl(oData),
        () => requestCreateLot(),
        (oData) => receiveCreateLotResult(oData),
        'post',
        { lot_id: iLot, title: title }
    );
}

export function requestCreateLot(title) {
    return {
        type: CREATE_LOT,
        title,
    }
}

export function receiveCreateLotResult(oData) {
    return {
        type: CREATE_LOT_RESULT,
        payload: oData,
    }
}

export function removeSP(iSPId) {
    const oData = {
        method: 'remove_s_p',
        module: 'bx_messenger',
        params: [iSPId]
    };

    return dispatch => executeRequest(dispatch,
        buildServiceUrl(oData),
        () => requestRemoveSP(iSPId),
        (oData) => receiveRemoveSP(oData));
}

export function updateProject(iLotId, projectData) {
    return {
        type: UPDAT_PROJECT,
        lotId: iLotId,
        payload: projectData,
    }
}
