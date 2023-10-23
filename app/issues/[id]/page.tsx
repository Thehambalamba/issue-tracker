import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./edit-issue-button";
import IssueDetails from "./issue-details";
import DeleteIssueButton from "./delete-issue-button";

type Props = {
  params: { id: string };
};

async function IssueDetailPage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
}

export default IssueDetailPage;
