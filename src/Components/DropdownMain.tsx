import React from "react";
import { DropdownDispatch } from "../Common/dispatch";
import { DropdownActions } from "../Common/actions";
import { useFocusOnStateChange } from "../Hooks";

export const DropdownMain = (props: {
  isOpen: boolean;
  itemRenderer: () => JSX.Element;
  dispatch: DropdownDispatch<DropdownActions>;
}) => {
  console.log("rendering DropdownMain");

  const { isOpen, itemRenderer, dispatch } = props;
  const dropdownSelectRef = React.useRef(null);
  const handleSelect = React.useCallback(
    () => dispatch([isOpen ? "CloseList" : "OpenList"]),
    [isOpen, dispatch]
  );
  const handleClear = React.useCallback(() => dispatch(["ClearSelection"]), [
    dispatch,
  ]);

  useFocusOnStateChange(dropdownSelectRef, isOpen, false);

  return (
    <div className="dropdown-main" key="editor1">
      <button
        ref={dropdownSelectRef}
        className="dropdown-select"
        onClick={handleSelect}
      >
        {itemRenderer()}
        <i className={`fa ${isOpen ? "fa-caret-up" : "fa-caret-down"}`}></i>
      </button>
      <button className="dropdown-clear" onClick={handleClear}>
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
};
