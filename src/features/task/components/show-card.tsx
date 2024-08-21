"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCreateCard } from "../api/use-add-card";
import { useGetCard } from "../api/use-get-card";
import { CardItem } from "./card-item";

interface ShowCardProps {
    id: string;
}

interface Card {
    id: string;
    listId: string | null;
    title: string | null;
}

export const ShowCard = ({ id }: ShowCardProps) => {

    const [title, setTitle] = useState("");

    const mutation = useCreateCard();
    const {data} = useGetCard(id);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onSubmit = () => {

        mutation.mutate({id ,title});
        setTitle("");
    }

    return (
        <>
            <div className="flex flex-col gap-y-2">
                <div className="flex gap-x-2 items-center justify-center">
                    <Input
                        value={title}
                        className="w-36 h-7 ml-3"
                        onChange={handleInputChange}
                        disabled={mutation.isPending}
                    />
                    <Button
                        className="ml-2 text-white"
                        onClick={onSubmit}
                        disabled={mutation.isPending}
                        size="icon"
                    >
                        Task
                    </Button>
                </div>
                {data?.map((card: Card) => (
                    <li className="">
                        <CardItem
                            key={card.id}
                            id={card.id}
                            listId={card.listId ?? ""}
                            title={card.title}
                        />
                    </li>
                ))}
            </div>
        </>
    )
}