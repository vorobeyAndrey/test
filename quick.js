function quicksort (arr, lo, hi) {
    if (lo>=hi) return arr
    var pivot = partition(arr, lo, hi)
    quicksort(arr, lo, pivot-1)
    quicksort(arr, pivot +1, hi)
}

function partition (arr, lo, hi) {
    var i =lo
    j = hi
    var pivot = arr[j]
    while(i <= j) {
        while (arr[i]< pivot) {
            i++
        }
        while (arr[j] > pivot) {
            j--
        }
        if (i<=j) {
            var t = arr[i]
            arr[i] =  arr[j]
            arr[j] = t
        }
    }
    return j

}
console.log(quicksort([2,5,6,3,1,4], 0, 5))