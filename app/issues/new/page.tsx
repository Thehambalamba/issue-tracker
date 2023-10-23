import dynamic from "next/dynamic";
import Loading from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/issue-form"), {
  ssr: false,
  loading: Loading,
});

function NewIssuePage() {
  return <IssueForm />;
}

export default NewIssuePage;
