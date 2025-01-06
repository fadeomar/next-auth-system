import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  // THIS is the first Method using getServerSession
  /**
  const session = await getServerSession(authOptions);
  
  return NextResponse.json({ authenticated: !!session });
  */

  //*************************/
  // SECOND METHOD
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: token,
  });
};
