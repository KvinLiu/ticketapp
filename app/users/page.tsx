import prisma from "@/prisma/db";
import DataTableSimple from "./data-table-simple";
import UserForm from "@/components/UserForm";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";

const Users = async () => {
  const session = await getServerSession(options);
  if (session?.user.role !== "ADMIN") {
    return <p className="text-destructive">Admin access requried</p>;
  }
  const users = await prisma.user.findMany();
  return (
    <div>
      <UserForm />
      <DataTableSimple users={users} />
    </div>
  );
};

export default Users;
