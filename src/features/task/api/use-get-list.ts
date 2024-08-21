import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<typeof client.api.task.list["$get"], 200>

export const useGetList = () => {
    const query = useQuery({
        queryKey: ["list"],
        queryFn: async () => {
            const response = await client.api.task.list.$get();

            if (!response.ok) {
                throw new Error("Failed to fetch project");
            }

            const { data } = await response.json();
            return data;
        },
    });

    return query;
}