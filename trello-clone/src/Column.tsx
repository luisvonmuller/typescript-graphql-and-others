import { ColumnContainer, ColumnTitle } from "./styles";
import { FC } from "react";
import { AddNewItem } from "./AddNewItem";

/* Here we define about the Interface for the generics Functional Component of react */
interface ColumnProps {
  text: string;
}

export const Column: FC<ColumnProps> = ({ text, children }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  );
};
