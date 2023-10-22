import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

type Props = {
  status: Status;
};

type StatusMap = { label: string; color: "red" | "violet" | "green" };

const STATUS_MAP: Record<Status, StatusMap> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

function IssueStatusBadge({ status }: Props) {
  const { color, label } = STATUS_MAP[status];

  return <Badge color={color}>{label}</Badge>;
}

export default IssueStatusBadge;
