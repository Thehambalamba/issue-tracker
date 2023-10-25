"use client";

import { Select } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  issue: Issue;
};

const UNASSIGNED_VALUE = "unassigned";
function AssigneeSelect({ issue }: Props) {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios.get<User[]>("/api/users").then((response) => response.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return null;
  }

  return (
    <>
      <Select.Root
        onValueChange={(userId) => {
          axios
            .patch(`/api/issues/${issue.id}`, {
              assignedToUserId: userId === UNASSIGNED_VALUE ? null : userId,
            })
            .catch((error) => {
              toast.error("Changes could not be saved.");
            });
        }}
        defaultValue={issue.assignedToUserId || UNASSIGNED_VALUE}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={UNASSIGNED_VALUE}>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}

export default AssigneeSelect;
