"use client";

import React from "react";
import { Select, Flex, Button } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  return (
    <Flex gap="4" align="center">
      <Select.Root
        onValueChange={(status) => {
          const params = new URLSearchParams();
          if (status) {
            params.append("status", status);
          }
          if (searchParams.get("orderBy")) {
            params.append("orderBy", searchParams.get("orderBy")!);
          }
          if (searchParams.get("order")) {
            params.append("order", searchParams.get("order")!);
          }
          const query = params.size ? `?${params.toString()}` : "";
          router.push(`/issues/list${query}`);
        }}
        defaultValue={searchParams.get("status") || "all"}
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
      <Button variant="ghost" onClick={() => router.push("/issues/list")}>
        Reset
      </Button>
    </Flex>
  );
}

export default IssueStatusFilter;
