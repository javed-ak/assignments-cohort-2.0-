/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/
function isAnagram(str1, str2) {
  const sortStr = (str) => {
    let sortedStr = str.toLowerCase().split("").sort().join("");
    return sortedStr;
  }

  if(sortStr(str1) == sortStr(str2)){
    return true;
  }
  return false;
}

module.exports = isAnagram;
