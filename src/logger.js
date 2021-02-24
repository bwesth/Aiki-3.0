//Logging functions go here
export function logAction (actor, time, action, sessionStatus) {
    const log = {};
    assignProperty(log, "actor", "John");
    console.log(log);
}

function assignProperty (logObject, propertyName, propertyValue) {
    logObject[propertyName] = propertyValue;
}

//Could take an array of properties???? Later perhaps.
function assignProperties (logObject, propertyName, propertyValue) {
    logObject[propertyName] = propertyValue;
}

export function logSessionStart(tag, who, what, how, when, moar) {
    const log = {tag:tag, user:who, host:what, navigationtype:how, timestamp:when, details: moar}
    console.log(log);
}

function logSessionEnd(who, what, how, when) {

}

function logSessionAbort(who, what, how, when) {

}

//JOHN PROCRASTINATES at www.facebook.com AT 15.25
//JOHN INTERCEPTED to www.codecademy.com AT 15.25
//JOHN COMPLETED session at www.codeacademy.com AT 15.30 
//SESSION LENGTH 00:05 mins 

//JOHN PROCRASTINATES at www.facebook.com AT 15.25
//JOHN INTERCEPTED to www.codecademy.com AT 15.25
//JOHN SKIPPED session at www.codeacademy.com AT 15.28 
//SESSION LENGTH 00:03 mins 

//JOHN PROCRASTINATES at www.facebook.com AT 15.25
//JOHN INTERCEPTED to www.codecademy.com AT 15.25
//JOHN ABORTED session at www.codeacademy.com AT 15.25 ABORT METHOD: (CLOSED_TAB)
//SESSION LENGTH 00:00 mins 



