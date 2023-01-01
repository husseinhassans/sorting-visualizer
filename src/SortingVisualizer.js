import * as React from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import "./SortingVisualizer.css";
import * as sortingAlgorithms from "./SortingAlgorithms";

import StraightenIcon from "@mui/icons-material/Straighten";
import SpeedIcon from "@mui/icons-material/Speed";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiInput from "@mui/material/Input";

const Input = styled(MuiInput)`
  width: 42px;
`;

class SortingVisualizer extends React.Component {
  constructor() {
    super();
    this.minArrayVal = 5;
    this.timeouts = [];
    this.maxArrayVal = 350;
    this.defaultArrSize = 500;
    this.defaultDelay = 10;
    this.minDelay = 4;
    this.maxDelay = 500;
    this.minArrSize = 2;
    this.maxArraySize = 1000;
    this.state = {
      array: [],
      prevArray: [],
      delay: this.defaultDelay,
      arraySize: this.defaultArrSize,
      showAuxArray: false,
      sorting: false,
    };
  }
  handleArraySizeChange = (event) => {
    this.setState({ arraySize: event.target.value });
  };

  handleInputSizeChange = (event) => {
    this.setState({
      arraySize:
        event.target.value === ""
          ? this.defaultArrSize
          : Number(event.target.value),
    });
  };

  // handleBlur = () => {
  //   if (value < this.minArrSize) {
  //     this.setState({ arraySize: this.minArrSize });
  //   } else if (value > this.maxArraySize) {
  //     this.setState({ arraySize: this.maxArrSize });
  //   }
  // };

  handleSizeSliderScale(value) {
    if (value < 50) {
      return value * 4;
    } else {
      return 200 + (value - 50) * 16;
    }
  }

  handleSpeedChange = (event) => {
    this.setState({ delay: event.target.value });
  };

