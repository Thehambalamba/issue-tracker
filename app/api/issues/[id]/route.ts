import authOptions from "@/app/auth/auth-options";
import { issueSchema } from "@/app/validation-schemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function PATCH(request: NextRequest, { params: { id } }: Params) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: +id,
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  const newUser = await prisma.issue.update({
    where: { id: +id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newUser);
}

export async function DELETE(request: NextRequest, { params: { id } }: Params) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: +id,
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  await prisma.issue.delete({ where: { id: issue.id } });

  return NextResponse.json({});
}
