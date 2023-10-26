import { Status } from "@prisma/client";
import { Flex, Card, Text } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

type Containers = { label: string; value: number; status: Status }[];

function IssueSummary({ open, inProgress, closed }: Props) {
  const containers: Containers = [
    {
      label: "Open Issues",
      value: open,
      status: Status.OPEN,
    },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: Status.IN_PROGRESS,
    },
    {
      label: "Closed Issues",
      value: closed,
      status: Status.CLOSED,
    },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}

export default IssueSummary;
