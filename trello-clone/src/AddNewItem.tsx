import { useState } from "react";
import { AddItemButton } from "./styles";
import { NewItemForm } from "./NewItemForm";

interface AddNewItemProps {
  onAdd(text: String): void;
  toggleButtonText: string;
  dark?: boolean;
}

export const AddNewItem = (props: AddNewItemProps) => {
  const [showForm, setShowForm] =
    useState<boolean>(
      false
    ); /* Use state is a Generic so you can pass out the type */
  const { onAdd, toggleButtonText, dark } = props; /* Destruturing the Props */
  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
};
