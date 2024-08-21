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
import { useEditList } from "../api/use-edit-list";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteList } from "../api/use-delete-list";
import { ShowCard } from "./show-card";
import { MoreVertical } from "lucide-react";

interface ListItemProps {
    id: string;
    title: string | null;
}


export const ListItem = ({
    id,
    title
}: ListItemProps) => {
    const [ConfirmationDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this list."
    );

    const [editTitle, setEditTitle] = useState("");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const mutation = useEditList();
    const removeMutation = useDeleteList();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.target.value);
    }

    const onSubmit = () => {

        mutation.mutate({id, title:editTitle});
        setIsPopoverOpen(false);
    }

    const onDelete = async (id: string) => {
        const ok = await confirm();

        if(ok){
            removeMutation.mutate({id});
        }
    }

    useEffect(() => {
        setEditTitle(title || "");
    }, [title]);

    return (
        <>
            <ConfirmationDialog/>
            <div className="flex flex-col items-center justify-center gap-y-2">
            <Card className="w-auto h-32 bg-white/70">
                <CardHeader>
                    <CardTitle className="flex gap-x-2 items-center">
                        List
                        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button 
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsPopoverOpen(true)}
                                    >
                                    <MoreVertical/>
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
                            <MoreVertical className="text-red-500"/>
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{title}</p>
                </CardContent>
            </Card>

            <ShowCard
                id={id}
                />
            </div>
            
        </>
    )
}