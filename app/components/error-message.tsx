import React from "react";
import { Text } from "@radix-ui/themes";

function ErrorMessage({ children }: React.PropsWithChildren) {
  if (!children) {
    return null;
  }

  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
}

export default ErrorMessage;
