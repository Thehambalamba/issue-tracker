import prisma from "@/prisma/client";
import { Grid, Flex } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import IssueSummary from "./issue-summary";
import LatestIssues from "./latest-issues";
import IssueChart from "./issue-chart";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: Status.OPEN } });
  const inProgress = await prisma.issue.count({
    where: { status: Status.IN_PROGRESS },
  });
  const closed = await prisma.issue.count({ where: { status: Status.CLOSED } });
  const props = { open, inProgress, closed };
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...props} />
        <IssueChart {...props} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
