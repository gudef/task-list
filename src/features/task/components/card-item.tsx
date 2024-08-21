"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react";
import { useConfirm } from "@/hooks/use-confirm";
import { useEditCard } from "../api/use-edit-card";
import { useDeleteCard } from "../api/use-delete-card";
import { MoreVertical } from "lucide-react";

interface CardItemProps {
    id: string;
    listId: string;
    title: string | null;
}


export const CardItem = ({
    listId,
    id,
    title
}: CardItemProps) => {
    const [ConfirmationDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this list."
    );

    const [editTitle, setEditTitle] = useState("");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const mutation = useEditCard();
    const removeMutation = useDeleteCard();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.target.value);
    }

    const onSubmit = () => {

        mutation.mutate({ id, title: editTitle, listId });
        setIsPopoverOpen(false);
    }

    const onDelete = async (id: string) => {
        const ok = await confirm();

        if (ok) {
            removeMutation.mutate({ id, listId });
        }
    }

    useEffect(() => {
        setEditTitle(title || "");
    }, [title]);

    return (
        <>
            <ConfirmationDialog />
            <Card className="w-auto h-20 bg-white/70">
                <CardHeader>
                    <CardContent className="flex gap-x-4 items-center justify-between">
                        <div>
                            {title}
                        </div>
                        <div className="flex">
                            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsPopoverOpen(true)}
                                    >
                                        <MoreVertical />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 flex flex-col gap-y-3">
                                    <Input
                                        value={editTitle}
                                        onChange={handleInputChange}
                                        disabled={mutation.isPending}
                                    />
                                    <Button
                                        onClick={onSubmit}
                                        disabled={mutation.isPending}
                                    >
                                        Submit
                                    </Button>
                                </PopoverContent>
                            </Popover>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(id)}
                            >
                                <MoreVertical className="text-red-500" />
                            </Button>
                        </div>
                    </CardContent>
                </CardHeader>
            </Card>
        </>
    )
}