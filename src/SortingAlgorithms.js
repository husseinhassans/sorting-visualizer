// Merge Sort:
// Merge sort is a divide and conquer algorithm that sorts
// an array by dividing it in half, sorting the two halves,
// and then merging them back together. It works by using a
// recursive function that continually splits the array in half
// until it reaches arrays of length 1, which are considered sorted.
// Then, the function merges the sorted arrays back together in a
// way that preserves their sorted order.

// Animations will have 3 peices. Look at, place, and lift.
// look at means highlight top row
// place means place peices looking at in correct order in bottom
// and make them disappear from top array
// lift means move them to he top array
export const mergeSort = (array) => {
  let animations = [];
  // console.log(animations);
  // do result = potentially
  doMergeSort(array, animations, 0, array.length - 1);
  return animations;
};

function doMergeSort(array, animations, startIdx, endIdx) {
  // console.log("Merge Sorting:");
  // console.log(array);

  if (array.length <= 1) {
    return array;
  }
  const animation = {};
  animation.type = "look";
  animation.look = [startIdx, endIdx];
  animations.push(animation);

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  if (array.length === 3) {
    let placeAnimation = {};
    placeAnimation.type = "place";
    placeAnimation.oldIdx = startIdx;
    placeAnimation.newIdx = startIdx;
    animations.push(placeAnimation);

    let liftAnimation = {};
    liftAnimation.type = "lift";
    liftAnimation.range = [startIdx, startIdx];
    liftAnimation.newVals = [array[0]];
    animations.push(liftAnimation);
  }
  // console.log("Splitting");
  // console.log("left:");
  // console.log(left);
  // console.log("right:");
  // console.log(right);
  // const result = merge(doMergeSort(left), doMergeSort(right));
  return merge(
    doMergeSort(left, animations, startIdx, startIdx + middle - 1),
    doMergeSort(right, animations, startIdx + middle, endIdx),
    startIdx,
    middle,
    endIdx,
    animations
  );
}

// merge sort helper
function merge(left, right, startIdx, middle, endIdx, animations) {
  const result = [];
  let lookAnimation = {};
  lookAnimation.type = "join";
  lookAnimation.leftIndices = [startIdx, startIdx + middle - 1];
  lookAnimation.rightIndices = [startIdx + middle, endIdx];
  animations.push(lookAnimation);

  // console.log("Merging left & right");

  // while (left.length && right.length) {
  //   // console.log("left:");
  //   // console.log(left);
  //   // console.log("right:");
  //   // console.log(right);
  //   if (left[0] < right[0]) {
  //     result.push(left.shift());
  //   } else {
  //     result.push(right.shift());
  //   }
  // }

  let i = 0;
  let j = 0;
  for (; i < left.length && j < right.length; ) {
    let animation = {};
    if (left[i] < right[j]) {
      result.push(left[i]);
      animation.type = "place";
      animation.oldIdx = startIdx + i;
      animation.newIdx = startIdx + result.length - 1;
      i++;
    } else {
      result.push(right[j]);
      animation.type = "place";
      animation.oldIdx = startIdx + middle + j;
      animation.newIdx = startIdx + result.length - 1;
      j++;
    }
    animations.push(animation);
  }

  if (i < left.length) {
    for (; i < left.length; i++) {
      let animation = {};
      result.push(left[i]);
      animation.type = "place";
      animation.oldIdx = startIdx + i;
      animation.newIdx = startIdx + result.length - 1;
      animations.push(animation);
    }
  } else if (j < right.length) {
    for (; j < right.length; j++) {
      let animation = {};
      result.push(right[j]);
      animation.type = "place";
      animation.oldIdx = startIdx + middle + j;
      animation.newIdx = startIdx + result.length - 1;
      animations.push(animation);
    }
  }

  let liftAnimation = {};
  liftAnimation.type = "lift";
  liftAnimation.range = [startIdx, endIdx];
  liftAnimation.newVals = result;
  animations.push(liftAnimation);

  // let out = result.concat(
  //   left.slice(i, left.length),
  //   right.slice(j, right.length)
  // );
  // let animation = {};
  // animation.type = "place";
  // animation.add = out.slice();
  // animation.arr = getPrevArr(animations);
  // animations.push(animation);

  // console.log("Merge Result");
  // console.log(result.concat(left, right));

  return result;
}

