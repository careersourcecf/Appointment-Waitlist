// (c) 2020 CareerSource Central Florida
// Author: Anthony Gaglio
// ==============================================
// APPOINTMENT FRONT END PORTAL
// ==============================================
// Update Business Hours Here
businessHourOpen = 10;
businessHourClosed = 16;

// Holidays
holidayList = [
    ['May 25','Memorial Day'],
    ['July 4','Independence Day'],
    ['September 7','Labor Day'],
    ['November 11','Veterans Day'],
    ['November 26','Thanksgiving Day'],
    ['November 27','Day After Thanksgiving Day'],
    ['December 24','Holiday Eve'],
    ['December 25','Holiday 2020'],
    ['January 1','New Years Day'],
]

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
                if (holidayCheck() === false) {
                // If its friday morning before open
                minUntilOpen = 60 - closeMin; // calc the minutes until open
                // display minutes or minute
                plural = '';
                if (minUntilOpen != 1) {
                    plural = "s";
                }
                document.getElementById("next-business-day").innerHTML = "in " + minUntilOpen + " minute" + plural;
                } else {
                    // its a holiday
                    document.getElementById("next-business-day").innerHTML = "on the next business day";
                }
            }
            else { 
                // If its after hours friday or sat-sun
                document.getElementById("next-business-day").innerHTML = "on the next business day";
            }
        } else { // if its Monday-thurs
            if (closeHour < businessHourOpen) { // before open hour
                if (closeHour == (businessHourOpen - 1)) { // one hour before business open
                    if (holidayCheck() === false) {
                        minUntilOpen = 60 - closeMin;
                        plural = '';
                        if (minUntilOpen != 1) {
                            plural = "s";
                        }
                        document.getElementById("next-business-day").innerHTML = "in " + minUntilOpen + " minute" + plural;
                    } else {
                        // its a holiday
                        document.getElementById("next-business-day").innerHTML = "on the next business day";
                    }
                } else { // early morning > 1 hour before open
                    document.getElementById("next-business-day").innerHTML = "soon";
                }
            }
            if (closeHour >= businessHourClosed) { // after closed hour
                document.getElementById("next-business-day").innerHTML = "tomorrow";
            }
        }
        // check if holiday
        
        // -----------------------------------------------
        // change the appearance
        document.getElementById('open-status-container').classList.remove('open');
        document.getElementById('open-status-container').classList.add('closed');
        // Show the closed-msg and change appearance of switcher
        document.getElementById('closed-msg').classList.remove('hide');
        //document.getElementById('location-switcher').classList.add('location-switcher-closed');

        document.getElementById('location-switcher').classList.remove('hide');
    }
}
// ==============================================
// Holiday Checker
function holidayCheck() {
    // Check if holiday
  dateCheck = currentMonth + ' ' + currentDayOfMonth;
  currentHoliday = '';
  // loop through the list of holidays
  for (var i=0; i < holidayList.length;i++){
      // check if a holiday is found
      if (dateCheck === holidayList[i][0]) {
          dateCheck = true;

          // get the holiday title
          currentHoliday = holidayList[i][1];
          break;
      } else { // holiday not found
        dateCheck = false;
      }
  }
  return dateCheck;
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
  // Check if open --
  if (h < businessHourOpen || h >= businessHourClosed) {
      openStatus = false;
  } else {
      openStatus = true; // Default value for openStatus
  }
  // Check if weekend
  if (currentDayOfWeek == 'Saturday' || currentDayOfWeek == 'Sunday') {
      openStatus = false;
  }
  // ---------------------------------------
  // Check if holiday
  dateCheck = holidayCheck();

  // check if holiday was found
  if (dateCheck === true) {
    console.log(currentHoliday + " Holiday was found");
    // show the holiday message
    document.getElementById('holiday-status-container').classList.remove('hide');
    document.getElementById('holiday-id').innerHTML = currentHoliday;
    // not open
    openStatus = false;
  }
  // END HOLIDAY CHECK 
  // ---------------------------------------

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