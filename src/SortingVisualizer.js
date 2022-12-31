import React, { useState, useEffect } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import "./SortingVisualizer.css";
import * as sortingAlgorithms from "./SortingAlgorithms";

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [prevArray, setPrevArray] = useState([]);
  //   const [resetClicked, setResetClicked] = useState(false);
  let timeouts = [];
  const minArrayVal = 5;
  const maxArrayVal = 350;
  const defaultArrSize = 500;
  const speedFactor = 5000; // 1000 fast, 5000 mild, 50,000 analytical
  let [speed, setSpeed] = useState(10);
  //   let tempSpeed = 10;
  const [arraySize, setArraySize] = useState(defaultArrSize);
  //   const [speedFactor, setSpeedFactor] = useState(10);

  const handleArraySizeChange = (event) => {
    setArraySize(Number(event.target.value));
  };

  const handleSpeedChange = (event) => {
    setSpeed(625 / Number(event.target.value));
    // console.log(speed);
  };

  //   const getSpeed = () => {
  //     // console.log(speed);
  //     return speed;
  //   };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // here we set the previous array to the current, and then build a new one
  const regenerateArray = () => {
    // setReset(false);
    // console.log(timeouts.length);
    for (let i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
    timeouts = [];

    setPrevArray(array.slice());
    let newArray = [];
    const topArrayBars = document.getElementsByClassName("array__bar");
    const bottomArrayBars = document.getElementsByClassName("array__baraux");

    for (let i = 0; i < arraySize; i++) {
      topArrayBars[i].style.backgroundColor = "rgb(57, 200, 195)";
      bottomArrayBars[i].style.backgroundColor = "rgba(57, 200, 195, 0)";
      newArray.push(randomIntFromInterval(minArrayVal, maxArrayVal));
    }
    setArray(newArray);
    // very hacky, should be done through useEffect
    // const temp = arraySize;
    // setArraySize(0);
    // setArraySize(temp);
  };

  const handleReset = () => {
    for (let i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
    timeouts = [];
    // reset to proper previous array
    if (timeouts === []) {
      //   console.log("hi");
      setArray(prevArray);
    }
    // otherwise reset to unsorted array
    else {
      //   console.log(array.slice());
      setArray(array.slice());
    }
  };

  //   // handle reset click
  //   useEffect(() => {});

  // handle mount array formation
  useEffect(() => {
    let array = [];
    for (let i = 0; i < defaultArrSize; i++) {
      array.push(randomIntFromInterval(minArrayVal, maxArrayVal));
    }
    setArray(array);
    setPrevArray(array);
  }, []);

  // handle array size change
  useEffect(() => {
    let array = [];
    for (let i = 0; i < arraySize; i++) {
      array.push(randomIntFromInterval(minArrayVal, maxArrayVal));
    }
    setArray(array);
    setPrevArray(array);
  }, [arraySize]);

  //   useEffect(() => {
  //     setArray(prevArray);
  //   }, [prevArray, reset]);

  const MergeSort = () => {
    let animations = sortingAlgorithms.mergeSort(array);
    for (let i = 0; i < animations.length; i++) {
      timeouts.push(
        setTimeout(() => {
          const topArrayBars = document.getElementsByClassName("array__bar");
          const bottomArrayBars =
            document.getElementsByClassName("array__baraux");
          if (animations[i].type === "look") {
            for (let j = 0; j < topArrayBars.length; j++) {
              topArrayBars[j].style.backgroundColor = "rgb(57, 200, 195)";
            }
            for (
              let j = animations[i].look[0];
              j <= animations[i].look[1];
              j++
            ) {
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
            topArrayBars[animations[i].oldIdx].style.backgroundColor =
              "rgba(57, 200, 195, 0)";
          } else if (animations[i].type === "lift") {
            let newArray = array.slice();
            for (
              let j = animations[i].range[0];
              j <= animations[i].range[1];
              j++
            ) {
              topArrayBars[j].style.height =
                animations[i].newVals[j - animations[i].range[0]].toString() +
                "px";
              topArrayBars[j].style.backgroundColor = "rgb(57, 200, 195)";
            }
            for (let j = 0; j < topArrayBars.length; j++) {
              topArrayBars[j].style.backgroundColor = "rgb(57, 200, 195)";
            }
            for (let j = 0; j < bottomArrayBars.length; j++) {
              bottomArrayBars[j].style.backgroundColor =
                "rgba(57, 200, 195, 0)";
            }
          }
        }, i * speed)
      );
    }
    // console.log(array);
  };
  const SelectionSort = () => {
    let animations = sortingAlgorithms.selectionSort(array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const topArrayBars = document.getElementsByClassName("array__bar");
        if (animations[i].type === "left min") {
          for (let j = 0; j < topArrayBars.length; j++) {
            console.log(j);
            topArrayBars[j].style.backgroundColor = "rgb(57, 200, 195)";
          }
          topArrayBars[animations[i].idx].style.backgroundColor =
            "rgb(255, 237, 77)";
        } else if (animations[i].type === "look") {
          if (animations[i - 1].type === "look") {
            topArrayBars[animations[i - 1].idx].style.backgroundColor =
              "rgb(57, 200, 195)";
          }
          topArrayBars[animations[i].idx].style.backgroundColor =
            "rgb(255, 79, 120)";
        } else if (animations[i].type === "newMin") {
          for (let j = 0; j < topArrayBars.length; j++) {
            if (topArrayBars[j].style.backgroundColor === "rgb(33, 107, 51)") {
              topArrayBars[j].style.backgroundColor = "rgb(57, 200, 195)";
            }
          }
          topArrayBars[animations[i].idx].style.backgroundColor =
            "rgb(33, 107, 51)";
        } else if (animations[i].type === "swap") {
          let tempBackgroundColor =
            topArrayBars[animations[i].indices[0]].style.backgroundColor;
          let tempHeight = topArrayBars[animations[i].indices[0]].style.height;
          topArrayBars[animations[i].indices[0]].style.backgroundColor =
            topArrayBars[animations[i].indices[1]].style.backgroundColor;
          topArrayBars[animations[i].indices[1]].style.backgroundColor =
            tempBackgroundColor;
          topArrayBars[animations[i].indices[0]].style.height =
            topArrayBars[animations[i].indices[1]].style.height;
          topArrayBars[animations[i].indices[1]].style.height = tempHeight;
        }
      }, (i * speedFactor) / arraySize);
    }
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
      <div className="frontPage__SortingButtons">
        <Button
          variant="outlined"
          className="Buttons__mergeSort"
          onClick={() => MergeSort()}
          size="large"
        >
          Merge Sort
        </Button>
        <Button
          variant="outlined"
          className="Buttons__selectionSort"
          onClick={() => SelectionSort()}
          size="large"
        >
          Selection Sort
        </Button>
        <Button
          variant="outlined"
          className="Buttons__quickSort"
          onClick={() => QuickSort()}
          size="large"
        >
          Quick Sort
        </Button>
        <Button
          variant="outlined"
          className="Buttons__heapSort"
          onClick={() => HeapSort()}
          size="large"
        >
          Heap Sort
        </Button>
        <Button
          variant="outlined"
          className="Buttons__bubblesort"
          onClick={() => BubbleSort()}
          size="large"
        >
          Bubble Sort
        </Button>
        <Button
          variant="outlined"
          className="Buttons__insertionsort"
          onClick={() => InsertionSort()}
          size="large"
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
      <div className="frontPage__arrayaux">
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
          onClick={() => regenerateArray()}
          size="large"
        >
          Regenerate Array
        </Button>
        <Slider
          className="ArrayButtons__SliderSize"
          aria-label="Temperature"
          defaultValue={500}
          //   getAriaValueText={"hi"}
          valueLabelDisplay="auto"
          step={5}
          color="secondary"
          onChange={handleArraySizeChange}
          min={8}
          max={1000}
        />
        <Slider
          className="ArrayButtons__SliderSpeed"
          aria-label="Temperature"
          defaultValue={625 / 10}
          //   getAriaValueText={"hi"}
          valueLabelDisplay="auto"
          step={1}
          color="secondary"
          onChange={handleSpeedChange}
          min={625 / 625}
          max={625 / 5}
        />
        <IconButton
          className="Buttons__reset"
          //   onClick={() => setUpdate(!update)}
          onClick={() => handleReset()}
        >
          <RestartAltIcon className="header__icon" fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}

export default SortingVisualizer;
