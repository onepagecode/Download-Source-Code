import { setArray } from "../reducers/array";
import { setCurrentHeapThree } from "../reducers/heapSort";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

/*
This function, named heapSort, implements the Heap Sort algorithm for sorting an array of numbers in increasing order.

It starts by accepting three parameters: the array to sort (stateArray), a function for dispatching actions (dispatch), and a speed parameter which likely controls the speed of the sorting or visualization process.

At the start, the function creates a new copy of the input array to avoid modifying the original array. It then initializes an empty array toDispatch to record the actions taken during the sorting process.

After that, it builds a max heap from the array using the buildMaxHeap function. A max heap is a specialized tree-like data structure that satisfies the heap property – for any given node I, the value of I is greater than or equal to the values of its children.

Next, it starts a loop that continues until the heap (array) contains more than one element. In each iteration, it swaps the first element (which is the maximum element in the max heap) with the last element in the heap, records this action, and then removes the last element from the heap by reducing the end variable by 1.

After swapping and removing the maximum element, the heap property might be violated, so it calls the siftDown function to repair the heap. The siftDown function moves the new first element down the heap until the heap property is restored.

After all elements have been removed from the heap and added to the sorted section of the array, it dispatches a final action to mark all elements as sorted.

Lastly, the handleDispatch function is called with the toDispatch array, which contains all recorded actions, and the sorted array is returned. The handleDispatch function probably dispatches these actions in sequence, providing a step-by-step visualization of the heap sort algorithm.
*/
function heapSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0),
      toDispatch = [];
  buildMaxHeap(array, toDispatch);
  let end = array.length - 1;
  while (end > 0) {
    toDispatch.push([0, end]);
    let temp = array[end];
    array[end] = array[0];
    array[0] = temp;
    toDispatch.push([0, end, true]);
    toDispatch.push(array.slice(0));
    toDispatch.push([]);
    toDispatch.push([true, end]);
    siftDown(array, 0, end, toDispatch);
    end--;
  }
  toDispatch.push([true, end]);
  handleDispatch(toDispatch, dispatch, array, speed);
  return array;
}

/*
The buildMaxHeap function is a crucial part of the heap sort algorithm. It transforms an input array into a max heap. A max heap is a binary tree structure where each parent node is greater than or equal to its child nodes.

The function takes two arguments: the array to be transformed and toDispatch, an array that tracks the actions performed during the transformation process.

The function starts its work from the middle of the array because any index beyond array.length / 2 will be a leaf node in a binary heap, and leaf nodes are already valid heaps. So it initializes the currentIndex to the index of the middle element in the array.

Then it enters a loop that continues until currentIndex is negative, meaning that it has sifted down all elements that have at least one child.

In each iteration of the loop, it calls the siftDown function to sift down the element at currentIndex. The siftDown function ensures that the element at currentIndex and its children satisfy the heap property. If not, it swaps the element down the heap until the property is satisfied or the element becomes a leaf node.

After sifting down an element, it moves to the previous element in the array by decrementing currentIndex.

So in summary, the function iterates backwards from the middle of the array to the first element, sifting down each element to its proper position in the heap. At the end of this process, the entire array has been transformed into a max heap.
*/
function buildMaxHeap(array, toDispatch) {
  let currentIndex = Math.floor(array.length / 2);
  while (currentIndex >= 0) {
    siftDown(array, currentIndex, array.length, toDispatch);
    currentIndex--;
  }
}

/*
The siftDown function plays an integral part in the Heap Sort algorithm, ensuring that the heap property is maintained. This property states that in a max heap, the value of any given node is less than or equal to the value of its parent.

This function is tasked with moving a node down the heap if it's smaller than its children. It accepts four parameters: the array being sorted (array), the index where the sift down operation starts (start), the end boundary of the heap (end), and an array that records all the actions during this operation (toDispatch).

The function begins by checking whether the starting node is a leaf node (a node without children). This is done by verifying if start is greater than or equal to half of end. If that's the case, the function immediately returns, as leaf nodes are always valid heaps.

Next, it calculates the indices of the left and right children of the starting node using standard formulas for a zero-indexed array. If the right child doesn't exist (i.e., its index is outside the heap), right is set to null.

Then, the function determines which child node is larger, or in case of only having a left child, it defaults to the left. The index of the larger child is stored in the swap variable.

Following this, the function checks if the parent node is smaller than the larger child. If this is the case, it swaps the values of the parent and the larger child node. This swap is recorded in the toDispatch array. The array is then copied and added to toDispatch for tracking purposes.

Finally, the function recursively calls itself with swap as the new starting point. This is necessary because the swap might have disrupted the heap property for the subtree rooted at swap. The recursive call ensures that this subtree is also a valid max heap. The process repeats until the sifted down node is in its correct place, and the heap property holds for all nodes.
*/
function siftDown(array, start, end, toDispatch) {
  if (start >= Math.floor(end / 2)) {
    return;
  }
  let left = start * 2 + 1,
      right = start * 2 + 2 < end ? start * 2 + 2 : null,
      swap;
  if (right) {
    toDispatch.push([start, left, right]);
    swap = array[left] > array[right] ? left : right;
  } else {
    toDispatch.push([start, left]);
    swap = left;
  }
  if (array[start] < array[swap]) {
    let temp = array[swap];
    array[swap] = array[start];
    array[start] = temp;
    toDispatch.push([start, swap, true]);
    toDispatch.push(array.slice(0));
    toDispatch.push([]);
    siftDown(array, swap, end, toDispatch);
  }
}

/*
The handleDispatch function is primarily involved in managing the dispatch of actions that occur during the heap sorting process. These dispatched actions are presumably used to animate or visualize the sorting steps.

If the toDispatch array is empty, meaning there are no more actions left to dispatch, it dispatches an action to highlight all indices in the array. Then, after a delay of 900 milliseconds, it dispatches actions to clear the highlighted indices and indicate that the sorting process is no longer running.

On the other hand, if there are still actions to dispatch in the toDispatch array, the function decides which action to dispatch based on the characteristics of the first item in the toDispatch array.

The first item can represent an array update, a swap action, a sorted mark, or a current index under consideration. The specific action is determined by examining the length of the first item and, in some cases, the type of one of its elements.

After deciding which action to dispatch, it removes the first item from toDispatch and dispatches the corresponding action.

Following this, it sets a delay equivalent to the speed parameter before recursively calling itself to dispatch the next action. This delay is likely to control the pace at which the sorting process is visualized.

The handleDispatch function continues to dispatch actions and recursively call itself until all actions have been dispatched and the toDispatch array is empty.
*/
function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setCurrentHeapThree(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentHeapThree([]));
      dispatch(setRunning(false));
    }, 900);
    return;
  }
  let dispatchFunction = toDispatch[0].length > 3 ?
      setArray : toDispatch[0].length === 3 && typeof toDispatch[0][2] === "boolean" || !toDispatch[0].length ?
        setCurrentSwappers : toDispatch[0].length === 2 && typeof toDispatch[0][0] === "boolean" ?
          setCurrentSorted : setCurrentHeapThree;
  dispatch(dispatchFunction(toDispatch.shift()));
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed);
  }, speed);
}

export default heapSort;
