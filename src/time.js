
//Date().toLocaleString just makes the Date look like something human beings would read.
function logtime() {
    console.log("Hello, the time and date is " +  new Date().toLocaleString());
}

//Logs the time
logtime();

//Logs the time again after 3 seconds.
setTimeout(logtime, 3000);

//When you attempt to navigate to facebook, we start a timer.

//When you close the tab or leave facebook via navigation, we calculate the time difference and print it.