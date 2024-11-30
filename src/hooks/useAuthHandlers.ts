import { LoginSchemaType } from "@/pages/login";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";
import { useMutation } from "@tanstack/react-query";

const loginUser = async (data: LoginSchemaType) => {
    try {
      const res = await api.post(`/login`, data);
      return res.data;
    } catch (error) {
      toast.error((error as { error: string }).error);
      return error;
    }
  };
  export const useAuthHandlers = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();
    const { mutate, isPending } = useMutation({
      mutationFn: loginUser,
      onSuccess: async (data) => {
        if (data.error) {
          return;
        } else {
          toast.success("Login successful");
          localStorage.setItem("user", JSON.stringify(data));
          dispatch({ type: "LOGIN", payload: data });
          navigate("/recommendations");
        }
      },
    });
  
    const handleLogin = async (data: LoginSchemaType) => {
      await mutate(data);
    };
  
    return {
      handleLogin,
      isPending,
    };
  };