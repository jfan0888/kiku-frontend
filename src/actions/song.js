import * as API from '../api';

import {
  GET_SONG_REQUEST,
  GET_SONG_SUCCESS,
  GET_SONG_ERROR,
  SET_SONG_REQUEST,
  SET_SONG_SUCCESS,
  SET_SONG_ERROR,
} from '../constants/actionTypes';

export const getSongById = songId => async dispatch => {
  try {
    dispatch({ type: GET_SONG_REQUEST });

    const { data } = await API.getSongById(songId);

    dispatch({ type: GET_SONG_SUCCESS, data });
  } catch (error) {
    dispatch({ type: GET_SONG_ERROR, error });
  }
};

export const updateSong = (songId, data) => dispatch => {
  try {
    dispatch({ type: SET_SONG_REQUEST });

    // const { data } = await API.getSongById(songId);

    dispatch({ type: SET_SONG_SUCCESS, data });
  } catch (error) {
    dispatch({ type: SET_SONG_ERROR, error });
  }
};
