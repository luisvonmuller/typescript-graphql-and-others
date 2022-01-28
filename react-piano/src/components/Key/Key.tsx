import { FunctionComponent } from "react";
import clsx from "clsx";
import { NoteType } from "../../domain/note";
import styles from "./Key.module.css";

type KeyProps = {
  type: NoteType;
  label: string;
  disabled?: boolean;
};

/* FunctionComponent allows us to provide a way to create components without giving child to its properties, but they will be extended with them by it */
export const Key: FunctionComponent<KeyProps> = (props) => {
  const { type, label, ...rest } = props; // The Rest here, could stand for Childrens and others by the way.
  return (
    <button className={clsx(styles.key, styles[type])} type="button" {...rest}>
      {label}
    </button>
  );
};

/* Also, for the matter of fact, the Function Component will either return a ReactComponent or Null */
