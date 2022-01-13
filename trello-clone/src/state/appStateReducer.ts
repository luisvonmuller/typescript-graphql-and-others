import { Action } from './actions';
import { nanoid } from 'nanoid';
import { findItemIndexById } from "./arrayUtils";
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
};

/* *
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
    default: {
      break
    }
  }
}