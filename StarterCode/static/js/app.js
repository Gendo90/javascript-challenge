// from data.js
var tableData = data;

// YOUR CODE HERE!

function addTd(curr_row, key, obj) {
    curr_row.append("td").text(obj[key])
}

d3.select("#filter-btn").on("click", function () {
    d3.event.preventDefault();

    let filter_date =  d3.select("#datetime").property("value")
    if(filter_date.length === 0) {
        filter_date = d3.select("#datetime").property("placeholder")
    }

    console.log(filter_date)

    let results = data.filter(a => a.datetime === filter_date)
    //empty the table body of all previous elements for each click
    //prevents code from appending more elements upon different filters
    d3.select("tbody").html("")
    let table_body = d3.select("tbody")
    

    for (let i = 0; i<results.length; i++) {
        let curr_row = table_body.append("tr")
        let obj = results[i]
        addTd(curr_row, "datetime", obj)
        addTd(curr_row, "city", obj)
        addTd(curr_row, "state", obj)
        addTd(curr_row, "country", obj)
        addTd(curr_row, "shape", obj)
        addTd(curr_row, "durationMinutes", obj)
        addTd(curr_row, "comments", obj)
    }
})