// Selection Sort
// Selection sort is an algorithm for sorting an array by repeatedly
// selecting the minimum element (considering ascending order) from
// the unsorted part and putting it at the beginning. The algorithm
// maintains two subarrays in a given array.
// 1. The subarray which is already sorted.
// 2. Remaining subarray which is unsorted.
// In every iteration of selection sort, the minimum element (considering
// ascending order) from the unsorted subarray is picked and moved to
// the sorted subarray.

export const selectionSort = (array) => {
  //   console.log("before:");
  //   console.log(array);
  let temp = [...array];
  let animations = [];
  for (let i = 0; i < temp.length; i++) {
    let minIndex = i;
    // color in yellow
    let leftAnimation = {};
    leftAnimation.type = "left min";
    leftAnimation.idx = i;
    animations.push(leftAnimation);

    for (let j = i + 1; j < temp.length; j++) {
      // color in red
      let lookAnimation = {};
      lookAnimation.type = "look";
      lookAnimation.idx = j;
      animations.push(lookAnimation);
      if (temp[j] < temp[minIndex]) {
        // color in green
        let newMinAnimation = {};
        newMinAnimation.type = "newMin";
        newMinAnimation.idx = j;
        animations.push(newMinAnimation);
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [temp[i], temp[minIndex]] = [temp[minIndex], temp[i]];
      let swapAnimation = {};
      swapAnimation.type = "swap";
      swapAnimation.indices = [i, minIndex];
      animations.push(swapAnimation);
    }
  }
  //   console.log("after:");
  //   console.log(temp);
  return animations;
};

// Quick Sort
// Quicksort is a divide and conquer algorithm that sorts an array
// by selecting a "pivot" element and partitioning the other elements
// into two subarrays according to whether they are less than or greater
// than the pivot. The subarrays are then recursively sorted. This
// process continues until the subarrays are of length 0 or 1, at
// which point they are considered sorted.

export const quickSort = (array) => {
  let animations = [];
  doQuickSort(array, animations, 0, array.length - 1);
  return animations;
};

function doQuickSort(array, animations, startIdx) {
  //   base case
  if (array.length <= 1) {
    return array;
  }

  let look = {};
  look.type = "look";
  look.look = [startIdx, startIdx + array.length - 1];
  animations.push(look);

  //   pick pivot to be last element
  const pivot = array[array.length - 1];
  const left = [];
  const right = [];

  let tempAnimations = [];

  for (let i = 0; i < array.length - 1; i++) {
    let animation = {};
    if (array[i] < pivot) {
      animation.type = "place left";
      animation.oldIdx = startIdx + i;
      animation.newIdx = startIdx + left.length;
      left.push(array[i]);
    } else {
      // note these have to be adjusted to start after final pivot index
      animation.type = "place right";
      animation.oldIdx = startIdx + i;
      animation.newIdx = right.length;
      right.push(array[i]);
    }
    tempAnimations.push(animation);
  }

  // place pivot first
  let animation = {};
  animation.type = "place pivot";
  animation.oldIdx = startIdx + array.length - 1;
  animation.newIdx = startIdx + left.length;
  animations.push(animation);

  // adjust the right indices after finding pivot location
  // after that push all the place animations to the array
  for (let i = 0; i < tempAnimations.length; i++) {
    if (tempAnimations[i].type === "place right") {
      tempAnimations[i].newIdx =
        startIdx + left.length + 1 + tempAnimations[i].newIdx;
    }
    animations.push(tempAnimations[i]);
  }

  // Now do a lift operation
  let lift = {};
  lift.type = "lift";
  lift.newVals = [...left, pivot, ...right];
  lift.range = [startIdx, startIdx + array.length - 1];
  animations.push(lift);

  let l = doQuickSort(left, animations, startIdx);
  let r = doQuickSort(right, animations, startIdx + left.length + 1);

  return [...l, pivot, ...r];
}

// Heap sort
// Heapsort is a comparison-based sorting algorithm that sorts
// an array by building a heap data structure from the elements
// and repeatedly extracting the maximum element.
// There is no heap structure in java script so
// we use an array to represent the heap
//        6
//       /\
//     5   3
//    /\  /\
//   1 8 7 2
//  /
// 4
//  = 6,5,3,1,8,7,2,4
// Next we turn it to a max heap s.t. top element
// in each sub tree is the largest element
// for parent node index i, left child index = 2*i+1, right
// child index = left child index+1
export const heapSort = (array) => {
  let animations = [];
  doheapSort(array, animations);
  return animations;
};

function doheapSort(array, animations) {
  // Build max heap
  let temp = [...array];
  for (let i = Math.floor(temp.length / 2 - 1); i >= 0; i--) {
    heapify(temp, temp.length, i, animations);
  }

  // Extract elements from the heap one by one
  for (let i = temp.length - 1; i > 0; i--) {
    [temp[0], temp[i]] = [temp[i], temp[0]];
    let swap = {};
    swap.type = "swap";
    swap.indices = [0, i];
    animations.push(swap);
    heapify(temp, i, 0, animations);
  }

  return temp;
}

function heapify(array, heapSize, rootIndex, animations) {
  let largest = rootIndex;
  let leftChild = 2 * rootIndex + 1;
  let rightChild = 2 * rootIndex + 2;

  let look = {};
  look.type = "look";
  look.largest = largest;
  look.left = leftChild;
  look.right = rightChild; // this is not always valid to look at as right child might not exist
  look.heapSize = heapSize;
  animations.push(look);

  // Check if left child is larger than root
  if (leftChild < heapSize && array[leftChild] > array[largest]) {
    largest = leftChild;
  }

  // Check if right child is larger than largest so far
  if (rightChild < heapSize && array[rightChild] > array[largest]) {
    largest = rightChild;
  }

  // If largest is not root, swap and continue heapifying
  if (largest !== rootIndex) {
    [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]];
    let swap = {};
    swap.type = "swap";
    swap.indices = [rootIndex, largest];
    animations.push(swap);
    heapify(array, heapSize, largest, animations);
  }
}

