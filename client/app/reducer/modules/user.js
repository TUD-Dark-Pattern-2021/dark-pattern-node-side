import axios from 'axios';

// Actions
const LOGIN = 'dp/user/LOGIN';
const LOGIN_OUT = 'dp/user/LOGIN_OUT';
const GET_LOGIN_STATE = 'dp/user/GET_LOGIN_STATE';
const REGISTER = 'dp/user/REGISTER';
const SET_IMAGE_URL = 'dp/user/SET_IMAGE_URL';
const ADD_TO_FAVORITE = 'dp/user/ADD_TO_FAVORITE';
const DEL_FAVORITE = 'dp/user/DEL_FAVORITE';
const GET_FAVORITE_LIST = 'dp/user/GET_FAVORITE_LIST';

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
        uid: action.payload.data.data ? action.payload.data.data.Id : null,
        email: action.payload.data.data ? action.payload.data.data.Email : null,
        add_time: action.payload.data.data ? action.payload.data.data.AddTime : null,
        up_time: action.payload.data.data ? action.payload.data.data.UpTime : null,
      };
    }
    case LOGIN: {
      if (action.payload.data.errcode === 0) {
        return {
          ...state,
          isLogin: true,
          loginState: MEMBER_STATUS,
          uid: action.payload.data.data.uid,
          email: action.payload.data.data.email,
          add_time: action.payload.data.data.add_time,
          up_time: action.payload.data.data.up_time,
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
        uid: null,
        email: null,
        add_time: null,
        up_time: null,
      };
    }
    case REGISTER: {
      if (action.payload.data.errcode === 0) {
        return {
          ...state,
          isLogin: true,
          loginState: MEMBER_STATUS,
          uid: action.payload.data.data.Id,
          email: action.payload.data.data.Email,
          add_time: action.payload.data.data.AddTime,
          up_time: action.payload.data.data.UpTime,
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

