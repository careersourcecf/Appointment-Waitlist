// (c) 2020 CareerSource Central Florida
// Author: Anthony Gaglio
// ==============================================
// APPOINTMENT FRONT END PORTAL
// ==============================================
// Update Business Hours Here
businessHourOpen = 10;
businessHourClosed = 16;

// ==============================================
// Display buinsess open satus 
function buisnessHours(stat) {
    if (stat) { // BUSINESS IS OPEN
        document.getElementById('open-status').innerHTML = "OPEN";
        // change the appearance
        document.getElementById('open-status-container').classList.remove('closed');
        document.getElementById('open-status-container').classList.add('open');
        // Hide the closed-msg and change appearance of switcher
        document.getElementById('closed-msg').classList.add('hide');
        document.getElementById('location-switcher').classList.remove('location-switcher-closed');
        document.getElementById('location-switcher').classList.remove('hide');
    }
    else { // BUSINESS IS CLOSED
        // get the current time 
        closeToday = new Date();
        closeHour = closeToday.getHours();
        closeMin  = closeToday.getMinutes();

        // Display Closed
        document.getElementById('open-status').innerHTML = "CLOSED";
        // -----------------------------------------------
        // Check back message
        if (currentDayOfWeek == "Friday" || currentDayOfWeek == "Saturday" || currentDayOfWeek == "Sunday") {
            if (currentDayOfWeek == "Friday" && closeHour < businessHourOpen ) {
                // If its friday morning before open
                minUntilOpen = 60 - closeMin; // calc the minutes until open
                // display minutes or minute
                plural = '';
                if (minUntilOpen != 1) {
                    plural = "s";
                }
                document.getElementById("next-business-day").innerHTML = "in " + minUntilOpen + " minute" + plural;
            }
            else { 
                // If its after hours friday or sat-sun
                document.getElementById("next-business-day").innerHTML = "on Monday";
            }
        } else { // if its Monday-thurs
            if (closeHour < businessHourOpen) { // before open hour
                if (closeHour == (businessHourOpen - 1)) { // one hour before business open
                    minUntilOpen = 60 - closeMin;
                    plural = '';
                    if (minUntilOpen != 1) {
                        plural = "s";
                    }
                    document.getElementById("next-business-day").innerHTML = "in " + minUntilOpen + " minute" + plural;
                } else { // early morning > 1 hour before open
                    document.getElementById("next-business-day").innerHTML = "soon";
                }
            }
            if (closeHour >= businessHourClosed) { // after closed hour
                document.getElementById("next-business-day").innerHTML = "tomorrow";
            }
        }
        // -----------------------------------------------
        // change the appearance
        document.getElementById('open-status-container').classList.remove('open');
        document.getElementById('open-status-container').classList.add('closed');
        // Show the closed-msg and change appearance of switcher
        document.getElementById('closed-msg').classList.remove('hide');
        document.getElementById('location-switcher').classList.add('location-switcher-closed');
        document.getElementById('location-switcher').classList.add('hide');
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
  // Check if open -- BUSINESS HOURS GO HERE default 10 - 4
  if (h < businessHourOpen || h >= businessHourClosed) {
      openStatus = false;
  } else {
      openStatus = true;
  }
  // Check if weekend
  if (currentDayOfWeek == 'Saturday' || currentDayOfWeek == 'Sunday') {
      openStatus = false;
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