import prisma from "@/prisma/client";
import IssueActions from "./issue-actions";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import Pagination from "@/app/components/pagination";
import IssueTable, { IssueQuery, columnNames } from "./issue-table";

type Props = {
  searchParams: IssueQuery;
};

async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.order }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
}

export const dynamic = "force-dynamic";

export default IssuesPage;
