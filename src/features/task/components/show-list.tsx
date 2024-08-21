"use client";

import { useGetList } from "../api/use-get-list";
import { ListItem } from "./list-item";

export const ShowList = () => {

    const { data } = useGetList();

    if(!data){
        return null;
    }
    return(
        <>
            <div className="mt-16 ml-2 mr-2 flex gap-x-3">
            {data.map((list) => (
                <ol>
                    <ListItem
                        id={list.id}
                        title={list.title}
                    />
                </ol>
            ))}
            </div>
        </>
    )
}