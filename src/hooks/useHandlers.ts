import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useHandlers = (onClose: () => void) => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
      mutationFn: async ({
        id,
        type,
      }: {
        id: string;
        type: "archive" | "unarchive";
      }) => {
        try {
          const res = await api.post(`/recommendations/${id}/${type}`, {});
          return res.data;
        } catch (error) {
          toast.error((error as { error: string }).error);
          return error;
        }
      },
      onSuccess: async (data, { type }) => {
        if (data.error) {
          return;
        } else {
          queryClient.invalidateQueries();
          toast.success(`${type} successful`);
          onClose();
          // if (type === "archive") {
          //   navigate("/archived");
          // } else {
          //   navigate("/recommendations");
          // }
        }
      },
    });
  
    const handleArchive = async (id: string, type: "archive" | "unarchive") => {
      mutate({ id, type });
    };
  
    return {
      handleArchive,
      isPending,
    };
  };