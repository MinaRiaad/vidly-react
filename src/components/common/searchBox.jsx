import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      name="query"
      value={value}
      className="form-control my-3"
      placeholder="search..."
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
