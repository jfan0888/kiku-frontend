import {
    INVALIDATE_DATA,
    REQUEST_POSTS,
    RECEIVE_POSTS,
    PLAY_SOUND,
    DELETE_SOUND,
    RECEIVE_USER_INFO,
    REQUEST_USER_INFO,
    ADD_TO_LIST,
    RECEIVE_PROFILES,
    REQUEST_PROFILES,
    SELECT_TAB,
    STOP_SOUND,
    RECEIVE_LOTS_INFO,
    REQUEST_LOTS_INFO,
    SELECT_PAGE,
    SELECT_LOT,
    RECEIVE_LOT_AUDIO,
    REQUEST_LOT_AUDIO,
    SELECT_PROFILE,
    RECEIVE_COMMENTS,
    SEND_MESSAGE,
    REQUEST_UPDATE_PROFILES_LIST,
    RECEIVE_TNS,
    REQUEST_SP_ACTION,
    RECEIVE_UPDATE_LIST,
    CREATE_LOT,
    CREATE_LOT_RESULT,
    UPDAT_PROJECT,
    RECEIVE_MESSENGER_INFO,
} from './actions';
import oStorage from "../../storage";
import oConfig from '../../config';

export function getUser(oState = {
    isFetching: false,
    didInvalidate: false,
    data: null
}, action) {
    switch (action.type) {
        case RECEIVE_USER_INFO:
            let oUser = {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                data: action.payload
            };

            oStorage.setData('user', oUser);
            return Object.assign({}, oState, oUser);
        case REQUEST_USER_INFO:
            return Object.assign({}, oState, {
                isFetching: true,
                didInvalidate: true,
            });

        case REQUEST_UPDATE_PROFILES_LIST:
            const { circle } = oState.data;
            let oCircle = Object.assign({}, circle);

            if (action.action === 'remove' && action.profile)
                delete oCircle[action.profile];
            else
                if (action.action === 'add' && action.object)
                    oCircle[action.profile] = action.object;
                else
                    return oState;


            return Object.assign({}, oState, {
                data:
                    Object.assign({}, oState.data, {
                        'circle': oCircle
                    })
            });

        default:
            return oState;
    }
}


export function getProfiles(oState = {
    isFetching: false,
    didInvalidate: false,
    data: null
}, action) {
    switch (action.type) {
        case RECEIVE_PROFILES:
            let oUser = {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                data: action.data
            };

            oStorage.setData('user', oUser);
            return Object.assign({}, oState, oUser);
        case REQUEST_PROFILES:
            return Object.assign({}, oState, {
                isFetching: true,
                didInvalidate: true,
            });
        default:
            return oState;
    }
}