  handleInputSpeedChange = (event) => {
    this.setState({
      delay:
        event.target.value === ""
          ? this.defaultDelay
          : Number(event.target.value),
    });
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

      if (this.state.showAuxArray) {
        bottomArrayBars[i].style.backgroundColor = "rgba(57, 200, 195, 0)";
      }
      newArray.push(
        this.randomIntFromInterval(this.minArrayVal, this.maxArrayVal)
      );
    }
    this.setState({ array: newArray });
    this.setState({ showAuxArray: false, sorting: false });
  }

  handleReset() {
    this.setState({ showAuxArray: false, sorting: false });
    // reset to proper previous array
    if (this.timeouts === []) {
      this.setState({ array: this.state.prevArray });
    }
    // otherwise reset to unsorted array
    else {
      for (let i = 0; i < this.timeouts.length; i++) {
        clearTimeout(this.timeouts[i]);
      }
      this.timeouts = [];

      this.setState({ array: this.state.prevArray.slice() });

      const topArrayBars = document.getElementsByClassName("array__bar");
      const bottomArrayBars = document.getElementsByClassName("array__baraux");
      for (let i = 0; i < this.state.arraySize; i++) {
        topArrayBars[i].style.backgroundColor = "rgb(57, 200, 195)";
        if (this.state.showAuxArray) {
          bottomArrayBars[i].style.backgroundColor = "rgba(57, 200, 195, 0)";
        }
        topArrayBars[i].style.height = this.state.array[i].toString() + "px";
      }
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
      this.setState({ showAuxArray: false, sorting: false });

      for (let i = 0; i < this.timeouts.length; i++) {
        clearTimeout(this.timeouts[i]);
      }
      this.timeouts = [];

      let newArray = [];
      for (let i = 0; i < this.state.arraySize; i++) {
        newArray.push(
          this.randomIntFromInterval(this.minArrayVal, this.maxArrayVal)
        );
      }
      this.setState({ array: newArray, prevArray: newArray });
    }
  }

  renderAuxArray() {
    return (
      <div className="frontPage__arrayaux">
        {this.state.array.map((value, idx) => (
          <div
            className="array__baraux"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    );
  }

  async MergeSort() {
    this.setState({ showAuxArray: true, sorting: true });
    this.setState({ prevArray: this.state.array.slice() });
    let animations = sortingAlgorithms.mergeSort(this.state.array);
    let newArray = this.state.array.slice();
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
        for (let j = animations[i].range[0]; j <= animations[i].range[1]; j++) {
          topArrayBars[j].style.height =
            animations[i].newVals[j - animations[i].range[0]].toString() + "px";
          topArrayBars[j].style.backgroundColor = "rgb(57, 200, 195)";
          newArray[j] = animations[i].newVals[j - animations[i].range[0]];
        }
        for (let j = 0; j < topArrayBars.length; j++) {
          topArrayBars[j].style.backgroundColor = "rgb(57, 200, 195)";
        }
        for (let j = 0; j < bottomArrayBars.length; j++) {
          bottomArrayBars[j].style.backgroundColor = "rgba(57, 200, 195, 0)";
        }
      }

      // console.log(i);
      await new Promise((resolve) =>
        this.timeouts.push(setTimeout(resolve, this.state.delay))
      );
    }
    this.setState({ array: newArray });
    this.setState({ showAuxArray: false, sorting: false });
  }

  async SelectionSort() {
    this.setState({ prevArray: this.state.array.slice() });
    this.setState({ showAuxArray: false, sorting: true });
    let newArray = this.state.array.slice();

    let animations = sortingAlgorithms.selectionSort(this.state.array);
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
        // swap bar colors
        let tempBackgroundColor =
          topArrayBars[animations[i].indices[0]].style.backgroundColor;
        topArrayBars[animations[i].indices[0]].style.backgroundColor =
          topArrayBars[animations[i].indices[1]].style.backgroundColor;
        topArrayBars[animations[i].indices[1]].style.backgroundColor =
          tempBackgroundColor;

        // swap bar heights
        let tempHeight = topArrayBars[animations[i].indices[0]].style.height;
        topArrayBars[animations[i].indices[0]].style.height =
          topArrayBars[animations[i].indices[1]].style.height;
        topArrayBars[animations[i].indices[1]].style.height = tempHeight;

        // Change the resultant array
        let temp = newArray[animations[i].indices[0]];
        newArray[animations[i].indices[0]] = newArray[animations[i].indices[1]];
        newArray[animations[i].indices[1]] = temp;
      }
      await new Promise((resolve) =>
        this.timeouts.push(setTimeout(resolve, this.state.delay))
      );
    }
    this.setState({ array: newArray });
    this.setState({ sorting: false });
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
            disabled={this.state.sorting}
          >
            Merge Sort
          </Button>
          <Button
            variant="outlined"
            className="Buttons__selectionSort"
            onClick={() => this.SelectionSort()}
            size="large"
            disabled={this.state.sorting}
          >
            Selection Sort
          </Button>
          <Button
            variant="outlined"
            className="Buttons__quickSort"
            onClick={() => this.QuickSort()}
            size="large"
            disabled={this.state.sorting}
          >
            Quick Sort
          </Button>
          <Button
            variant="outlined"
            className="Buttons__heapSort"
            onClick={() => this.HeapSort()}
            size="large"
            disabled={this.state.sorting}
          >
            Heap Sort
          </Button>
          <Button
            variant="outlined"
            className="Buttons__bubblesort"
            onClick={() => this.BubbleSort()}
            size="large"
            disabled={this.state.sorting}
          >
            Bubble Sort
          </Button>
          <Button
            variant="outlined"
            className="Buttons__insertionsort"
            onClick={() => this.InsertionSort()}
            size="large"
            disabled={this.state.sorting}
          >
            Insertion Sort
          </Button>
        </div>
        <div className="frontPage__array">
          {this.state.array.map((value, idx) => (
            <div
              className="array__bar"
              key={idx}
              style={{
                height: `${value}px`,
                scale: `1 ${this.state.showAuxArray ? 1 : 2}`,
              }}
            ></div>
          ))}
        </div>
        {this.state.showAuxArray ? this.renderAuxArray() : null}
        <div className="frontPage__ArrayButtons">
          <Button
            variant="outlined"
            className="ArrayButtons__regenerate"
            onClick={() => this.regenerateArray()}
            size="large"
          >
            Regenerate Array
          </Button>
          <Box sx={{ width: 400 }}>
            <Typography
              id="input-slider"
              color="rgb(57, 200, 195)"
              // fontWeight="350"
              gutterBottom
            >
              Size
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <StraightenIcon />
              </Grid>
              <Grid item xs>
                <Slider
                  className="ArrayButtons__SliderSize"
                  disabled={this.state.sorting}
                  aria-label="Temperature"
                  value={this.state.arraySize}
                  // getAriaValueText={this.handleSizeSliderScale}
                  valueLabelDisplay="auto"
                  step={1}
                  color="secondary"
                  onChange={this.handleArraySizeChange}
                  min={2}
                  max={1000}
                />
              </Grid>
              <Grid item>
                <Input
                  value={this.state.arraySize}
                  disabled={this.state.sorting}
                  size="small"
                  onChange={this.handleInputSizeChange}
                  // onBlur={handleBlur}
                  inputProps={{
                    step: 1,
                    min: this.minArrSize,
                    max: this.maxArrSize,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                  style={{ width: `50px` }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ width: 400 }}>
            <Typography
              id="input-slider"
              color="rgb(57, 200, 195)"
              // fontWeight="350"
              gutterBottom
            >
              Speed
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SpeedIcon />
              </Grid>
              <Grid item xs>
                <Slider
                  className="ArrayButtons__SliderSpeed"
                  aria-label="Temperature"
                  value={this.state.delay}
                  //   getAriaValueText={"hi"}
                  valueLabelDisplay="auto"
                  // step={1}
                  color="secondary"
                  onChange={this.handleSpeedChange}
                  min={this.minDelay}
                  max={this.maxDelay}
                />
              </Grid>
              <Grid item>
                <Input
                  value={this.state.delay}
                  size="small"
                  onChange={this.handleInputSpeedChange}
                  // onBlur={handleBlur}
                  inputProps={{
                    step: 1,
                    min: this.minDelay,
                    max: this.maxDelay,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                  style={{ width: `50px` }}
                />
              </Grid>
            </Grid>
          </Box>
          <IconButton
            className="Buttons__reset"
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
