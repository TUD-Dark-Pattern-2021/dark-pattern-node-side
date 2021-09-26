import axios from 'axios';

// Actions
const LOGIN = 'anime/user/LOGIN';
const LOGIN_OUT = 'anime/user/LOGIN_OUT';
const GET_LOGIN_STATE = 'anime/user/GET_LOGIN_STATE';
const REGISTER = 'anime/user/REGISTER';
const SET_IMAGE_URL = 'anime/user/SET_IMAGE_URL';
const ADD_TO_FAVORITE = 'anime/user/ADD_TO_FAVORITE';
const DEL_FAVORITE = 'anime/user/DEL_FAVORITE';
const GET_FAVORITE_LIST = 'anime/user/GET_FAVORITE_LIST';

// Reducer
const LOADING_STATUS = 0;
const GUEST_STATUS = 1;
const MEMBER_STATUS = 2;
// Reducer user
const initialState = {
  isLogin: false,
  userName: null,
  uid: null,
  email: '',
  loginState: LOADING_STATUS,
  imageUrl: '',
  favorites: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGIN_STATE: {
      return {
        ...state,
        isLogin: action.payload.data.errcode == 0,
        loginState: action.payload.data.errcode == 0 ? MEMBER_STATUS : GUEST_STATUS,
        userName: action.payload.data.data ? action.payload.data.data.username : null,
        uid: action.payload.data.data ? action.payload.data.data._id : null,
        email: action.payload.data.data ? action.payload.data.data.email : null,
        add_time: action.payload.data.data ? action.payload.data.data.add_time : null,
        up_time: action.payload.data.data ? action.payload.data.data.up_time : null,
        favorites: action.payload.data.data ? action.payload.data.data.favorites : null,
      };
    }
    case LOGIN: {
      if (action.payload.data.errcode === 0) {
        return {
          ...state,
          isLogin: true,
          loginState: MEMBER_STATUS,
          uid: action.payload.data.data.uid,
          userName: action.payload.data.data.username,
          email: action.payload.data.data.email,
          add_time: action.payload.data.data.add_time,
          up_time: action.payload.data.data.up_time,
          favorites: action.payload.data.data.favorites
        };
      } else {
        return state;
      }
    }
    case LOGIN_OUT: {
      return {
        ...state,
        isLogin: false,
        loginState: GUEST_STATUS,
        userName: null,
        uid: null,
        email: null,
        add_time: null,
        up_time: null,
        favorites: null,
      };
    }
    case REGISTER: {
      if (action.payload.data.errcode === 0) {
        return {
          ...state,
          isLogin: true,
          loginState: MEMBER_STATUS,
          uid: action.payload.data.data.uid,
          userName: action.payload.data.data.username,
          email: action.payload.data.data.email,
          add_time: action.payload.data.data.add_time,
          up_time: action.payload.data.data.up_time,
          favorites: action.payload.data.data.favorites,
        };
      } else {
        return state;
      }
    }

    case SET_IMAGE_URL: {
      return {
        ...state,
        imgUrl: action.data
      };
    }
    case ADD_TO_FAVORITE: {
      return {
        ...state,
        // favorites: action.payload.data.data.favorites,
      }
    }
    default:
      return state;
  }
};

// Action Creators
export function checkLoginState() {
  return {
    type: GET_LOGIN_STATE,
    payload: axios.get('/api/user/status')
  };
}

export function loginActions(data) {
  return {
    type: LOGIN,
    payload: axios.post('/api/user/login', data)
  };
}

export function regActions(data) {
  const { email, password, userName } = data;
  const param = {
    email,
    password,
    username: userName
  };
  return {
    type: REGISTER,
    payload: axios.post('/api/user/reg', param)
  };
}

export function logoutActions() {
  return {
    type: LOGIN_OUT,
    payload: axios.get('/api/user/logout')
  };
}

export function setImageUrl(data) {
  return {
    type: SET_IMAGE_URL,
    data
  };
}

export function addToFavorite (data) {
  return {
    type: ADD_TO_FAVORITE,
    payload: axios.post('/api/user/favorite/add', data)
  }
}

export function delFavorite (id) {
  return {
    type: DEL_FAVORITE,
    payload: axios.delete(`/api/user/favorite/delete/${id}`)
  }
}
export function getFavorite (data) {
  return {
    type: GET_FAVORITE_LIST,
    payload: axios.get('/api/user/getFavoriteList', data)
  }
}
