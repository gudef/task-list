import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.task.addlist["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.task.addlist["$post"]>["json"];

export const useCreateList = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.task.addlist.$post({ json });

            if(!response.ok){
                throw new Error("Something went wrong");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("List created");

            queryClient.invalidateQueries({queryKey: ["list"]});
        },
        onError: () => {
            toast.error("Failed to created list");
        }
    });

    return mutation;
}