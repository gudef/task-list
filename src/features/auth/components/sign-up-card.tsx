"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import { useSignUp } from "@/features/auth/hook/use-sign-up";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";


export const SignUpCard = () => {
    const mutation = useSignUp();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onCredentialSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutation.mutate({
            name,
            email,
            password
        }, {
            onSuccess: () => {
                signIn("credentials", {
                    email,
                    password,
                    callbackUrl: "/dashboard",
                })
            }
        })
    }

    const onProviderSignUp = (provider: "google") => {
        signIn(provider, { callbackUrl: "/dashboard" });
    }


    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Create an account
                </CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            {!!mutation.error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2
                text-sm text-destructive mb-6">
                    <TriangleAlert className="size-4"/>
                    <p>Something went wrong</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onCredentialSignUp} className="space-y-2.5">
                    <Input
                        disabled={mutation.isPending}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        type="text"
                        required
                    />
                    <Input
                        disabled={mutation.isPending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        disabled={mutation.isPending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                        minLength={3}
                        maxLength={20}
                    />
                    <Button disabled={mutation.isPending} type="submit" 
                            className="w-full" size="lg">
                        Continue
                    </Button>
                </form>
                <Separator/>
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={mutation.isPending}
                        onClick={() => onProviderSignUp("google")}
                        variant="outline"
                        size="lg"
                        className="w-full relative"
                    >
                        <FcGoogle className="mr-2 size-5 top-2.5 left-2.5 absolute" />
                        Continue with Google
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Already have an account?
                    <Link href="/sign-in">
                        <span className="text-sky-700 hover:underline">
                            Sign in
                        </span>
                    </Link>
                </p>
                <p>
                    Return to
                    <Link href="/">
                        <span className="text-sky-700 hover:underline ml-2">
                            Homepage
                        </span>
                    </Link>
                </p>

            </CardContent>
        </Card>
    )
}