import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.task.deletelist["$delete"], 200>;
type RequestType = InferRequestType<typeof client.api.task.deletelist["$delete"]>["json"];

export const useDeleteList = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
       
        mutationFn: async (json) => {
            const response = await client.api.task.deletelist.$delete({json});

            if (!response.ok) {
                throw new Error("Failed to dalete list");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("List deleted");
            queryClient.invalidateQueries({ queryKey: ["list"] });
        },
        onError: () => {
            toast.error("Failed to delete list");
        }
    });

    return mutation;
}