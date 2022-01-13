import { ColumnContainer, ColumnTitle } from "./styles";
import { FC, Key } from "react";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";
import { Card } from "./Card";
import { addTask } from "./state/actions";
/* Here we define about the Interface for the generics Functional Component of react */
interface ColumnProps {
  text: string;
  id: string;
}

export const Column = ({ text, id }: ColumnProps) => {
  const { getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={(text) => dispatch(addTask(text as string, id))}
        dark
      />
    </ColumnContainer>
  );
};
