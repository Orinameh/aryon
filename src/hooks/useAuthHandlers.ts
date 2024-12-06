import { LoginSchemaType } from "@/pages/login";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";

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
    const { login } = useAuthStore()
    const { mutate, isPending } = useMutation({
      mutationFn: loginUser,
      onSuccess: async (data) => {
        console.log(data)
        if (data?.error) {
          return;
        } else {
          console.log("Here")
          toast.success("Login successful");
          localStorage.setItem("user", JSON.stringify(data));
          login();
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