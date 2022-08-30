function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const leftArr = mergeSort(arr.slice(0, mid));
  const rightArr = mergeSort(arr.slice(mid));

  const result = mergeSortedArr(leftArr, rightArr);
  return result;
}

function mergeSortedArr(leftArr, rightArr) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] < rightArr[j]) {
      result.push(leftArr[i]);
      i++;
    } else {
      result.push(rightArr[j]);
      j++;
    }
  }

  result.push(...leftArr.slice(i), ...rightArr.slice(j));

  return result;
}

console.log(mergeSort([3, 2, 9, 5, 4, 7, 39, 0, 2]));
