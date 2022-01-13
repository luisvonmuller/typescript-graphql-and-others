import { useDragLayer } from "react-dnd"; // Will Provide us information about the Drag Item
import { Column } from "./Column"; // Its going to be our target location to place which is being dragged
import { CustomDragLayerContainer, DragPreviewWrapper } from "./styles"; // “s our dragging layer, we’ll render the dragging preview inside of it.
import { useAppState } from "./state/AppStateContext"; // Getting the (array) logicial position from it

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState();

  /* The useDragLayer hook allows us to get the information from the React-DnD internal state */
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        <Column id={draggedItem.id} text={draggedItem.text} isPreview />
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
};
