const initialState = {

    signin:null,
    loading: false,
    error: null,
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_DATA_REQUEST":
            return {
              ...state,
              loading: true,
              error: null,
            };
          case "LOGIN_DATA_SUCCESS":
            return {
              ...state,
              signin: action.payload,
              loading: false,
              error: null,
            };
          case "LOGIN_DATA_FAILURE":
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
        default:
          return state;
      }
    };
    export default userReducer;