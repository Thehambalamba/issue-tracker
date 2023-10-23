import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./edit-issue-button";
import IssueDetails from "./issue-details";

type Props = {
  params: { id: string };
};

async function IssueDetailPage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
}

export default IssueDetailPage;
