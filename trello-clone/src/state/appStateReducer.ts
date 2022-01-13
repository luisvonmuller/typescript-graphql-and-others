import { Action } from './actions';
import { nanoid } from 'nanoid';
import { findItemIndexById, moveItem } from "./arrayUtils";
import { DragItem } from "../DragItem";

/* Nice Type Composition Actually */
export type Task = {
  id: string;
  text: string;
};

export type List = {
  id: string;
  text: string;
  tasks: Task[];
};

export type AppState = {
  lists: List[];
  draggedItem: DragItem | null;
};

/* 
  * We Don't Need to use the useReducer neither return the App State anymore, the ImmerJs will take care of it for us.
*/
export const appStateReducer = (draft: AppState, action: Action): AppState | void => {
  switch (action.type) {
    case "ADD_LIST": {
      draft.lists.push({
        id: nanoid(),
        text: action.payload,
        tasks: []
      })
      break
    }
    case "ADD_TASK": {
      const { text, listId } = action.payload
      const targetListIndex = findItemIndexById(draft.lists, listId) // You will always kinda need to define the findItemIndexById function.

      draft.lists[targetListIndex].tasks.push({
        id: nanoid(),
        text
      })
      break
    }
    case "MOVE_LIST": {
      const { draggedId, hoverId } = action.payload
      const dragIndex = findItemIndexById(draft.lists, draggedId)
      const hoverIndex = findItemIndexById(draft.lists, hoverId)
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex)
      break
    }
    case "MOVE_TASK": {
      const {
        draggedItemId,
        hoveredItemId,
        sourceColumnId,
        targetColumnId
      } = action.payload;
      /* Get the source and target list Indexes */
      const sourceListIndex = findItemIndexById(
        draft.lists,
        sourceColumnId
      );
      const targetListIndex = findItemIndexById(
        draft.lists,
        targetColumnId
      );
      // Dragged and Hovered Items 
      const dragIndex = findItemIndexById(
        draft.lists[sourceListIndex].tasks,
        draggedItemId
      );
      // Return Zero because it can be and Empty list 
      const hoverIndex = hoveredItemId
        ? findItemIndexById(
          draft.lists[targetListIndex].tasks,
          hoveredItemId
        )
        : 0;
      const item = draft.lists[sourceListIndex].tasks[dragIndex]; // The fellow we were seeking for...
      // Remove the task from the source list
      draft.lists[sourceListIndex].tasks.splice(dragIndex, 1);

      // Add the task to the target list
      draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item);

      break;
    }
    case "SET_DRAGGED_ITEM": {
      draft.draggedItem = action.payload
      break
    }
    default: {
      break
    }
  }
}