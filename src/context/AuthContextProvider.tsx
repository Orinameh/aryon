import { Dispatch, ReactNode, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export type AuthType = { token: string };
type AuthActionsType = "LOGIN" | "LOGOUT";

export type DispatchType = Dispatch<{
  type: AuthActionsType;
  payload: { user: AuthType };
}>;

const authReducer = (
  state: { user: AuthType },
  action: {
    type: AuthActionsType;
    payload: { user: { token: string } };
  }
) => {
  switch (action.type) {
    case "LOGIN":
      return { ...action.payload };
    case "LOGOUT":
      return { user: { token: "" } };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [state, dispatch] = useReducer(authReducer, { user});
  const token = user.token;

  useEffect(() => {
    if (token !== "" || !token) {
      dispatch({ type: "LOGIN", payload: { user: {token} } });
    }
  }, [dispatch, token]);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
