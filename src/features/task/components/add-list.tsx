"use client";

import { Input } from "@/components/ui/input"
import { useCreateList } from "../api/use-add-list";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const AddList = () => {

    const [title, setTitle] = useState("");

    const mutation = useCreateList();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onSubmit = () => {

        mutation.mutate({title});
        setTitle("");
    }
    
    return(
        <div className="h-12 w-full bg-black/30 flex items-center fixed">

            <Input 
                className="w-48 h-7 ml-3"
                value={title}
                onChange={handleInputChange}
                disabled={mutation.isPending}
            />
            <Button 
                className="ml-2 text-white"
                onClick={onSubmit}
                disabled={mutation.isPending}
                size="sm"
            >
                Enter List
            </Button>
        </div>
    )
}