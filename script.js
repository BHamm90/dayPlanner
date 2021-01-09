$(function () {});

/* Variables in Use */
var todaysDate = moment().format("dddd, MMMM Do");
var currentTime = moment().format("H A");

/* Show the Current Day */
$("#currentDay").text(todaysDate)

/* Create Times for the day planner */
var eventTime = [
    {time: "9 AM", event: ""},
    {time: "10 AM", event: ""},
    {time: "11 AM", event: ""},
    {time: "12 PM", event: ""},
    {time: "1 PM", event: ""},
    {time: "2 PM", event: ""},
    {time: "3 PM", event: ""},
    {time: "4 PM", event: ""},
    {time: "5 PM", event: ""},
];

/* Check if there is info in local storage */
var dayEvents = JSON.parse(localStorage.getItem("dayEvents"));
if (dayEvents) {
    eventTime = dayEvents;
}

/* Create Rows for each time block */
eventTime.forEach(function(timeBlock, index){
    var schedTime = timeBlock.time;
    var rowColor = colorRow(schedTime);
    var row = 
        '<div class="time-block" id="' +
        index +
        '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
        schedTime +
        '</div><textarea class="form-control ' +
        rowColor +
        '">' +
        timeBlock.event +
        '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';
        
    /* Applying the Timeblocks to the container */
    $(".container").append(row);
});

/* Providing function for coloring of rows (Past, Present, Future) */
function colorRow(time) {
    var schedCurrent = moment(currentTime, "H A");
    var schedTime = moment(time, "H A");
    
    if (schedCurrent.isBefore(schedTime) === true) {
        return "future";
    } else if (schedCurrent.isAfter(schedTime) === true) {
        return "past";
    } else {
        return "present";
    }
}

/* Create save button and set to local storage */
$(".saveBtn").on("click", function() {
    var timeId = parseInt(
        $(this)
            
            .closest(".time-block")
            .attr("id")
    );
    
    var userText = $.trim(
        $(this)

            .parent()
            .siblings("textarea")
            .val()
    );
    eventTime[timeId].event = userText;

    localStorage.setItem("dayEvents", JSON.stringify(eventTime));
});