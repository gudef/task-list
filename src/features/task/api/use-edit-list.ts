import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.task.editlist["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.task.editlist["$post"]>["json"];

export const useEditList = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.task.editlist.$post({ json });

            if(!response.ok){
                throw new Error("Something went wrong");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("List Updated");

            queryClient.invalidateQueries({queryKey: ["list"]});
        },
        onError: () => {
            toast.error("Failed to edit list");
        }
    });

    return mutation;
}