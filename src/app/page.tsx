import { buttonVariants } from "@/components/ui/button";
import User from "@/components/ui/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log({ session });
  return (
    <div>
      <h1 className="text-4xl">Home</h1>
      <Link className={buttonVariants()} href="/admin">
        Open my admin id: {session?.user?.id}, username:{" "}
        {session?.user?.username}
      </Link>

      <h2>Client Session: </h2>
      <User />

      <h2>Server Session: </h2>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
