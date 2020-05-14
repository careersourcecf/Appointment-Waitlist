// ==============================================
// Display buinsess open satus 
function buisnessHours(stat) {
    if (stat) {
        document.getElementById('open-status').innerHTML = "OPEN";
        // change the appearance
        document.getElementById('open-status-container').classList.remove('closed');
        document.getElementById('open-status-container').classList.add('open');
    }
    else {
        document.getElementById('open-status').innerHTML = "CLOSED";
        // change the appearance
        document.getElementById('open-status-container').classList.remove('open');
        document.getElementById('open-status-container').classList.add('closed');
    }
}
// ==============================================
// Display todays date
let openStatus = true;
const todaysDate = new Date();
todaysDate.toISOString();
let htmlDate = todaysDate.toLocaleDateString();

// get the day
let currentDay = new Date();
days =   ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

currentDayOfWeek  = days[currentDay.getDay()];
currentMonth      = months[currentDay.getMonth()];
currentDayOfMonth = currentDay.getDate().toString();
currentYear       = currentDay.getFullYear().toString();

document.getElementById("date").innerHTML = currentDayOfWeek + ", " + currentMonth + " " + currentDayOfMonth;

//---------------------------------------------
// Date ordinal 'st, th, rd, nd'
currentOrdinal = "--";

function dateOrdinal(dt) {
    return (dt.getDate() % 10 == 1 && dt.getDate() != 11 ? 'st' : (dt.getDate() % 10 == 2 && dt.getDate() != 12 ? 'nd' : (dt.getDate() % 10 == 3 && dt.getDate() != 13 ? 'rd' : 'th'))); 
}
currentOrdinal = dateOrdinal(currentDay);
document.getElementById("date-ordinal").innerHTML = currentOrdinal;
//---------------------------------------------
document.getElementById("year").innerHTML = currentYear;

// END Display todays date module
// ==============================================

// ==============================================
// Display todays time
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // Set the AM or PM
  if (h < 12){
    document.getElementById("meridiem").innerHTML = "AM";
  } else {
    document.getElementById("meridiem").innerHTML = "PM";
  }
  //------------------
  // Check if open
  if (h < 7 || h > 19) {
      openStatus = false;
  } else {
      openStatus = true;
  }
  // call the function
  buisnessHours(openStatus);
  //------------------
  h = ((h + 11) % 12 + 1); // convert to 12 hour format
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML =
  h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}