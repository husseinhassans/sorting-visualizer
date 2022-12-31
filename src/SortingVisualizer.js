import React from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import "./SortingVisualizer.css";
import * as sortingAlgorithms from "./SortingAlgorithms";

class SortingVisualizer extends React.Component {
  constructor() {
    super();
    this.minArrayVal = 5;
    this.timeouts = [];
    this.maxArrayVal = 350;
    this.defaultArrSize = 500;
    this.defaultDelay = 10;
    this.state = {
      array: [],
      prevArray: [],
      delay: this.defaultDelay,
      arraySize: this.defaultArrSize,
    };
  }
  handleArraySizeChange(event) {
    this.setState({ arraySize: Number(event.target.value) });
  }

  handleSpeedChange = (event) => {
    this.setState({ delay: event.target.value });
  };

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  regenerateArray() {
    for (let i = 0; i < this.timeouts.length; i++) {
      clearTimeout(this.timeouts[i]);
    }
    this.timeouts = [];

    this.setState({ prevArray: this.state.array.slice() });
    let newArray = [];
    const topArrayBars = document.getElementsByClassName("array__bar");
    const bottomArrayBars = document.getElementsByClassName("array__baraux");

    for (let i = 0; i < this.state.arraySize; i++) {
      topArrayBars[i].style.backgroundColor = "rgb(57, 200, 195)";
      bottomArrayBars[i].style.backgroundColor = "rgba(57, 200, 195, 0)";
      newArray.push(
        this.randomIntFromInterval(this.minArrayVal, this.maxArrayVal)
      );
    }
    this.setState({ array: newArray });
  }

  handleReset() {
    // reset to proper previous array
    let timeouts = this.timeouts;
    if (timeouts === []) {
      this.setState({ array: this.state.prevArray });
    }
    // otherwise reset to unsorted array
    else {
      for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
      }
      timeouts = [];
      this.setState({ array: [...this.state.array] });
    }
  }

  componentDidMount() {
    let array = [];
    for (let i = 0; i < this.defaultArrSize; i++) {
      array.push(
        this.randomIntFromInterval(this.minArrayVal, this.maxArrayVal)
      );
    }
    this.setState({ array: array, prevArray: array });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.arraySize !== this.state.arraySize) {
      let array = [];
      for (let i = 0; i < this.state.arraySize; i++) {
        array.push(
          this.randomIntFromInterval(this.minArrayVal, this.maxArrayVal)
        );
      }
      this.setState({ array: array, prevArray: array });
    }
  }

  async MergeSort() {
    let animations = sortingAlgorithms.mergeSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const topArrayBars = document.getElementsByClassName("array__bar");
      const bottomArrayBars = document.getElementsByClassName("array__baraux");
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
        topArrayBars[animations[i].oldIdx].style.backgroundColor =
          "rgba(57, 200, 195, 0)";
      } else if (animations[i].type === "lift") {
        let newArray = this.state.array.slice();
        for (let j = animations[i].range[0]; j <= animations[i].range[1]; j++) {
          topArrayBars[j].style.height =
            animations[i].newVals[j - animations[i].range[0]].toString() + "px";
          topArrayBars[j].style.backgroundColor = "rgb(57, 200, 195)";
        }
        for (let j = 0; j < topArrayBars.length; j++) {
          topArrayBars[j].style.backgroundColor = "rgb(57, 200, 195)";
        }
        for (let j = 0; j < bottomArrayBars.length; j++) {
          bottomArrayBars[j].style.backgroundColor = "rgba(57, 200, 195, 0)";
        }
      }

      console.log(i);
      await new Promise((resolve) =>
        this.timeouts.push(setTimeout(resolve, this.state.delay))
      );
    }
  }

  async SelectionSort() {
    let animations = sortingAlgorithms.selectionSort(this.state.array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      //   setTimeout(() => {
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
      await new Promise((resolve) => setTimeout(resolve, this.state.delay));
    }
  }
  QuickSort() {
    this.setState({ array: sortingAlgorithms.quickSort(this.state.array) });
  }
  HeapSort() {
    this.setState({ array: sortingAlgorithms.heapSort(this.state.array) });
  }
  BubbleSort() {
    this.setState({ array: sortingAlgorithms.bubbleSort(this.state.array) });
  }
  InsertionSort() {
    this.setState({ array: sortingAlgorithms.insertionSort(this.state.array) });
  }
  render() {
    return (
      <div className="frontPage">
        <div className="frontPage__SortingButtons">
          <Button
            variant="outlined"
            className="Buttons__mergeSort"
            onClick={() => this.MergeSort()}
            size="large"
          >
            Merge Sort
          </Button>
          <Button
            variant="outlined"
            className="Buttons__selectionSort"
            onClick={() => this.SelectionSort()}
            size="large"
          >
            Selection Sort
          </Button>
          <Button
            variant="outlined"
            className="Buttons__quickSort"
            onClick={() => this.QuickSort()}
            size="large"
          >
            Quick Sort
          </Button>
          <Button
            variant="outlined"
            className="Buttons__heapSort"
            onClick={() => this.HeapSort()}
            size="large"
          >
            Heap Sort
          </Button>
          <Button
            variant="outlined"
            className="Buttons__bubblesort"
            onClick={() => this.BubbleSort()}
            size="large"
          >
            Bubble Sort
          </Button>
          <Button
            variant="outlined"
            className="Buttons__insertionsort"
            onClick={() => this.InsertionSort()}
            size="large"
          >
            Insertion Sort
          </Button>
        </div>
        <div className="frontPage__array">
          {this.state.array.map((value, idx) => (
            <div
              className="array__bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <div className="frontPage__arrayaux">
          {this.state.array.map((value, idx) => (
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
            onClick={() => this.regenerateArray()}
            size="large"
          >
            Regenerate Array
          </Button>
          <Slider
            className="ArrayButtons__SliderSize"
            aria-label="Temperature"
            defaultValue={this.defaultArrSize}
            //   getAriaValueText={"hi"}
            valueLabelDisplay="auto"
            step={5}
            color="secondary"
            onChange={this.handleArraySizeChange}
            min={8}
            max={1000}
          />
          <Slider
            className="ArrayButtons__SliderSpeed"
            aria-label="Temperature"
            defaultValue={this.state.delay}
            //   getAriaValueText={"hi"}
            valueLabelDisplay="auto"
            step={1}
            color="secondary"
            onChange={this.handleSpeedChange}
            min={0.01}
            max={1000}
          />
          <IconButton
            className="Buttons__reset"
            //   onClick={() => setUpdate(!update)}
            onClick={() => this.handleReset()}
          >
            <RestartAltIcon className="header__icon" fontSize="large" />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default SortingVisualizer;
