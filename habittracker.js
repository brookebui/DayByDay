var date = new Date(); // instance of Date object
console.log(date);

// current date info
var currentMonth = date.getMonth();
var currentDay = date.getDay();
var currentDate = date.getDate();
var currentYear = date.getFullYear();

console.log(currentMonth);
console.log(currentDay);
console.log(currentDate);
console.log(currentYear);

var months =[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

// SETTING CURRENT MONTH
// stores id 'title' from html into a JS variable
var title = document.getElementById('title');

// then changes html title to the value in the array 
title.innerHTML = ' ⋆｡˚ ' + months[currentMonth] + ' ⋆｡˚';


// Function to get habit title from localStorage on page load
window.onload = function() {
    var habitTitle = document.getElementById('habitTitle');
    var storedHabit = localStorage.getItem('habitTitle');

    if (storedHabit && storedHabit.trim() !== '') {
        habitTitle.innerHTML = storedHabit;
    } else {
        habitTitle.innerHTML = 'Click to Set Habit';
    }
}

// Function to handle habit title change on click
var habitTitle = document.getElementById('habitTitle');

habitTitle.onclick = function(){
    let habits = prompt('Enter New Habit:', habitTitle.innerHTML);

    if(habits !== null && habits.trim() !== '') {
        habitTitle.innerHTML = habits;
        localStorage.setItem('habitTitle', habits);
    } else {
        habitTitle.innerHTML = 'Click to Set Habit';
        localStorage.removeItem('habitTitle');
    }
}

// SETTING TOTAL DAYS
var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
var daysInCurrentMonth = daysInMonth[currentMonth]
var totalDays = document.getElementById('totalDays');
// ex. 11th index = 12th month = December = 31 days


// SETTING CALENDAR DAYS
var dayCount = 0;
var rowCount = 0;
var days = document.getElementsByClassName('days'); // stores list of all days

// nested for-loop to search through calendar
for(var row =0; row < days.length; row++){ // search row
    var day = days[rowCount].getElementsByClassName('day'); // temp row
    for (var col=0; col<day.length; col++){ // search column
        
        // adding border and color to current date
        if(dayCount == currentDate -1){
            day[col].setAttribute('style','color:rgb(155, 201, 170)');
            day[col].setAttribute('style','border:2px solid black');
        }

        // update correct date number and id, hides extra numbers
        if(dayCount < daysInCurrentMonth){
            day[col].innerHTML = dayCount + 1;
            day[col].setAttribute('id','day' + (dayCount + 1));
            dayCount++;
        } else{
            day[col].innerHTML ="";
            day[col].setAttribute('style','background-color:rgb(252, 250, 246)');
        }
    }
    rowCount++; // repeats for each row
}

// COMPLETED DATES - using local storage
var complete = new Array(31);
var daysCompleted = 0;
for (var i = 0; i < dayCount; i++){
    var temp = '' + (currentMonth + 1) + '-' + (i + 1) + '-' + currentYear; // key
    console.log('date:' + temp);
    var tempDay = localStorage.getItem(temp);
    console.log(tempDay)
    if(tempDay == null || tempDay == 'false'){  // initial start
        localStorage.setItem(temp,'false');
    } else if(tempDay == 'true'){
        daysCompleted++;
    }
    totalDays.innerHTML = daysCompleted + '/' + daysInCurrentMonth;
}

console.log("array: " + complete);
console.log('total days complete: ' + daysCompleted);

// update array by checking local storage

for(var i =0; i < currentDate; i++){
    var temp = '' + (currentMonth + 1) + '-' + (i + 1) + '-' + currentYear; // key
    console.log(temp);

    var selected = localStorage.getItem(temp);
    console.log(i + 1 + ':' + selected);
    var selectedDiv = document.getElementById('day' + (i+1));
    if (selected === 'true'){
        selectedDiv.style.backgroundColor = 'rgb(155, 201, 170)';
    } else if(selected === 'false'){
        selectedDiv.style.backgroundColor = 'rgb(252, 250, 246)';
    }
}

// update calendar after completion
var dayDiv = document.querySelectorAll('.day');
for (var i = 0; i < daysInCurrentMonth; i++){
    dayDiv[i].onclick = function(e){
        var num = e.target.innerText;
        var selectedDate = document.getElementById(e.target.id);
        var storage = '' + (currentMonth + 1) + '-' + num + '-' + currentYear;

        if(localStorage.getItem(storage)==='false'){
            selectedDate.style.backgroundColor = 'rgb(155, 201, 170)';
            localStorage.setItem(storage,true);
            daysCompleted++;
        }else if (localStorage.getItem(storage)==='true'){
            selectedDate.style.backgroundColor = 'rgb(252, 250, 246)';
            localStorage.setItem(storage,false);
            daysCompleted--;

        }

        totalDays.innerHTML = daysCompleted + '/' + dayCount;
        console.log(daysCompleted, currentDate);
        if(daysCompleted === daysInCurrentMonth){
            alert("Nice work! ♡")
        }
    }
}

// reset month
var reset = document.getElementById('reset');
reset.onclick = function (){
    var changesMade = false;

    // Check if any changes have been made before resetting
    for (var i = 0; i < dayCount; i++) {
        var temp = '' + (currentMonth + 1) + '-' + (i + 1) + '-' + currentYear;
        if (localStorage.getItem(temp) === 'true') {
            changesMade = true;
            break;
        }
    }

    if (changesMade) {
        if (confirm("Confirm: This action will delete entire progress.")) {
            // Reset the calendar and other data
            for (var i = 0; i < dayCount; i++) {
                var temp = '' + (currentMonth + 1) + '-' + (i + 1) + '-' + currentYear;
                localStorage.setItem(temp, 'false');
                var cur = document.getElementById('day' + (i + 1));
                cur.style.backgroundColor = 'rgb(252, 250, 246)';
            }

            // Reset the habit title to default
            habitTitle.innerHTML = 'Click to Set Habit';
            localStorage.removeItem('habitTitle');

            daysCompleted = 0;
            totalDays.innerHTML = daysCompleted + '/' + daysInCurrentMonth;
        }
    } else {
        // Notify the user that no changes have been made
        alert("Error: No changes have been made to the habit tracker.");
    }

     
};
