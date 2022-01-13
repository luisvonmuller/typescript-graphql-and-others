/** Type here could/should/must be Enums */
/* Reducer Using Interfaces  - This method of composition is called: -> discriminated union <-.*/
interface AddListAction {
  type: "ADD_LIST"
  payload: string
}

interface AddTaskAction {
  type: "ADD_TASK"
  payload: { text: string; listId: string }
}

export type Action = AddListAction | AddTaskAction;

/* Action Creators */
export const addTask = (
  text: string,
  listId: string,
): Action => ({
  type: "ADD_TASK",
  payload: {
    text,
    listId
  }
});

export const addList = (
  text: string,
): Action => ({
  type: "ADD_LIST",
  payload: text
});