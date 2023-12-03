import { setArray } from "../reducers/array";
import { setCurrentQuickTwo, setPivot } from "../reducers/quickSort";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

/*
This is a function named quickSort that is responsible for implementing the QuickSort sorting algorithm on a given array, which is originally in the stateArray parameter.

The function begins by creating a copy of the input array using slice(0), so the original array is not modified. This is a common practice in JavaScript when you want to perform operations on an array without affecting the original.

Then it declares an empty array called toDispatch, which will be used to hold data about the steps of the sorting process. This data can be used to visualize the sorting process step by step, for example in a user interface.

The function then calls quickSortHelper, a helper function that performs the QuickSort algorithm on the array, with the indices of the start and end of the array (0 and array.length - 1) as its boundaries. The toDispatch array is also passed into this function so that it can add its visualization data to it.

Once quickSortHelper is finished, the function calls handleDispatch, another helper function that uses the data in toDispatch to dispatch actions (if you're using a state management library like Redux) or otherwise use this data to update a visualization of the sorting process.

Finally, the sorted array is returned. Note that even though the function sorts array, it does not actually change stateArray because it made a copy of it at the start.
*/
function quickSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0),
      toDispatch = [];
  quickSortHelper(array, 0, array.length - 1, toDispatch);
  handleDispatch(toDispatch, dispatch, array, speed);
  return array;
}

/*
This function, quickSortHelper, is a helper function that recursively performs the QuickSort algorithm on the input array, from the index start to the index end. QuickSort is a divide-and-conquer algorithm that works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.

First, it checks if the start index is greater than or equal to the end index. If it is, then it means that the section of the array currently being sorted has one or zero elements, and so it is already sorted. In this case, it pushes an array into toDispatch to signal that this position is sorted and returns from the function.

The function sets up three pointers to the array: pivot, left, and right. The pivot pointer points to the first element of the array, while the left and right pointers point to the elements directly to the right of the pivot and at the end of the array, respectively.

Then, in a loop, it compares the elements at the left and right pointers with the pivot element. If the left element is greater and the right element is smaller, it swaps these elements, effectively moving a larger value to the right side of the array and a smaller value to the left side.

Once the condition right >= left is no longer true, it means that all elements have been partitioned around the pivot. At this point, the pivot element is swapped with the element at the right pointer, as it is guaranteed that all elements to the right of this index are greater than the pivot, and all elements to the left are smaller.

Finally, it calls itself recursively on the two partitions created by the pivot, first on the left side (start to right - 1) and then on the right side (right + 1 to end), effectively repeating the same process on each partition until the entire array is sorted. The toDispatch array is used throughout to keep track of the steps of the process, allowing the sort operation to be visualized step by step.
*/
function quickSortHelper(array, start, end, toDispatch) {
  if (start >= end) {
    toDispatch.push([true, start]);
    return;
  }
  let pivot = start,
      left = start + 1,
      right = end;
  toDispatch.push(pivot);
  toDispatch.push([left, right]);
  while (right >= left) {
    if (array[right] < array[pivot] && array[left] > array[pivot]) {
      toDispatch.push([left, right, true]);
      let temp = array[right];
      array[right] = array[left];
      array[left] = temp;
      toDispatch.push(array.slice(0));
      toDispatch.push([]);
    }
    if (array[right] >= array[pivot]) {
      right--;
    }
    if (array[left] <= array[pivot]) {
      left++;
    }
    if (right >= left) toDispatch.push([left, right]);
  }
  toDispatch.push([pivot, right]);
  if (pivot !== right) {
    let temp = array[right];
    array[right] = array[pivot];
    array[pivot] = temp;
    toDispatch.push([pivot, right, true]);
    toDispatch.push(array.slice(0));
    toDispatch.push([]);
    toDispatch.push([true, right]);
  }
  quickSortHelper(array, start, right - 1, toDispatch);
  quickSortHelper(array, right + 1, end, toDispatch);
}

/*
This function, handleDispatch, manages the dispatching of actions during the QuickSort algorithm process, helping to visually demonstrate each step of the sorting procedure. It works by taking an array of actions, or toDispatch, a dispatch function, the current state of the array, and the speed at which to execute these actions.

First, it checks if the toDispatch array is empty. If it is, this means that the sorting has been completed. At this point, it performs several dispatch actions: it sets the pivot to null, it marks all items as being part of the second QuickSort group, then after a delay, it clears this group and signals that the sorting operation is no longer running. It then returns to end the function.

Next, it determines which dispatch action to perform based on the structure and content of the first item in the toDispatch array. This could be setting a new pivot, updating the state of the array, marking two items as currently being swapped, marking an item as sorted, or marking items as being part of the second QuickSort group.

After deciding on the appropriate action, it performs the dispatch and removes the action from the toDispatch array. If the action was to set a new pivot, it also marks the next group of items in the toDispatch array as being part of the second QuickSort group.

Lastly, it waits for a specified duration equal to the speed value, and then it recursively calls itself, allowing it to continue dispatching the remaining actions in the toDispatch array. This delay helps visualize each step in the sorting process by giving a pause between each action. The process will repeat until all actions in toDispatch have been executed, indicating the completion of the QuickSort operation.
*/
function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setPivot(null));
    dispatch(setCurrentQuickTwo(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentQuickTwo([]));
      dispatch(setRunning(false));
    }, 900);
    return;
  }
  let dispatchFunction = !(toDispatch[0] instanceof Array) ?
    setPivot : toDispatch[0].length > 3 ?
      setArray : toDispatch[0].length !== 2 ?
        setCurrentSwappers : toDispatch[0].length === 2 && typeof toDispatch[0][0] === "boolean" ?
          setCurrentSorted : setCurrentQuickTwo;
  dispatch(dispatchFunction(toDispatch.shift()));
  if (dispatchFunction === setPivot) dispatch(setCurrentQuickTwo(toDispatch.shift()));
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed);
  }, speed);
}

export default quickSort;
