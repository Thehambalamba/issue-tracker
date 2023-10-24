"use client";

import React from "react";
import { Select } from "@radix-ui/themes";

function AssigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Nikola Pervic</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
