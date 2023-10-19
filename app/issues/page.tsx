import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

function IssuesPage() {
  return (
    <div className="max-w-xl">
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
}

export default IssuesPage;