// Bubble sort is a simple sorting algorithm that repeatedly
// iterates through the array, compares adjacent elements, and
// swaps them if they are in the wrong order. The algorithm repeats
// this process until no swaps are necessary, indicating that
// the array is sorted.

export const bubbleSort = (array) => {
  let animations = [];
  let n = array.length;
  let temp = [...array];
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      let look = {};
      look.type = "look";
      look.indices = [j, j + 1];
      animations.push(look);
      if (temp[j] > temp[j + 1]) {
        [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
        swapped = true;
        let swap = {};
        swap.type = "swap";
        swap.indices = [j, j + 1];
        animations.push(swap);
      }
    }
    if (!swapped) {
      break;
    }
  }
  return animations;
};

// Insertion sort is a simple sorting algorithm that works
// by iterating over the elements of an array and inserting
// each element into its correct position in a sorted subarray.
export const insertionSort = (array) => {
  let temp = [...array];
  let animations = [];
  for (let i = 1; i < temp.length; i++) {
    let current = temp[i];
    let look = {};
    look.type = "look";
    look.idx = i;
    animations.push(look);
    let j = i - 1;
    while (j >= 0 && temp[j] > current) {
      temp[j + 1] = temp[j];
      let swap = {};
      swap.type = "swap";
      swap.indices = [j, j + 1];
      animations.push(swap);
      j--;
    }
    temp[j + 1] = current;
  }
  return animations;
};
