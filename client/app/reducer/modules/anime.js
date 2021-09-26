import axios from "axios";

const GET_ANIME_LIST = 'anime/anime/LIST';

const initialState = {
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ANIME_LIST: {
      return {
        ...state,
        list: action.payload.data.data
      };
    }
    default:
      return state;
  }
}

export function getAnimeList(params) {
  return {
    type: GET_ANIME_LIST,
    payload: axios.get('/api/anime/list', {
      params
    })
  };
}
