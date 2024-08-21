"use server";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { SignInCard } from "@/features/auth/components/sign-in-card";

const SignInPage = async () => {
    const session = await auth();

    if (session) {
        redirect("/dashboard");
    }

    return (
        <SignInCard />
    )

}

export default SignInPage;