function countFrequency(arr, size, nDP) {
  let freqMap = new Map();
  for (let i = 0; i < nDP; i++) {
    freqMap.set(i, 0);
  }
  for (let i = 0; i < size; i++) {
    if (freqMap.has(arr[i])) {
      freqMap.set(arr[i], freqMap.get(arr[i]) + 1);
    } else {
      freqMap.set(arr[i], 1);
    }
  }
  return freqMap;
}
export default countFrequency;
