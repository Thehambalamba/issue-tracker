import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./edit-issue-button";
import IssueDetails from "./issue-details";
import DeleteIssueButton from "./delete-issue-button";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/auth-options";
import AssigneeSelect from "./assignee-select";

type Props = {
  params: { id: string };
};

async function IssueDetailPage({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session ? (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      ) : null}
    </Grid>
  );
}

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  return {
    title: issue?.title,
    description: `Details of issue: ${issue?.id}`,
  };
}

export default IssueDetailPage;
