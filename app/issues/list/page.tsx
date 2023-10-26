import { Link } from "@/app/components";
import NextLink from "next/link";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "../../components";
import IssueActions from "./issue-actions";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

type Props = {
  searchParams: { status: Status; orderBy: keyof Issue; order: "asc" | "desc" };
};

type Columns = { label: string; value: keyof Issue; className?: string }[];

const columns: Columns = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const ORDER = {
  ASC: "asc",
  DESC: "desc",
};

async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.order }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy,
  });

  return (
    <div className="max-w-xl">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(({ label, value, className }) => (
              <Table.ColumnHeaderCell key={value} className={className}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: value,
                      order:
                        !searchParams.orderBy ||
                        searchParams.order === ORDER.DESC
                          ? ORDER.ASC
                          : ORDER.DESC,
                    },
                  }}
                >
                  {label}
                </NextLink>
                {value === searchParams.orderBy &&
                  (searchParams.order === ORDER.ASC ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  ))}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(({ id, title, status, createdAt }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Link href={`/issues/${id}`}>{title}</Link>
                <div className="block md:hidden">
                  {<IssueStatusBadge status={status} />}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {<IssueStatusBadge status={status} />}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default IssuesPage;
