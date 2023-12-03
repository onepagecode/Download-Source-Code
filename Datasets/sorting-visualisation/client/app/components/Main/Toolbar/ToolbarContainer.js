/*
This JavaScript code is a part of a Redux-connected React component, specifically the Toolbar component in the file Toolbar.jsx. The Redux connect function allows the Toolbar component to interact with the Redux store - enabling it to dispatch actions to modify the state of the store and subscribe to changes in the store's state.

It first imports several dependencies, including the Redux connect function, the Toolbar component, Redux action creators, and several algorithm functions (bubbleSort, quickSort, heapSort, and mergeSort).

Then, a function named mapStateToProps is defined. This function describes how to transform the current Redux store state into the props needed by the Toolbar component. It takes the current state of the Redux store as an argument and returns an object that maps the state's array, algorithm, and isRunning properties to equivalent keys. These properties are then passed as props to the connected Toolbar component, allowing the component to access and display this data.

This code snippet is the first part of setting up a Redux connection for the Toolbar component. It prepares the props derived from the Redux store state. The next step, which isn't included in the provided code, would be to define mapDispatchToProps function and finally call connect with mapStateToProps, mapDispatchToProps, and the Toolbar component. This would allow the component to dispatch actions to the Redux store and subscribe to changes in the parts of the store state that are mapped via mapStateToProps.
*/
import { connect } from "react-redux";
import Toolbar from "./Toolbar.jsx";
import { setArray } from "../../../reducers/array";
import { setAlgorithm } from "../../../reducers/algorithm";
import { setCurrentSorted } from "../../../reducers/sorted";
import { setRunning } from "../../../reducers/running";
import bubbleSort from "../../../algorithms/bubbleSort.js";
import quickSort from "../../../algorithms/quickSort.js";
import heapSort from "../../../algorithms/heapSort.js";
import mergeSort from "../../../algorithms/mergeSort.js";

const mapStateToProps = ({
  array,
  algorithm,
  isRunning,
}) => ({
  array,
  algorithm,
  isRunning,
});

/*
This piece of JavaScript code is the second part of setting up a Redux connection for the Toolbar component in a React-Redux application. This is where the Redux dispatch function gets connected to the component, enabling it to trigger changes in the Redux store state.

The mapDispatchToProps function describes how to map Redux action dispatching functions to the props of the Toolbar component. It returns an object that contains several functions (generateArray, updateAlgorithm, and sort), which can be invoked within the Toolbar component to dispatch actions to the Redux store.

The generateArray function takes a length as a parameter and generates an array of that length filled with random numbers between 10 and 209. It then dispatches two actions to the Redux store: one to update the array state with this newly generated array, and another to clear the currentSorted state.

The updateAlgorithm function dispatches an action to update the algorithm state in the Redux store with the chosen sorting algorithm.

The sort function is responsible for executing the selected sorting algorithm on the given array. It selects the appropriate sorting function based on the algorithm parameter, dispatches an action to clear the currentSorted state, an action to set the isRunning state to true (indicating that the sorting is in progress), and finally calls the selected sorting function with the necessary arguments.

Finally, the connect function from Redux is invoked with mapStateToProps and mapDispatchToProps as arguments, and the Toolbar component is passed into the resulting function. This is the process that actually connects the Toolbar component to the Redux store, and it results in a new component that is subscribed to the Redux store updates and can dispatch actions to it. This connected component is then exported.
*/
const mapDispatchToProps = () => dispatch => ({
  generateArray: (length) => {
    let array = [];
    while (array.length < length) {
      array.push(Math.floor(Math.random() * 200) + 10);
    }
    dispatch(setArray(array));
    dispatch(setCurrentSorted([]));
  },

  updateAlgorithm: (algorithm) => {
    dispatch(setAlgorithm(algorithm));
  },

  sort: (algorithm, array, speed) => {
    let doSort = algorithm === "bubbleSort" ?
      bubbleSort : algorithm === "quickSort" ?
        quickSort : algorithm === "heapSort" ?
          heapSort : algorithm === "mergeSort" ?
            mergeSort : null;
    dispatch(setCurrentSorted([]));
    dispatch(setRunning(true));
    doSort(array, dispatch, speed);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
