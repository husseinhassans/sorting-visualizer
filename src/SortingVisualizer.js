import React, { useState, useEffect } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import "./SortingVisualizer.css";
import * as sortingAlgorithms from "./SortingAlgorithms";

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

  const MergeSort = () => {
    setArray(sortingAlgorithms.mergeSort(array));
  };
  const SelectionSort = () => {
    setArray(sortingAlgorithms.selectionSort(array));
    console.log(array);
  };
  const QuickSort = () => {
    setArray(sortingAlgorithms.quickSort(array));
  };
  const HeapSort = () => {
    setArray(sortingAlgorithms.heapSort(array));
  };
  const BubbleSort = () => {
    setArray(sortingAlgorithms.bubbleSort(array));
  };
  const InsertionSort = () => {
    setArray(sortingAlgorithms.insertionSort(array));
  };
  return (
    <div className="frontPage">
      <div className="frontPage__array">
        {array.map((value, idx) => (
          <div
            className="array__bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
      <div className="frontPage__Buttons">
        <Button
          variant="outlined"
          className="Buttons__mergeSort"
          onClick={() => MergeSort()}
          size="small"
        >
          Merge Sort
        </Button>
        <Button
          variant="outlined"
          className="Buttons__selectionSort"
          onClick={() => SelectionSort()}
          size="small"
        >
          Selection Sort
        </Button>
        <Button
          variant="outlined"
          className="Buttons__quickSort"
          onClick={() => QuickSort()}
          size="small"
        >
          Quick Sort
        </Button>
        <IconButton
          className="Buttons__reset"
          onClick={() => setUpdate(!update)}
        >
          <RestartAltIcon className="header__icon" fontSize="large" />
        </IconButton>
        <Button
          variant="outlined"
          className="Buttons__heapSort"
          onClick={() => HeapSort()}
          size="small"
        >
          Heap Sort
        </Button>
        <Button
          variant="outlined"
          className="Buttons__bubblesort"
          onClick={() => BubbleSort()}
          size="small"
        >
          Bubble Sort
        </Button>
        <Button
          variant="outlined"
          className="Buttons__insertionsort"
          onClick={() => InsertionSort()}
          size="small"
        >
          Insertion Sort
        </Button>
      </div>
    </div>
  );
}

export default SortingVisualizer;
