/* This kind of HOCs is called an injector HOC */
import { useState, useEffect, ComponentType } from "react";
import { AppState } from "./state/appStateReducer";
import { load } from "./api";

/* Whats Being injected */
type InjectedProps = {
  initialState: AppState;
};

// This is Some Kind of type Assetion for TypeScript get to know the Type.
type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

/* Define the component that Will be injected and wrapped (This is a Complex construction of a Type) */
export function withInitialState<TProps>(
  WrappedComponent: React.ComponentType<
    PropsWithoutInjected<TProps> & InjectedProps
  >
) {
  /* “Here we don’t add the InjectedProps to prevent the user from passing them.” */
  return (props: PropsWithoutInjected<TProps>) => {
    const [initialState, setInitialState] = useState<AppState>({
      lists: [],
      draggedItem: null,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const data = await load();
          setInitialState(data);
        } catch (e: any) {
          /* Define the error */
          setError(e);
        }
        /* Remove loading state view */
        setIsLoading(false);
      };
      fetchInitialState();
    }, []);

    if (isLoading) {
      return <>Loading...</>;
    }

    if (error) {
      return <div>error.message</div>;
    }

    return <WrappedComponent {...props} initialState={initialState} />;
  };
}
