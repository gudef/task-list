import { Navbar } from "@/components/navbar";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
    <Navbar/>
    <main className="h-[calc(100vh-48px)] bg-[url(/bg2.jpg)] bg-top bg-cover w-full flex 
    flex-col overflow-scroll">
        {children}
    </main>
    </>
  )
}

export default MainLayout