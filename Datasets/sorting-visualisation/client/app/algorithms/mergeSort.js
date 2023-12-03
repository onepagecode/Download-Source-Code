import { setArray } from "../reducers/array";
import { setCurrentMergeX } from "../reducers/mergeSort";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

/*
The mergeSort function is responsible for implementing the Merge Sort algorithm, a commonly used sorting algorithm that uses a divide-and-conquer strategy.

The function accepts three parameters: the array to be sorted (stateArray), a dispatch function, and a speed parameter.

Initially, it creates a copy of the original array. This ensures that the sorting process does not mutate the original data. It also initializes an empty array toDispatch to keep track of the actions made during the sorting process. These actions could be used for visualizing the sorting process.

Then, the function maps each number in the array to a two-element array containing the number and its index. This may be used to track the original position of each number in the array. The mapped array, along with other arguments, is passed to a helper function mergeSortHelper. The helper function performs the actual sorting and returns a sorted array.

The mergeSortHelper function is presumably a recursive function that sorts a portion of the array and returns the sorted array. The portion to be sorted is specified by the fourth and fifth parameters (0 and array.length - 1), which represent the start and end indices. The object {array: array.slice(0)} might be used to track the initial state of the array.

Finally, the handleDispatch function is called to manage the dispatching of actions. It's passed the recorded actions (toDispatch), the dispatch function (dispatch), the sorted array (finalArray), and the speed parameter (speed). It is likely that this function is responsible for visualizing the sorting steps at a pace controlled by the speed parameter.
*/
function mergeSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0),
      toDispatch = [];
  let finalArray = mergeSortHelper(array.map((num, idx) => [num, idx]), toDispatch, 0, array.length - 1, {array: array.slice(0)});
  handleDispatch(toDispatch, dispatch, finalArray, speed);
}

/*
The mergeSortHelper function is a key component of the Merge Sort algorithm. It carries out the recursive division of the array into smaller sub-arrays, and initiates the merge process.

The function takes in six parameters - array which is the portion of the array that this particular function call is responsible for sorting, toDispatch which collects information about the sorting process for visualization purposes, start and end which are the indices of the beginning and end of the portion of the original array that corresponds to array, obj that is an object containing a copy of the original array for reference, and isFinalMerge which indicates whether this merge operation is the final one.

If the input array consists of just one element, it is already sorted, so the function returns it immediately. Otherwise, the function splits the array into two halves. It also calculates the corresponding start and end indices for each half in the original array.

The function then recursively sorts each half by calling mergeSortHelper on the two halves, and the sorted halves are returned. It passes the start and end indices of the respective halves in the original array to each recursive call.

The function also checks if the total length of the sorted halves equals the length of the original array. If so, it sets isFinalMerge to true, indicating that the next merge operation will be the final merge.

Finally, it calls the actualSort function to merge the two sorted halves into a single sorted array. It passes along the toDispatch array, the obj object, the start and end indices in the original array, and the isFinalMerge flag. This final merged array is returned by the function.

In summary, the function divides the array into halves, sorts each half recursively, and merges the sorted halves. It also tracks whether the upcoming merge is the final merge and provides information for visualization.
*/
function mergeSortHelper(array, toDispatch, start, end, obj) {
  if (array.length === 1) {
    return array;
  }
  let half = Math.floor(array.length / 2),
      first = array.slice(0, half),
      second = array.slice(half),
      indexHalf = Math.floor((end + 1 + start) / 2),
      actualFirst = mergeSortHelper(first, toDispatch, start, indexHalf - 1, obj),
      actualSecond = mergeSortHelper(second, toDispatch, indexHalf, end, obj),
      isFinalMerge = false;
  if (actualFirst.length + actualSecond.length === obj.array.length) isFinalMerge = true;
  return actualSort(actualFirst, actualSecond, toDispatch, obj, start, end, isFinalMerge);
}

