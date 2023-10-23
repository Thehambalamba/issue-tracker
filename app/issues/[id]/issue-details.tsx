import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

type Props = {
  issue: Issue;
};

function IssueDetails({
  issue: { title, status, createdAt, description },
}: Props) {
  return (
    <>
      <Heading>{title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={status} />
        <Text>{createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{description}</ReactMarkdown>
      </Card>
    </>
  );
}

export default IssueDetails;
