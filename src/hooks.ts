import React from "react";
import { DropdownDispatch, DropdownState } from "./useDropdownState";
import { DropdownActions, DropdownActionCreator } from "./actions";
import { FixedSizeList } from "react-window";

export const useKeyPressListener = (
  element: HTMLElement | null,
  handler: (e: KeyboardEvent) => void
) => {
  React.useEffect(() => {
    function keyboardHandler(e: KeyboardEvent) {
      if (e.type === "keyup") handler(e);
    }
    element?.addEventListener("keyup", keyboardHandler);
    element?.addEventListener("keydown", keyboardHandler);

    return () => {
      element?.removeEventListener("keyup", keyboardHandler);
      element?.removeEventListener("keydown", keyboardHandler);
    };
  }, [element, handler]);
};

export const useDropdownClickOutsideListener = (
  element: HTMLElement | null,
  dispatch: DropdownDispatch<DropdownActions>
) => {
  const clickHandler = React.useCallback(() => dispatch(["CloseList"]), [
    dispatch,
  ]);

  useClickOutsideListener(element, clickHandler);
};
export const usePreviousValue = <T>(value: T) => {
  const valueRef = React.useRef<T>();

  React.useEffect(() => {
    valueRef.current = value;
  });

  return valueRef.current;
};

export const useScrollToIndex = (
  listElementRef: React.RefObject<FixedSizeList>,
  index: number | null
) => {
  React.useEffect(() => {
    if (index !== null) listElementRef.current?.scrollToItem(index, "smart");
  }, [index]);
};

export const useFocusOnFirstRender = (
  elementRef: React.RefObject<HTMLDivElement>
) => {
  React.useEffect(() => {
    if (elementRef.current !== null) (elementRef.current as any).focus();
  }, []);
};

export const useFocusOnClose = (
  elementRef: React.RefObject<HTMLDivElement>,
  isOpen: boolean
) => {
  const initialRender = React.useRef(true);
  const previousIsOpen = usePreviousValue(isOpen);

  React.useEffect(() => {
    if (isOpen !== previousIsOpen && !isOpen && !initialRender.current) {
      if (elementRef.current !== null) (elementRef.current as any).focus();
    }

    initialRender.current = false;
  }, [isOpen]);
};

export const useListKeyboardHandler = (
  dispatch: DropdownDispatch<DropdownActions>
) => React.useMemo(() => createListKeyboardHandler(dispatch), [dispatch]);

export const createListKeyboardHandler = (
  dispatch: DropdownDispatch<DropdownActions>
) => (e: React.KeyboardEvent<Element>) => {
  switch (e.key) {
    case " ":
      break;
    case "Enter":
      dispatch(["SelectHighlightedIndex", "CloseList"]);
      break;
    case "Esc":
    case "Escape":
      dispatch(["CloseList"]);
      break;
    case "Down":
    case "ArrowDown":
      dispatch(["HighlightNextIndex"]);
      break;
    case "Up":
    case "ArrowUp":
      dispatch(["HighlightPreviousIndex"]);
      break;
    default:
      return;
  }
};

export const useClickOutsideListener = (
  element: HTMLElement | null,
  handler: () => void
) => {
  React.useEffect(() => {
    function mouseHandler(e: MouseEvent) {
      if (!element?.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener("mousedown", mouseHandler);

    return () => {
      document.removeEventListener("mousedown", mouseHandler);
    };
  }, [element, handler]);
};
