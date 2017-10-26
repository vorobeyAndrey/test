function quicksort (arr, lo, hi) {
    var i =lo
    var pivot = arr[hi]
    j = hi

    while(i <= j) {
        while (arr[i] < pivot) {
            i++
        }
        while (arr[j] > pivot) {
            j--
        }
        if (i<=j) {
            var t = arr[i]
            arr[i] =  arr[j]
            arr[j] = t
            i++
            j--
        }
    }

    if (lo < j)
    quicksort(arr, lo, j)
    if (i < hi)
    quicksort(arr, i, hi)

    return arr
}

console.log(quicksort([2,5,6,3,1,4], 0, 5))