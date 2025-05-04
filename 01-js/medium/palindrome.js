/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let string = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  console.log(string)
  let reverseString = string.split('').reverse().join('');
  console.log(reverseString)
  if(string != reverseString){
    return false;
  }
  return true;
}
module.exports = isPalindrome;
