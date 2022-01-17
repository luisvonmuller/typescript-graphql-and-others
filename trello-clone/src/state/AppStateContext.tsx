import { createContext, useEffect, useContext, Dispatch, FC } from "react";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";
import { save } from "../api";
import { withInitialState } from "../withInitialState";

/* Context Type */
type AppStateContextProps = {
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
  lists: List[];
  draggedItem: DragItem | null;
};

type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: AppState;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

/* --------------------------------------------------------------
!Remember the You'll be passing an anonymous function within it */
export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

    useEffect(() => {
      save(state);
    }, [state]);

    const { draggedItem, lists } = state;
    const getTasksByListId = (id: string) => {
      return lists.find((list) => list.id === id)?.tasks || [];
    };

    return (
      <AppStateContext.Provider
        value={{ draggedItem, lists, getTasksByListId, dispatch }}
      >
        {children}
      </AppStateContext.Provider>
    );
  }
);

/**
 * ! This is the APP state Provider (Locally for imports I do Think k)
 */
export const useAppState = () => {
  return useContext(AppStateContext);
};
