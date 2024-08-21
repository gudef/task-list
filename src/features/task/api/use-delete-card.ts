import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.task.deletecard["$delete"], 200>;
type RequestType = InferRequestType<typeof client.api.task.deletecard["$delete"]>["json"];

export const useDeleteCard = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
       
        mutationFn: async (json) => {
            const response = await client.api.task.deletecard.$delete({json});

            if (!response.ok) {
                throw new Error("Failed to dalete list");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Card deleted");
            queryClient.invalidateQueries({ queryKey: ["card"] });
        },
        onError: () => {
            toast.error("Failed to delete card");
        }
    });

    return mutation;
}