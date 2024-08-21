"use client";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default async function Home() {

  return (
    <>
    <Navbar/>
    <main className="flex pt-5 h-[calc(100vh-48px)] flex-col items-center justify-center bg-[url(/bgpage.jpg)] bg-cover">
      <div className="mt-7 h-full lg:h-[400px] w-[80%] flex flex-col lg:flex-row items-center justify-center
        ring-4 ring-white gap-y-4 bg-gray-500/80">
        <div className="mt-4 lg:mt-0 w-full lg:w-1/2 h-full flex flex-col items-center justify-center gap-y-7">
          <p className="ml-7 mr-7 text-xl lg:text-3xl text-slate-800 bg-white p-3 rounded-lg">
            Task List Manage Your Life
          </p>
          <p className="ml-7 mr-7 bg-white/60 p-3 indent-8 rounded-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, hic maxime ad id illum omnis minus at debitis cupiditate autem, dicta aspernatur quis nam enim error nihil quam minima adipisci.
          </p>
          <p className="ml-7 mr-7 bg-white/60 p-3 indent-8 rounded-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi sed alias quisquam autem porro ea maiores eius suscipit incidunt culpa.
          </p>
        
        </div>
        <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center gap-y-4
        mb-4 lg:mb-0">
          <p className="text-xl lg:text-3xl text-white">
            Already have an Account?
          </p>
          <p className="text-xl lg:text-2xl text-white">
            Let&apos;s Start your Task
          </p>
          <Button
            asChild
            variant="secondary"
            size="lg"
            >
            <Link href="/sign-in">
              Sign In to use TaskList
            </Link>
          </Button>
        </div>
      </div>

    </main>
  </>
  );
}






// {session?.user ? (
  //   <div>
  //     <p>Welcome, {session.user.name}!</p>
//     <p>Email: {session.user.email}</p>
//     {/* You can add more user details here */}
//   </div>
// ) : (
//   <p>No user is logged in.</p>
// )}
