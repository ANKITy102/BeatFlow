import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { FC } from "react";
import { notFound } from "next/navigation";
interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  return <div>Dashboard</div>;
};

export default page;
