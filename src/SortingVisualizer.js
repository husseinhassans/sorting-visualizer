import React, { useState, useEffect } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import "./SortingVisualizer.css";
import * as sortingAlgorithms from "./SortingAlgorithms";

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [prevArray, setPrevArray] = useState([]);
  const minArrayVal = 5;
  const maxArrayVal = 800;
  const arraySize = 10;

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // here we set the previous array to the current, and then build a new one
  const resetArray = () => {
    setPrevArray(array);
    let newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(minArrayVal, maxArrayVal));
    }
    setArray(newArray);
  };

  //   equivalent to component did mount. Here we reset the array
  useEffect(() => {
    let array = [];
    for (let i = 0; i < arraySize; i++) {
      array.push(randomIntFromInterval(minArrayVal, maxArrayVal));
    }
    setArray(array);
    setPrevArray(array);
  }, []);

  const MergeSort = () => {
    setArray(sortingAlgorithms.mergeSort(array));
  };
  const SelectionSort = () => {
    setArray(sortingAlgorithms.selectionSort(array));
    // console.log(array);
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
      <div className="frontPage__SortingButtons">
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
      <div className="frontPage__array">
        {array.map((value, idx) => (
          <div
            className="array__bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
      <div className="frontPage__arrayVisual"></div>
      <div className="frontPage__ArrayButtons">
        <Button
          variant="outlined"
          className="ArrayButtons__regenerate"
          onClick={() => resetArray()}
          size="small"
        >
          Regenerate Array
        </Button>
        <IconButton
          className="Buttons__reset"
          //   onClick={() => setUpdate(!update)}
          onClick={() => setArray(prevArray)}
        >
          <RestartAltIcon className="header__icon" fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}

export default SortingVisualizer;
