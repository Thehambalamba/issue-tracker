"use client";

import React from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";

const STATUSES: { [key: string]: { label: string; value: Status | "all" } } = {
  ALL: {
    label: "All",
    value: "all",
  },
  OPEN: {
    label: "Open",
    value: Status.OPEN,
  },
  IN_PROGRESS: {
    label: "In progress",
    value: Status.IN_PROGRESS,
  },
  CLOSED: {
    label: "Closed",
    value: Status.CLOSED,
  },
};

function IssueStatusFilter() {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status === STATUSES.ALL.value ? "" : `?status=${status}`;
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {Object.keys(STATUSES).map((key) => (
          <Select.Item key={key} value={STATUSES[key].value}>
            {STATUSES[key].label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueStatusFilter;
