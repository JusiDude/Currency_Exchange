import styled from "styled-components";
import { useState } from "react";

const Select = (props) => {
  const options = props.option;
  const [select, setselect] = useState("UAN");
  return (
    <select value={select}>
      {options((item) => (
        <option
          onChange={(e) => {
            setselect(e.value);
          }}
        >
          {item}
        </option>
      ))}
    </select>
  );
};
export default Select;
