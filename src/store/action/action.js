import axios from "axios";

export const LOGIN_DATA_REQUEST = "LOGIN_DATA_REQUEST";
export const LOGIN_DATA_SUCCESS = "LOGIN_DATA_SUCCESS";
export const LOGIN_DATA_FAILURE = "LOGIN_DATA_FAILURE";

export const loginAll = (API_URL, data) => {
    return (dispatch) => {
      dispatch({ type: LOGIN_DATA_REQUEST });
  
      axios
        .post(API_URL + "user/signin", data)
        .then((response) => {
          dispatch({ type: LOGIN_DATA_SUCCESS, payload: response.data });
          localStorage.setItem("responsedata", JSON.stringify(response.data));
          return response;
        })
  
        .catch((error) => {
          dispatch({ type: LOGIN_DATA_FAILURE, payload: error.message });
          throw error;
        });
    };
  };