export function getLots(oState = {
    isFetching: false,
    didInvalidate: false,
    data: null
}, action) {
    const lots = oState.data;
    let iLotIndex = null,
        audio_list = null,
        profiles = null,
        { profile, file_id, lot_id } = action,
        oObject = null,
        oLot = null,
        profile_index = null;

    switch (action.type) {
        case RECEIVE_LOTS_INFO:
            let oLots = {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                data: Object.assign({}, oState.data, action.payload)
            };

            return Object.assign({}, oState, oLots);

        case REQUEST_LOTS_INFO:
            return Object.assign({}, oState, {
                isFetching: true,
                didInvalidate: true,
            });

        case CREATE_LOT:
            return Object.assign({}, oState, {
                isFetching: true,
                didInvalidate: true,
            });

        case CREATE_LOT_RESULT:
            return Object.assign({}, oState, {
                isFetching: false,
                didInvalidate: false,
            });

        case RECEIVE_LOT_AUDIO:

            if (!action.data.lot_id || !action.data.audio_list)
                return oState;

            let oList = {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: new Date().getTime(),
                data: Object.assign({}, oState.data, { [action.data.lot_id]: Object.assign({}, lots[action.data.lot_id], { audio_list: action.data.audio_list }) })
            };

            return Object.assign({}, oState, oList);

        case DELETE_SOUND:
            profiles = ~lot_id && lots && lots[lot_id].profiles;
            profile_index = profiles && Object.keys(profiles).find(iValue => profiles[iValue].profile_id === profile);

            if (~profile_index && profiles[profile_index]) {
                let aList = (profiles[profile_index].audio_list.length && profiles[profile_index].audio_list.split(',')) || [];
                aList.splice(aList.indexOf(file_id), 1);
                oObject = { audio_list: aList.join(',') };
            }

            return Object.assign({}, oState, {
                data:
                    Object.assign({}, lots, {
                        [lot_id]:
                            Object.assign({}, lots[lot_id], {
                                profiles:
                                    Object.assign({}, profiles, {
                                        [profile_index]:
                                            Object.assign({}, profiles[profile_index], oObject)
                                    }
                                    )
                            })
                    })
            });

        case REQUEST_SP_ACTION:
            iLotIndex = lots && Object.keys(lots).find(iIndex => {
                const { profiles } = lots[iIndex];
                return Object.keys(profiles).find(i => profiles[i].id === action.id)
            });

            let oProfiles = ~iLotIndex && lots[iLotIndex].profiles && Object.assign({}, lots[iLotIndex].profiles);

            if (oProfiles && action.action === 'remove')
                delete oProfiles[action.id];
            else
                if (oProfiles && action.action === 'visibility')
                    oProfiles[action.id].public = !+oProfiles[action.id].public;
                else
                    return oState;

            return Object.assign({}, oState, {
                data:
                    Object.assign({}, lots, {
                        [iLotIndex]:
                            Object.assign({}, lots[iLotIndex], {
                                profiles: oProfiles
                            })
                    })
            });

        case RECEIVE_UPDATE_LIST:
            const { new_sp } = action.data;
            if (new_sp) {
                iLotIndex = new_sp.lot_id;//lots && Object.keys(lots).findIndex(iId => lots[iId].id === new_sp.lot_id);

                return iLotIndex && Object.assign({}, oState, {
                    data:
                        Object.assign({}, lots, {
                            [iLotIndex]:
                                Object.assign({}, lots[iLotIndex], {
                                    profiles:
                                        Object.assign({}, lots[iLotIndex].profiles, { [new_sp.id]: new_sp })
                                })
                        })
                });
            }

            return oState;

        case ADD_TO_LIST:
            iLotIndex = action.lot_id;
            profiles = ~iLotIndex && lots && lots[iLotIndex].profiles;

            const { list } = action;
            profile_index = profiles && Object.keys(profiles).find(iValue => profiles[iValue].profile_id === profile);

            oObject = Object.create(null);
            if (~profile_index && profiles[profile_index]) {
                if (list === 'archive') {
                    let aList = (profiles[profile_index].audio_list && profiles[profile_index].audio_list.length && profiles[profile_index].audio_list.split(',')) || [];
                    aList.push(file_id);

                    oObject = { audio_list: aList.join(',') };
                } else if (list === 'listen')
                    oObject = { song_id: file_id };
            }
            else
                return oState;

            return Object.assign({}, oState, {
                data:
                    Object.assign({}, lots, {
                        [iLotIndex]:
                            Object.assign({}, lots[iLotIndex], {
                                profiles:
                                    Object.assign({}, profiles, {
                                        [profile_index]:
                                            Object.assign({}, profiles[profile_index], oObject)
                                    }
                                    )
                            })
                    })
            });

        case RECEIVE_COMMENTS:
            iLotIndex = action.data.lot_id;//lots && Object.keys(lots).findIndex(iLot => lots[iLot].id === action.data.lot_id);

            if (iLotIndex === -1)
                return oState;

            oList = {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: new Date().getTime(),
                data: Object.assign({}, oState.data, {
                    [iLotIndex]: Object.assign({}, lots[iLotIndex], {
                        comments:
                            Object.assign({}, lots[iLotIndex].comments, {
                                items: Object.assign(
                                    {},
                                    (lots[iLotIndex].comments && lots[iLotIndex].comments.items) || {},
                                    action.data.comments
                                ),
                                total: action.data.total
                            })
                    })
                })
            };

            return Object.assign({}, oState, oList);

        case SEND_MESSAGE:
            iLotIndex = action.lot_id;//ots && Object.keys(lots).findIndex(iLot => lots[iLot].id === action.lot_id);

            if (iLotIndex === -1 || !action.data)
                return oState;

            const { items, total } = lots[iLotIndex].comments;

            let iNewIndex = (new Date()).getTime() / 1000;

            oList = {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: new Date().getTime(),
                data: Object.assign({}, oState.data, {
                    [iLotIndex]: Object.assign({}, lots[iLotIndex], {
                        comments:
                            Object.assign({}, lots[iLotIndex].comments, {
                                items: Object.assign({}, lots[iLotIndex].comments.items, { [iNewIndex]: action.data }),
                                total: lots[iLotIndex].comments.total + 1
                            })
                    })
                })
            };

            return Object.assign({}, oState, oList);

        case REQUEST_LOT_AUDIO:
            return Object.assign({}, oState, {
                isFetching: true,
                didInvalidate: true,
            });
        default:
            return oState;
    }
}

export function getProject(oState = {
    isFetching: false,
    didInvalidate: false,
    selected_profile: null,
    list: oConfig.getParam('default_list'),
    files: [],
    lists: [],
    coWriters: [],
    sound: null,
    selected_lot: null,
    title: '',
    page: oConfig.getParam('default_page'),
    tns: null,
    template: null,
    songData: {
        id: 1,
        archive: [],
        lyrics: [],
        coWriters: [],
        status: null,
        audioUrl: 'https://okazari.github.io/Rythm.js/samples/rythmC.mp3',
    }
}, action) {
    const { sound } = oState;

    switch (action.type) {

        case SELECT_TAB:
            return Object.assign({}, oState, { list: action.list });

        case SELECT_LOT:
            return Object.assign({}, oState, { selected_lot: action.lot, title: action.title });

        case SELECT_PROFILE:
            return Object.assign({}, oState, { selected_profile: action.id });

        case UPDAT_PROJECT:
            if (!action.lot_id || action.lotId !== oState.selected_lot) return oState;

            return Object.assign({}, oState, {
                ...action.payload
            });

        case RECEIVE_MESSENGER_INFO:
            return Object.assign({}, oState, { template: action.data });
        case PLAY_SOUND:
            if (action.file && (!sound || sound.file.id !== action.file.id))
                return Object.assign({}, oState, { sound: { file: action.file, status: action.status } });

            if (action.status && sound)
                return Object.assign({}, oState, { sound: Object.assign({}, sound, { status: action.status }) });

            return oState;

        case STOP_SOUND:
            return Object.assign({}, oState, {
                'sound': Object.assign({}, sound,
                    { 'status': action.status })
            });

        case SELECT_PAGE:
            return Object.assign({}, oState, { 'page': action.page });

        case RECEIVE_TNS:
            return Object.assign({}, oState, { 'tns': action.data });

        default:
            return oState;
    }
}