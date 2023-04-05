import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import cx from "classnames";
import React, { useState, forwardRef, useEffect } from "react";

type MiniModuleType = {
  _key: string;
  _type: string;
  title: string;
};

type ModulePreviewType = {
  _key: string;
  preview?: string;
};

export type MiniMapProps = {
  modules: MiniModuleType[];
  isLoading?: boolean;
  onReorder: (
    changedModuleKey: string,
    replacesModuleKey: string,
    items: string[],
  ) => void;
};

export const MiniMap = ({ modules, isLoading, onReorder }: MiniMapProps) => {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState<string[]>([]);

  const [modulePreviews, setModulePreviews] = useState<ModulePreviewType[]>([]);

  /**
   * Use module keys for ids
   */

  useEffect(() => {
    setItems(modules.map(({ _key }) => _key));
  }, [modules]);

  /**
   * Get module previews
   */

  useEffect(() => {
    async function getModulePreviews() {
      const previews = modules.map(({ _key }) => {
        const element = document.querySelector(`[data-id="${_key}"]`);
        const preview = element?.innerHTML;
        return {
          _key,
          preview,
        };
      });

      const modulesLoading = previews.some(
        ({ preview }) =>
          !preview || preview?.indexOf("module-placeholder") > -1,
      );

      if (modulesLoading) {
        setTimeout(getModulePreviews, 250);
        return;
      }

      setModulePreviews(previews);
    }

    getModulePreviews();
  }, [modules]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div className="select-none">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
          disabled={isLoading}
        >
          {items.map((id) => (
            <SortableItem
              key={id}
              id={id}
              {...modulePreviews.find(({ _key }) => _key === id)}
              isLoading={isLoading}
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div className="opacity-90 cursor-grabbing">
              <Item
                {...(modulePreviews.find(
                  ({ _key }) => _key === activeId,
                ) as any)}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function handleDragStart(event: any) {
    const { active } = event;
    setActiveId(active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newItems = (items: string[]) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      };

      setItems(newItems);
      onReorder(active.id, over.id, items);
    }

    if (!over || active.id === over.id) {
      focusElement(active.id);
    }

    setActiveId(null);
  }

  // open form in sanity
  function focusElement(moduleKey: string) {
    window.parent.postMessage(
      {
        type: "preview-studio-open-module-dialog",
        moduleKey: moduleKey,
      },
      "*",
    );
  }
};

const SortableItem = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      {...props}
    />
  );
};

const Item = forwardRef<HTMLDivElement>(({ ...props }: any, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cx(
        "bg-white border-2 border-transparent hover:border-[#1f2937] transition-colors duration-150 hover:z-10",
        {
          ["cursor-wait"]: props.isLoading,
          ["cursor-grab"]: !props.isLoading,
        },
      )}
    >
      <Preview html={props.preview} />
    </div>
  );
});

Item.displayName = "Item";

const Preview = ({ html }: { html: string }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="pointer-events-none transform-gpu w-[1680px]"
      style={{
        zoom: 0.15,
      }}
    ></div>
  );
};
