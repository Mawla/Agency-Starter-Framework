import { nanoid } from "nanoid";
import { FormSetPatch, set } from "sanity";

type BlockActionType = {
  blockKey: string;
  value: { _key: string }[];
  onChange: (set: FormSetPatch) => void;
};

export const deleteBlock = ({ blockKey, value, onChange }: BlockActionType) => {
  if (!confirm("Are you sure you want to delete this block?")) return;
  onChange(set([...value].filter((item) => item._key !== blockKey)));
};

export const duplicateBlock = ({
  blockKey,
  value,
  onChange,
}: BlockActionType) => {
  const block = value.find(({ _key }) => _key === blockKey);
  if (!block) return;
  const clone = { ...block, _key: nanoid() };
  const index = value.findIndex((item) => item._key === blockKey);
  onChange(set([...value.slice(0, index), clone, ...value.slice(index)]));
};

export const moveBlock = ({
  blockKey,
  value,
  onChange,
  direction,
}: { direction: "up" | "down" } & BlockActionType) => {
  const block = value.find(({ _key }) => _key === blockKey);
  if (!block) return;
  const index = value.findIndex((item) => item._key === blockKey);
  const newIndex = direction === "up" ? index - 1 : index + 1;
  if (newIndex < 0 || newIndex >= value.length) return;
  const clone = [...value];
  clone.splice(index, 1);
  clone.splice(newIndex, 0, block);
  onChange(set(clone));
};

export const addBlock = ({
  blockKey,
  value,
  elementRef,
}: {
  blockKey: string;
  value: { _key: string }[];
  elementRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const index = value.findIndex((item) => item._key === blockKey);
  const addButton = elementRef?.current?.querySelector(
    "#add-block",
  ) as HTMLButtonElement;

  if (addButton) {
    const event = new CustomEvent("block-add-click", {
      detail: { afterIndex: index },
    });
    addButton.dispatchEvent(event);
  }
};
