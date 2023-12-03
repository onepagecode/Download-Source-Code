/*
The provided JavaScript code defines a React component called Toolbar which is exported at the end of the file. This component likely represents a toolbar interface in a larger application, possibly controlling various sorting algorithms and features related to an array.

The constructor of Toolbar binds two methods, handleClick and handleChange, to the instance of the component so that they can correctly refer to this as the component instance.

The componentDidMount lifecycle method is used to initialize the array when the component mounts. It generates an array with 87 elements using the generateArray method passed in from the component's props, and sets the value of an HTML element with the id changeSize to 50.

The handleClick method, when called with an algorithm name, uses the updateAlgorithm method passed in via props to change the current algorithm.

The handleChange method is used to generate a new array when a certain event happens. It uses the event's target value to calculate the new length of the array, then generates the new array.

In the render method, various properties and methods are extracted from props. The render method is responsible for rendering the component's UI. It defines a variable speed based on the length of the array, as well as color and cursor style variables based on whether sorting is currently running.

Inside the returned JSX, there are several div elements and an input element, each with various handlers and styles applied. These likely represent different parts of the toolbar interface. In particular, there are buttons for generating a new array and for changing the array size, buttons for each of the sorting algorithms, and a button for starting the sort. Each button has a handler attached to it for the corresponding action, and the sort button is only rendered if an algorithm is selected.

If the sorting is currently running, many of the buttons are disabled or have their actions removed, and their colors and cursor styles are changed.
*/
import React, { Component } from "react";
import "./Toolbar.css";

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { generateArray } = this.props;

    generateArray(87);
    document.getElementById("changeSize").value = 50;
  }

  handleClick(algorithm) {
    const { updateAlgorithm } = this.props;

    updateAlgorithm(algorithm);
  }

  handleChange(evt) {
    const { generateArray } = this.props;

    generateArray(Math.floor((parseInt(evt.target.value) + 3) * 1.65));
  }

  render() {
    const {
      array,
      algorithm,
      generateArray,
      sort,
      isRunning,
    } = this.props;

    const speed = 570 - Math.pow(array.length, 2) > 0 ?
      570 - Math.pow(array.length, 2) : 0;

    const color = isRunning ? "rgba(214, 29, 29, 0.8)" : "white";

    const cursor = isRunning ? "auto" : "pointer";

    return (
      <div id="toolbar">
        <div
          id={!isRunning ? "generateArray" : "generateArrayX"}
          style={{color: color, cursor: cursor}}
          onClick={!isRunning ? () => generateArray(array.length) : null}>
          Generate New Array
        </div>
        <div className="separator"></div>
        <div
          id="arraySize"
          style={{color: color}}>
          Change Array Size & Sorting Speed
        </div>
        <input
          id="changeSize"
          type="range"
          min="0"
          max="100"
          style={{background: color, cursor: cursor}}
          disabled={isRunning ? "disabled" : null}
          onChange={this.handleChange}
          />
        <div className="separator"></div>
        <div
          className={algorithm === "mergeSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("mergeSort")}>
          Merge Sort
        </div>
        <div
          className={algorithm === "quickSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("quickSort")}>
          Quick Sort
        </div>
        <div
          className={algorithm === "heapSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("heapSort")}>
          Heap Sort
        </div>
        <div
          className={algorithm === "bubbleSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("bubbleSort")}>
          Bubble Sort
        </div>
        <div className="separator"></div>
        { algorithm ? <div
            id="sort"
            style={{color: color, cursor: cursor}}
            onClick={!isRunning ? () => sort(algorithm, array, speed) : null}>
            Sort!
          </div> : null
        }
      </div>
    )
  }
}

export default Toolbar;
