const initialState = {
  userId: "",
  userName: "",
  access_token: "",
};

export const STORE_INFO = "[USER] Store info";
export const LOGOUT = "[USER] Logout";

export const saveInfo = (payload) => {
  try {
    return { type: STORE_INFO, payload };
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  try {
    return { type: LOGOUT };
  } catch (error) {
    console.log(error);
  }
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STORE_INFO:
      return { ...state, ...payload };
    case LOGOUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
