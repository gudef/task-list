"use server";
import { protectServer } from "@/features/auth/utils"
import { AddList } from "@/features/task/components/add-list";
import { ShowList } from "@/features/task/components/show-list";


const DashboardPage = async() => {
    await protectServer();

  return (
    <>
      <AddList/>
      <ShowList/>
    </>
  )
}

export default DashboardPage