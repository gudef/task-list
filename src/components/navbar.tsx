"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { UserButton } from "@/features/auth/components/user-button";


export const Navbar = () => {
    const session = useSession();

    console.log(session.status)

    return (
        <div className="h-12 w-full bg-black/50 flex items-center justify-between">
            <div className="flex items-center ml-6">
                <span className="text-xl font-bold text-white">
                    TaskList
                </span>
            </div>
            <div className="flex items-center justify-between mr-6 gap-x-4">
                <Button 
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(session.status === "authenticated" && "hidden")}
                >
                    <Link href="/sign-in">
                        Sign In
                    </Link>
                </Button>
                <Button 
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(session.status === "authenticated" && "hidden")}
                >
                    <Link href="/sign-up">
                        Sign Up
                    </Link>
                </Button>

                <UserButton/>
            </div>
        </div>
    )
}