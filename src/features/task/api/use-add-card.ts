import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.task.addcard["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.task.addcard["$post"]>["json"];

export const useCreateCard = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.task.addcard.$post({ json });

            if(!response.ok){
                throw new Error("Something went wrong");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Card created");

            queryClient.invalidateQueries({queryKey: ["list"]});
            queryClient.invalidateQueries({queryKey: ["card"]});
        },
        onError: () => {
            toast.error("Failed to created card");
        }
    });

    return mutation;
}