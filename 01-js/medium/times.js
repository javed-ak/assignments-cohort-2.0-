/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

const date = new Date();

function calculateTime(n) {
    let sum = 0
    const startTime = date.getMilliseconds()
    console.log(startTime);
    for( let i = 0; i < n; i++ ) {
        sum = sum + i;
    }
    const endTime = date.getMilliseconds();
    console.log(endTime);
    const timeTake = endTime - startTime;
    return timeTake;
}
console.log(calculateTime(1000000000))