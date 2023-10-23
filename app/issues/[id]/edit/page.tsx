import React from "react";
import IssueForm from "../../_components/issue-form";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

async function EditIssuePage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
}

export default EditIssuePage;
