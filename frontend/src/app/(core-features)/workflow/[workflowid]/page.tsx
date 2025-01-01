import WorkflowUI from "@/components/pastworkflowui";

export default async function Page({
  params,
}: {
  params: Promise<{ workflowid: string }>;
}) {
  const workflowId = (await params).workflowid;

  return <WorkflowUI workflowId={workflowId} />;
}
