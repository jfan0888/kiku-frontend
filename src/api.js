import axios from 'axios';
import { SERVER_URL } from './constants';

export const getSongById = songId => {
  const url = `${SERVER_URL}/songs/${songId}/`;
  return axios({
    method: 'GET',
    url,
  });
};
