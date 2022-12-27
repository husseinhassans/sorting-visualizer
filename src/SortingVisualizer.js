import React, { useState, useEffect } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";
import "./SortingVisualizer.css";

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [update, setUpdate] = useState(false);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //   componentDidMount equivalent
  useEffect(() => {
    const resetArray = () => {
      let array = [];
      for (let i = 0; i < 300; i++) {
        array.push(randomIntFromInterval(5, 800));
      }
      setArray(array);
    };
    resetArray();
  }, [update]);

  return (
    <>
      <div className="array">
        {array.map((value, idx) => (
          <div
            className="array__bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
      <IconButton className="array__reset" onClick={() => setUpdate(!update)}>
        <RestartAltIcon className="header__icon" fontSize="large" />
      </IconButton>
    </>
  );
}

export default SortingVisualizer;
