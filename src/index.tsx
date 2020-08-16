import React from "react";
import { useKeyPressListener } from "./hooks";
import { useControlledState } from "./controlledState";
import {
  DropdownDispatch,
  DropdownState,
  useDropdownState,
} from "./useDropdownState";
import { keyboarDispatcher, reducer } from "./reducers";
import { DropdownActions } from "./actions";

//import "styles.css";

type MyActions = "SelectFirstTwo" | DropdownActions;

export function DropdownButton<T>(props: {
  options: T[];
  isOpen: boolean;
  selectedIndexes: number[];
  dispatch: DropdownDispatch<MyActions>;
}) {
  return (
    <div className="dropdown-button">
      <button
        style={{ flex: 1 }}
        onClick={() =>
          props.dispatch([!props.isOpen ? "OpenList" : "CloseList"])
        }
      >
        {props.selectedIndexes?.length > 0
          ? props.options[props.selectedIndexes[0]]
          : ""}
      </button>
      <button onClick={() => props.dispatch(["ClearSelection"])}>X</button>
    </div>
  );
}

//DropdownButton.whyDidYouRender = true;

export const DropdownList = function DropdownList<T>(props: {
  options: T[];
  selectedIndexes: number[];
  highlightedIndex: number | null;
  dispatch: DropdownDispatch<MyActions>;
}) {
  const [search, setSearch] = React.useState("");
  console.log("rendering list", {
    indexes: props.selectedIndexes,
    highli: props.highlightedIndex,
  });

  return (
    <div className="dropdown-list">
      <div style={{ width: "275px" }}>
        <input
          style={{ width: "100%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      {/* <FixedSizeList
        className="List"
        height={200}
        itemCount={1000}
        itemSize={35}
        width={500}
      >
        {Row}
      </FixedSizeList> */}
      {props.options
        .filter(
          (o) =>
            search === "" ||
            (o as any)
              .toString()
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
        )
        .map((o, i) => (
          <div
            style={{
              backgroundColor:
                props.highlightedIndex === i ? "#bde4ff" : "white",
              color: props.selectedIndexes.includes(i) ? "blue" : "black",
              minHeight: "50px",
            }}
            key={i}
            onClick={() => {
              props.dispatch([{ type: "SelectIndex", index: i }, "CloseList"]);
            }}
          >
            {o}
          </div>
        ))}
    </div>
  );
};

DropdownList.whyDidYouRender = true;

const options = ["A", "B", "C", "D", "E", "F", "G", "H"];

// function SimpleTextDropdownF() {
//   // const [isOpen, setIsOpen] = React.useState(true);
//   const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(
//     2
//   );

//   const dropdownRef = React.useRef(null);

//   const onState = React.useCallback((changes: Partial<DropdownState>) => {
//     if (changes.highlightedIndex !== undefined) {
//       setHighlightedIndex(changes.highlightedIndex);
//     }
//     // if (changes.isOpen !== undefined) {
//     //   setIsOpen(changes.isOpen);
//     // }
//   }, []);

//   // const [fsef, aaaaa] = useControlledState(
//   //   { a: "1", b: "2" },
//   //   { a: "3", c: "5", f: 23 },
//   //   (state: { a: string; b: string; c: string }, action: any) => state
//   // );
//   //  fsef.

//   const customReducer = React.useCallback(
//     (state: DropdownState, itemCount: number, action: MyActions) => {
//       if (typeof action === "string" && action === "SelectFirstTwo") {
//         return {
//           ...state,
//           selectedIndexes: [0, 1],
//         };
//       }

//       return reducer(state, itemCount, action);
//     },
//     []
//   );
//   const [dropdownState, dispachtStat] = useDropdownState(
//     options.length,
//     {
//       highlightedIndex,
//     },

//     onState,
//     customReducer
//   );

//   //dropdownState.

//   const keyboardDisdpatcher = React.useMemo(
//     () => keyboarDispatcher(dispachtStat),
//     [dispachtStat]
//   );

//   useKeyPressListener(dropdownRef.current, () => {
//     console.log("cckk");
//   });

//   console.log("rendering SimpleTextDropdown2");

//   return (
//     <div>
//       <div>before2</div>
//       <button onClick={() => dispachtStat(["SelectFirstTwo"])}>
//         Select first two
//       </button>
//       <div ref={dropdownRef} className="dropdown">
//         <DropdownButton
//           {...dropdownState}
//           dispatch={dispachtStat}
//           //isOpen={isOpen}
//           options={options}
//         ></DropdownButton>
//         {dropdownState.isOpen && (
//           <DropdownList
//             {...dropdownState}
//             highlightedIndex={highlightedIndex}
//             dispatch={dispachtStat}
//             options={options}
//           ></DropdownList>
//         )}
//       </div>
//       <div>after</div>
//     </div>
//   );
// }
// SimpleTextDropdownF.whyDidYouRender = true;
// export const SimpleTextDropdown = React.memo(SimpleTextDropdownF);

export const RemoteSearchDropdown = () => {};

export type RemoteSearchRequest = {
  itemsOffset: number;
  itemsPageSize: number;
  search: string;
};

export type RemoteSearchResult<T> = {
  items: T[];
  itemsCount: number;
};
