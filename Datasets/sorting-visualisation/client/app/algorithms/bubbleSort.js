/*
This portion of your code appears to be importing various functions from other modules within your project. Here's a breakdown of what each line is doing:

import { setArray } from "../reducers/array"; - This line imports a function named setArray from a module located at '../reducers/array'. The setArray function is likely used to set or update the state of an array that's being sorted.
import { setCurrentBubbleTwo } from "../reducers/bubbleSort"; - This line imports a function named setCurrentBubbleTwo from the module located at '../reducers/bubbleSort'. It might be used to set the current pair of elements being compared during the bubble sort algorithm.
import { setCurrentSwappers } from "../reducers/swappers"; - This line imports the function setCurrentSwappers from the module '../reducers/swappers'. The function is likely used to indicate or store the two elements in the array that are currently being swapped.
import { setCurrentSorted } from "../reducers/sorted"; - This line imports the function setCurrentSorted from the module '../reducers/sorted'. This function is probably used to keep track of which elements have been fully sorted already.
import { setRunning } from "../reducers/running"; - This line imports the function setRunning from the module '../reducers/running'. This function could be used to control the state of the sorting process (e.g., to start or stop the algorithm).
The term 'reducers' in the import paths suggest that your project might be using Redux or a similar state management library. Reducers are functions that handle state changes in Redux. The 'set' prefix also implies that these functions are likely action creators that return actions to be dispatched to the Redux store, resulting in state changes.
*/
import { setArray } from "../reducers/array";
import { setCurrentBubbleTwo } from "../reducers/bubbleSort";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

/*
This function, named bubbleSort, implements the Bubble Sort algorithm for sorting an array of numbers in increasing order.

It accepts three parameters: an array to sort (stateArray), a function for dispatching actions (dispatch), and a speed parameter which likely controls the speed of the visualization or sorting process.

At the start, the function creates a new copy of the input array to avoid mutating the original array, and initializes several variables: toDispatch, sorted, and round.

toDispatch is an empty array that will be used to store sequences of actions taken during the sorting process. sorted is a flag indicating whether the array is sorted or not. Initially, it's set to false meaning that the array is not yet sorted. round is initialized to 0 and represents the current pass through the array.

Then it enters a while loop, which continues as long as the array is not fully sorted. Inside this loop, there's a for loop that iterates over the array.

During each iteration, it checks if the current element is greater than the next one. If it is, it means that those two elements are out of order. It then swaps those two elements, sets the sorted flag to false (because a swap was needed, so the array isn't fully sorted yet), and records these actions in toDispatch.

After each pass (round) through the array, it records the last sorted position and increments the round variable by 1. This optimizes the algorithm because the largest element is always bubbled to the end during each pass, so there's no need to revisit those elements.

Finally, once the array is fully sorted and no more swaps are needed, it calls a handleDispatch function (not shown here) that seems to take the recorded actions from toDispatch and dispatches them at the given speed. The sorted array is then returned.

In summary, the function is not just sorting an array but also recording all actions taken during the sorting process, possibly for the purpose of visualizing the sorting process step-by-step later on.
*/
function bubbleSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0),
      toDispatch = [],
      sorted = false,
      round = 0;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < array.length - 1 - round; i++) {
      toDispatch.push([i, i + 1]);
      if (array[i] > array[i + 1]) {
        toDispatch.push([i, i + 1, true]);
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        sorted = false;
        toDispatch.push(array.slice(0));
        toDispatch.push([]);
      }
    }
    toDispatch.push([true, array.length - 1 - round]);
    round++;
  }
  handleDispatch(toDispatch, dispatch, array, speed);
  return array;
}

/**

The function handleDispatch takes four parameters: toDispatch, dispatch, array, and speed. It's responsible for dispatching actions that describe the steps taken during the bubble sort algorithm, possibly for the purpose of visualizing these steps.

If toDispatch is empty, meaning all steps of the sort have been dispatched, it indicates that the sorting is completed. It first dispatches an action that highlights all indices in the array, then it sets a delay (of 900 milliseconds) after which it dispatches actions to clear the highlighted indices, mark all indices as sorted, and indicate that the sorting is no longer running.

If toDispatch is not empty, it means there are still sorting steps to be dispatched. The function determines which action to dispatch based on the length of the first element in toDispatch and the type of its first item. It could dispatch actions to set the array, indicate which indices are being swapped, mark certain indices as sorted, or highlight the indices currently being compared.

After dispatching the action, it removes the first element from toDispatch and then sets a delay (of speed milliseconds) before it recursively calls itself to dispatch the next action. This delay might be used to control the speed of the sorting visualization. This process continues until all steps have been dispatched and toDispatch is empty.
 */
function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setCurrentBubbleTwo(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentBubbleTwo([]));
      dispatch(setCurrentSorted(array.map((num, index) => index)));
      dispatch(setRunning(false));
    }, 900);
    return;
  }
  let dispatchFunction = toDispatch[0].length > 3 ?
    setArray : toDispatch[0].length === 3 || toDispatch[0].length === 0 ?
      setCurrentSwappers : toDispatch[0].length === 2 && typeof toDispatch[0][0] === "boolean" ?
        setCurrentSorted : setCurrentBubbleTwo;
  dispatch(dispatchFunction(toDispatch.shift()));
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed);
  }, speed);
}

export default bubbleSort;
