import axios from 'axios';

// Actions
const LOGIN = 'dp/user/LOGIN';
const LOGIN_OUT = 'dp/user/LOGIN_OUT';
const GET_LOGIN_STATE = 'dp/user/GET_LOGIN_STATE';

// Reducer
const LOADING_STATUS = 0;
const GUEST_STATUS = 1;
const MEMBER_STATUS = 2;
// Reducer user
const initialState = {
  isLogin: false,
  username: null,
  uid: null,
  loginState: LOADING_STATUS,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGIN_STATE: {
      return {
        ...state,
        isLogin: action.payload.data.errcode == 0,
        loginState: action.payload.data.errcode == 0 ? MEMBER_STATUS : GUEST_STATUS,
        uid: action.payload.data.data ? action.payload.data.data.Id : null,
        username: action.payload.data.data ? action.payload.data.data.Username : null,
        add_time: action.payload.data.data ? action.payload.data.data.AddTime : null,
      };
    }
    case LOGIN: {
      if (action.payload.data.errcode === 0) {
        return {
          ...state,
          isLogin: true,
          loginState: MEMBER_STATUS,
          uid: action.payload.data.data.uid,
          username: action.payload.data.data.username,
          add_time: action.payload.data.data.add_time,
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
      };
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

export function logoutActions() {
  return {
    type: LOGIN_OUT,
    payload: axios.get('/api/user/logout')
  };
}

