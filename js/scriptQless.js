let appState = {
    "currentView": "view-landing",
    "previousView": null,
    "header": document.querySelector(".welcome-title")
}

//---------------------------------
function viewControl(view){
    // hide all views
    hideViews();
    // update state
    appState["previousView"] = appState["currentView"];
    appState["currentView"] = view;

    // show selected view
    document.querySelector("."+view).classList.remove("hide");

    // Show back btn
    if(!(appState["currentView"] === "view-landing")) {
        document.querySelector("#backBtn").classList.remove("hide");
    }

    // Rename Main Title
    if(appState["currentView"] === "view-landing") {

        appState['header'].textContent = 'Make an Appointment';

    } else if(appState["currentView"] === 'view-virtual-appt'){

        appState['header'].textContent = 'Make a Virtual Appointment';

    } else if(appState["currentView"] === 'view-in-person-appt'){

        appState['header'].textContent = 'Make an In-Person Appointment';

    }
};
//---------------------------------
function back(){
    viewControl(appState['previousView']);
    if(appState["currentView"] === "view-landing") {
        document.querySelector("#backBtn").classList.add("hide");
    }
    if(appState["currentView"] === "view-in-person-appt") {
        appState['previousView'] = "view-landing";
    }
}
//---------------------------------
function hideViews(){
    let views = document.querySelectorAll(".view");
    for (const appView of views) {
        appView.classList.add("hide");
    }
}
//---------------------------------
// Event Listeners
// Virtual
document.querySelector("#landing-virtual-appt").addEventListener("click", function(){
    viewControl("view-virtual-appt");
});
// In-person
document.querySelector("#landing-in-person-appt").addEventListener("click", function(){
    viewControl("view-in-person-appt");
});
// In-person
document.querySelector("#view-in-person-2").addEventListener("click", function(){
    viewControl("view-in-person-appt-2");
});

// Back button
document.querySelector("#backBtn").addEventListener("click", function(){
    back();
});