import { userSchema } from "@/app/validationSchemas/users";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import options from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Not Admin." }, { status: 401 });
  }
  console.log(session);
  const body = await request.json();
  const validation = userSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const duplicate = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });
  if (duplicate) {
    return NextResponse.json(
      { message: "Duplicate Username" },
      { status: 400 }
    );
  }

  const hashPassword = await bcrypt.hash(body.password, 10);
  body.password = hashPassword;

  const newUser = await prisma.user.create({
    data: { ...body },
  });

  return NextResponse.json(newUser, { status: 201 });
}
