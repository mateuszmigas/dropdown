import React from "react";
import {
  overlapDefinedProps,
  shallowDifference,
  omitKeys,
  areShallowEqual,
} from "../Common/helpers";

export const useControlledState = <
  Action,
  InternalState extends {},
  ExternalState extends {},
  State extends {}
>(
  initialInternalState: InternalState,
  externalState: ExternalState,
  reducer: (state: State, action: Action) => State,
  onChange?: (changes: Partial<State>) => void
): [InternalState, (actions: Action[]) => void] => {
  const [internalState, setInternalState] = React.useState<InternalState>(
    omitKeys(initialInternalState, Object.keys(externalState)) as InternalState
  );
  //cannot use updater function in setState so we have to preserve current state
  const internalStateRef = React.useRef<InternalState>(internalState);

  const dispatch = React.useCallback(
    (actions: Action[]) => {
      const oldState = overlapDefinedProps(
        internalStateRef.current,
        externalState
      ) as State;
      const newState = actions.reduce(reducer, {
        ...oldState,
      });
      const changes = shallowDifference<State>(oldState, newState);
      const newInternalState = omitKeys(
        newState,
        Object.keys(externalState)
      ) as InternalState;

      if (!areShallowEqual(internalStateRef.current, newInternalState)) {
        internalStateRef.current = newInternalState;
        setInternalState(internalStateRef.current);
      }

      onChange?.(changes);
    },
    [...Object.values(externalState), reducer, onChange]
  );

  return [internalState, dispatch];
};
