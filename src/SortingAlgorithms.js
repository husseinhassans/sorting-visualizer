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
  console.log(animations);
  return doMergeSort(array, animations, 0, array.length - 1);
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
  for (let i = 0; i < temp.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < temp.length; j++) {
      if (temp[j] < temp[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [temp[i], temp[minIndex]] = [temp[minIndex], temp[i]];
    }
  }
  //   console.log("after:");
  //   console.log(temp);
  return temp;
};

// Quick Sort
// Quicksort is a divide and conquer algorithm that sorts an array
// by selecting a "pivot" element and partitioning the other elements
// into two subarrays according to whether they are less than or greater
// than the pivot. The subarrays are then recursively sorted. This
// process continues until the subarrays are of length 0 or 1, at
// which point they are considered sorted.

export const quickSort = (array) => {
  //   base case
  if (array.length <= 1) {
    return array;
  }

  //   pick pivot to be last element
  const pivot = array[array.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
};

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
  // Build max heap
  let temp = [...array];
  for (let i = Math.floor(temp.length / 2 - 1); i >= 0; i--) {
    heapify(temp, temp.length, i);
  }

  // Extract elements from the heap one by one
  for (let i = temp.length - 1; i > 0; i--) {
    [temp[0], temp[i]] = [temp[i], temp[0]];
    heapify(temp, i, 0);
  }

  return temp;
};

function heapify(array, heapSize, rootIndex) {
  let largest = rootIndex;
  let leftChild = 2 * rootIndex + 1;
  let rightChild = 2 * rootIndex + 2;

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
    heapify(array, heapSize, largest);
  }
}

// Bubble sort is a simple sorting algorithm that repeatedly
// iterates through the array, compares adjacent elements, and
// swaps them if they are in the wrong order. The algorithm repeats
// this process until no swaps are necessary, indicating that
// the array is sorted.

export const bubbleSort = (array) => {
  let n = array.length;
  let temp = [...array];
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (temp[j] > temp[j + 1]) {
        [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
  return temp;
};

// Insertion sort is a simple sorting algorithm that works
// by iterating over the elements of an array and inserting
// each element into its correct position in a sorted subarray.
export const insertionSort = (array) => {
  let temp = [...array];
  for (let i = 1; i < temp.length; i++) {
    let current = temp[i];
    let j = i - 1;
    while (j >= 0 && temp[j] > current) {
      temp[j + 1] = temp[j];
      j--;
    }
    temp[j + 1] = current;
  }
  return temp;
};

// export default SortingAlgorithms;
