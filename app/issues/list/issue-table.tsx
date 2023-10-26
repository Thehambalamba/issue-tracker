import { Link } from "@/app/components";
import NextLink from "next/link";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "../../components";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Issue, Status } from "@prisma/client";

export type IssueQuery = {
  status: Status;
  orderBy: keyof Issue;
  order: "asc" | "desc";
  page: string;
};
type Props = {
  searchParams: IssueQuery;
  issues: Issue[];
};
type Columns = { label: string; value: keyof Issue; className?: string }[];

function IssueTable({ searchParams, issues }: Props) {
  return (
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
                      !searchParams.orderBy || searchParams.order === ORDER.DESC
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
  );
}

const columns: Columns = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];
const ORDER = {
  ASC: "asc",
  DESC: "desc",
};

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
