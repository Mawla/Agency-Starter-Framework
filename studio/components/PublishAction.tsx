import { WarningOutlineIcon } from "@sanity/icons";
import { DocumentActionComponent, DocumentActionProps } from "sanity";

export function createPublishAction(
  originalPublishAction: DocumentActionComponent,
) {
  const PublishAction = (props: DocumentActionProps) => {
    let disabled = false;
    if (props.draft?.preventPublish === true) disabled = true;

    const originalResult = originalPublishAction(props);
    if (!disabled) return originalResult;
    return {
      ...originalResult,
      label: "Publish prevented",
      tone: "default",
      icon: WarningOutlineIcon,
      onHandle: () => {
        if (disabled) {
          (document.querySelector("#tools-tab") as HTMLButtonElement)?.click();
        }
      },
    };
  };
  return PublishAction as DocumentActionComponent;
}
