// from data.js
var tableData = data;

// first, create a function to add a table based on an array of 
// dataset objects, and then add the initial table for the site
// so that all data is visible for filtering

// subfunction to add a table data to a row
function addTd(curr_row, key, obj) {
    curr_row.append("td").text(obj[key])
}

// arr is an array of objects from the dataset
function addTable(arr) {
    //empty the table body of all previous elements for each click
    //prevents code from appending more elements upon different filters
    d3.select("tbody").html("")
    let table_body = d3.select("tbody")

    for (let i = 0; i < arr.length; i++) {
        let curr_row = table_body.append("tr")
        let obj = arr[i]
        addTd(curr_row, "datetime", obj)
        addTd(curr_row, "city", obj)
        addTd(curr_row, "state", obj)
        addTd(curr_row, "country", obj)
        addTd(curr_row, "shape", obj)
        addTd(curr_row, "durationMinutes", obj)
        addTd(curr_row, "comments", obj)
    }
}

// filters the data set for a given property (as a string)
// based on the form input for that property 
function filterBy(prop, arr) {
    let prop_value = d3.select(`#${prop}`).property("value")
    if (prop_value.length !== 0) {
        arr = arr.filter(a => a[`${prop}`] === prop_value)
    }
    
    return arr
}

// add table initially upon page load, before enabling the filter button to listen for 
// click events
addTable(data)

d3.select("#filter-btn").on("click", function () {
    d3.event.preventDefault();

    let results = data

    //filter the data based on other filters besides date - include all items if
    //no there is no input for a particular filter

    // Only include items for form elements present for filtering!
    skipped_props = new Set(["durationMinutes", "comments"])

    for (let prop in data[0]) {
        
        if (!(skipped_props.has(prop))) {
            console.log(prop)
            results = filterBy(prop, results)    
        }
    }
    

    addTable(results)
})