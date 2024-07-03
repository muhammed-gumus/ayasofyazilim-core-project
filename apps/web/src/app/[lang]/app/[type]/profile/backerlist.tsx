"use client";


import CardList from "@repo/ayasofyazilim-ui/organisms/card-list";
import { useState } from "react";
import { deleteBacker, getBackers } from "./actions";

export function BackerList({backers}) {
    console.log(backers);
    const [backersState, setBackers] = useState(backers);
    const cards = backersState?.map((backer) => {
        return {
            title: backer.name || "",
            description: backer.taxpayerId || "",
            content: backer.legalStatusCode || "",
            footer: backer.customerNumber || "",
            onEdit: "profile/" + backer.backerId,
            onDelete: async () => {
                console.log("delete", backer.backerId);
                await deleteBacker(backer.backerId);
                await updataBackers();
            },
        };
    });
    async function updataBackers() {
        const backers = await getBackers();
        setBackers(backers);
    }
    return (
        <div className="max-h-[350px]">
            <CardList
        cards={cards.length > 0 ? cards : [
            {
                title: "",
                description: "",
                content: "Create new backer",
                footer: "",
            }
        ]}
    ></CardList>
        </div>
    )
}