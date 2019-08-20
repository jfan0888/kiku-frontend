import {
  GET_SONG_REQUEST,
  GET_SONG_SUCCESS,
  GET_SONG_ERROR,
  SET_SONG_REQUEST,
  SET_SONG_SUCCESS,
  SET_SONG_ERROR,
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  error: null,
  data: {
    id: 1,
    archive: [],
    lyrics: [],
    coWriters: [],
    status: null,
    audioUrl: 'https://okazari.github.io/Rythm.js/samples/rythmC.mp3',
  },
};

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case GET_SONG_REQUEST:
    case SET_SONG_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_SONG_SUCCESS:
    case SET_SONG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data,
      };

    case GET_SONG_ERROR:
    case SET_SONG_ERROR:
      return {
        ...state,
        isLoading: false,
        error,
      };

    default:
      return state;
  }
};
