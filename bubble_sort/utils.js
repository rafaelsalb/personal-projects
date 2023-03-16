class Utils {
    static elementWidth(element) {
        return(
            element.clientWidth - 
            parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-left")) -
            parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-right"))
        )
    }

    static elementHeight(element) {
        return(
            element.clientWidth -
            parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-top")) -
            parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-bottom"))
        )
    }
    
    static is_sorted(arr)
    {
        return arr.reduce((n, item) => n !== false && item >= n && item)
    }

    static fisher_yates(array)
    {
        for (let i = array.length - 1; i > 0; --i) {
            let j = int(random(0, i))
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }
}