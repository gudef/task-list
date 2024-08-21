import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<typeof client.api.task.card[":id"]["$get"], 200>

export const useGetCard = (id: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["card", { id }],
        queryFn: async () => {
            const response = await client.api.task.card[":id"].$get({
                param: {
                    id,
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch Card");
            }

            const { data } = await response.json();
            return data;
        },
    });

    return query;
}