/*
The actualSort function merges two sorted sub-arrays (first and second) into a single sorted array, while also providing information for visualization purposes.

This function takes in seven parameters - the two sorted sub-arrays, toDispatch which collects information about the sorting process for visualization purposes, obj which is an object containing a copy of the original array for reference, start and end which are the indices of the beginning and end of the portion of the original array that corresponds to the input sub-arrays, and isFinalMerge which indicates whether this merge operation is the final one.

The function starts by creating an empty sortedArray. It also keeps track of the next index in the original array where a number should be placed after it's decided which number comes next in the sorted order (indexToPush).

Then, as long as there are elements remaining in both first and second, the function continues to compare the first elements of these sub-arrays.

If the first element of first is less than or equal to the first element of second, the function removes the first element of first and places it next in sortedArray.

Otherwise, the function records the swap between the first elements of first and second, updates the index of the first element of second to reflect its new position in the original array, removes it from second, and places it next in sortedArray. It then increments the indices of all elements remaining in first and updates obj.array to reflect the current state of the sorted array.

During this process, the function keeps updating toDispatch with information about the comparisons, swaps, and array state changes for visualization purposes.

If this merge operation is the final one, the function records the current index in toDispatch with a flag indicating it's part of the final sorted array.

After all elements of either first or second have been placed into sortedArray, the function adds the remaining elements of first and second (which would be sorted) to sortedArray. This resulting sortedArray is then returned.

In summary, the function merges two sorted sub-arrays into a sorted array, providing information for visualization, and updating the copy of the original array to reflect changes.
*/
function actualSort(first, second, toDispatch, obj, start, end, isFinalMerge) {
  let sortedArray = [];
  let indexToPush = start;
  while (first.length && second.length) {
    toDispatch.push([first[0][1], second[0][1]]);
    if (first[0][0] <= second[0][0]) {
      indexToPush++;
      sortedArray.push(first.shift());
    } else {
      toDispatch.push([first[0][1], second[0][1], true]);
      second[0][1] = indexToPush++;
      sortedArray.push(second.shift());
      first.forEach(subArr => subArr[1]++);
      if (start === 0) {
        obj.array = sortedArray.map(subArr => subArr[0]).concat(first.map(subArr => subArr[0])).concat(second.map(subArr => subArr[0])).concat(obj.array.slice(end + 1));
      } else {
        obj.array = obj.array.slice(0, start).concat(sortedArray.map(subArr => subArr[0])).concat(first.map(subArr => subArr[0])).concat(second.map(subArr => subArr[0])).concat(obj.array.slice(end + 1));
      }
      toDispatch.push(obj.array.concat([indexToPush - 1, indexToPush]));
      toDispatch.push([]);
    }
    if (isFinalMerge) toDispatch.push([true, indexToPush - 1]);
  }
  return sortedArray.concat(first).concat(second);
}

/**
The handleDispatch function is responsible for dispatching (sending off) visualization data that's used to render the sorting process in a UI. This data is stored in the toDispatch array.

At the start, the function checks if toDispatch is empty. If it is, it dispatches an action to highlight all elements in the array as the current merge iteration, waits for 900 milliseconds, then dispatches actions to clear this highlighting, mark the array as sorted, and indicate that the sorting process is no longer running. Then it returns, ending the function.

If toDispatch is not empty, the function decides which dispatch function to use based on the length and type of data in the first element of toDispatch. It uses this logic:

If the length is greater than 3, it uses setArray, which would typically be used to update the state of the entire array.
If the length is 3 and the third element is a boolean, or if the length is 0, it uses setCurrentSwappers, which would typically be used to highlight the elements that are currently being compared.
If the length is 2 and the first element is a boolean, it uses setCurrentSorted, which would typically be used to highlight the elements that are currently in their final sorted positions.
For any other case, it uses setCurrentMergeX, which would typically be used to highlight the elements that are currently being merged.
If the chosen dispatch function is setArray, the function dispatches an action to update the array state with the new sorted array (excluding the last two indices), clear the highlighting, and then highlight the last two elements as the current swappers and the current merge iteration.

If the chosen dispatch function is not setArray, the function simply dispatches an action with the first element of toDispatch as the payload.

Finally, the function waits for a duration specified by speed, and then calls itself again with the updated toDispatch, effectively setting up the next step of the visualization. This repeats until toDispatch is empty.
 */
function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setCurrentMergeX(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentMergeX([]));
      dispatch(setCurrentSorted(array.map((num, index) => index)));
      dispatch(setRunning(false));
    }, 900);
    return;
  }
  let dispatchFunction = toDispatch[0].length > 3 ?
    setArray : toDispatch[0].length === 3 && typeof toDispatch[0][2] === "boolean" || toDispatch[0].length === 0 ?
      setCurrentSwappers : toDispatch[0].length === 2 && typeof toDispatch[0][0] === "boolean" ?
        setCurrentSorted : setCurrentMergeX;
  if (dispatchFunction === setArray) {
    let currentToDispatch = toDispatch.shift();
    dispatch(dispatchFunction(currentToDispatch.slice(0, currentToDispatch.length - 2)));
    dispatch(setCurrentSwappers([]));
    dispatch(setCurrentMergeX([]));
    dispatch(setCurrentSwappers([currentToDispatch[currentToDispatch.length - 2], currentToDispatch[currentToDispatch.length - 1]]));
    dispatch(setCurrentMergeX([currentToDispatch[currentToDispatch.length - 2], currentToDispatch[currentToDispatch.length - 1]]));
  } else {
    dispatch(dispatchFunction(toDispatch.shift()));
  }
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed);
  }, speed);
}

export default mergeSort;
