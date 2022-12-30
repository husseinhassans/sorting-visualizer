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
  const arraySize = 8;

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
    // const topArrayBars = document.getElementsByClassName("array__bar");
    // topArrayBars[5].style.backgroundColor = "rgb(255, 79, 120)";
    // topArrayBars[0].style.backgroundColor = "rgb(255, 79, 120)";

    // console.log(topArrayBars.length);
    let animations = sortingAlgorithms.mergeSort(array);
    console.log(animations);
    // for (let j = animations[0].look[0]; j <= animations[0].look[1]; j++) {
    //   console.log(j);
    //   topArrayBars[j].style.backgroundColor = "rgb(255, 79, 120)";
    // }
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const topArrayBars = document.getElementsByClassName("array__bar");
        const bottomArrayBars =
          document.getElementsByClassName("array__baraux");
        if (animations[i].type === "look") {
          for (let j = 0; j < topArrayBars.length; j++) {
            topArrayBars[j].style.backgroundColor = "rgb(57, 200, 195)";
          }
          for (let j = animations[i].look[0]; j <= animations[i].look[1]; j++) {
            topArrayBars[j].style.backgroundColor = "rgb(255, 79, 120)";
          }
        } else if (animations[i].type === "join") {
          for (let j = 0; j < topArrayBars.length; j++) {
            topArrayBars[j].style.backgroundColor = "rgb(57, 200, 195)";
          }
          //   left color
          for (
            let j = animations[i].leftIndices[0];
            j <= animations[i].leftIndices[1];
            j++
          ) {
            topArrayBars[j].style.backgroundColor = "rgb(255, 77, 252)";
          }
          // right color
          for (
            let j = animations[i].rightIndices[0];
            j <= animations[i].rightIndices[1];
            j++
          ) {
            topArrayBars[j].style.backgroundColor = "rgb(255, 237, 77)";
          }
        } else if (animations[i].type === "place") {
          bottomArrayBars[animations[i].newIdx].style.height =
            topArrayBars[animations[i].oldIdx].style.height;
          bottomArrayBars[animations[i].newIdx].style.backgroundColor =
            topArrayBars[animations[i].oldIdx].style.backgroundColor;
        } else if (animations[i].type === "lift") {
          let newArr = array.slice();
          //   console.log(newArr);
          for (
            let j = animations[i].range[0];
            j <= animations[i].range[1];
            j++
          ) {
            newArr[j] = animations[i].newVals[j - animations[i].range[0]];
          }
          setArray(newArr);
          //   fix colors after
          for (let j = 0; j < topArrayBars.length; j++) {
            topArrayBars[j].style.backgroundColor = "rgb(57, 200, 195)";
          }
          for (let j = 0; j < bottomArrayBars.length; j++) {
            bottomArrayBars[j].style.backgroundColor = "rgba(57, 200, 195, 0)";
          }
        }
      }, i * 1000);
    }
    console.log(array);
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
      <div className="frontPage__array">
        {array.map((value, idx) => (
          <div
            className="array__baraux"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
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
