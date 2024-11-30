import { createContext } from "react";
import { AuthType, DispatchType } from "./AuthContextProvider";

type ContextType = { user: AuthType; dispatch: DispatchType };

export const AuthContext = createContext<ContextType>({
  user: { token: "" },
  dispatch: () => {},
});