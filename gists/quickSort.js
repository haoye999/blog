function quickSort(arr) {
  if (!Array.isArray(arr)) throw new Error('xxxx');
  const result = arr.slice();

  _quickSort(result, 0, arr.length - 1);
  return result;
}

function _quickSort(arr, start, end) {
  if (start >= end) return;
  const mid = partition(arr, start, end);
  _quickSort(arr, start, mid);
  _quickSort(arr, mid + 1, end);
}

function partition(arr, start, end) {
  const key = arr[start];
  let left = start;
  let right = end;

  while (left < right) {
    while (left < right && key <= arr[right]) {
      right --;
    }
    arr[left] = arr[right];

    while (left < right && arr[left] <= key) {
      left ++;
    }
    arr[right] = arr[left];
  }

  arr[left] = key;

  return left;
}

console.log(quickSort([3, 2, 9, 5, 4, 7, 39, 0, 2]));