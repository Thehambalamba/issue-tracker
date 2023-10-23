import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Loading from "./loading";

type Props = {
  params: { id: string };
};

const IssueForm = dynamic(() => import("@/app/issues/_components/issue-form"), {
  ssr: false,
  loading: Loading,
});

async function EditIssuePage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
}

export default EditIssuePage;
