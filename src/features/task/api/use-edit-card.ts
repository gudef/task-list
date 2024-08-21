import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.task.editcard["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.task.editcard["$post"]>["json"];

export const useEditCard = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.task.editcard.$post({ json });

            if(!response.ok){
                throw new Error("Something went wrong");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Card updated");

            queryClient.invalidateQueries({queryKey: ["card"]});
        },
        onError: () => {
            toast.error("Failed to edit card");
        }
    });

    return mutation;
}