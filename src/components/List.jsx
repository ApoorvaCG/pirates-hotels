import React from "react";

const List = ({ children }) => {
  return (
    <ul
      style={{
        listStyleType: "none",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      {children}
    </ul>
  );
};
export default List;
