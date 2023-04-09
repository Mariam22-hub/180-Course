
// problem 1
function calculateBounces(initialHeight) {
  let bounces = 0;
  // Check if the initial height is greater than 1 (minimum height for a bounce)
  while (initialHeight > 1) {
    // Increment the bounce count
    bounces++;
    // Update the height to half of its previous value (due to bouncing)
    initialHeight /= 2;
    
    initialHeight = Math.ceil(initialHeight/2);
    
    // console.log(initialHeight);
  }
  
  return bounces;
}

// Example usage
const initialHeight = 3; // Initial height of the ball
const numBounces = calculateBounces(initialHeight); // Calculate number of bounces
console.log("Number of bounces: " + numBounces); // Output the result



// problem 2
function countCapitalLetters(str) {
    let count = 0;
    
    // Iterate through each character in the string
    for (let i = 0; i < str.length; i++) {
      // Check if the character is an uppercase letter
      if (str[i] >= 'A' && str[i] <= 'Z') {
        // If so, increment the count
        count++;
      }
    }
    
    return count;
  }
  
  // Example usage
  const inputString = "HELLO World"; // Input string
  const capitalCount = countCapitalLetters(inputString); // Count capital letters
  console.log("Number of capital letters: " + capitalCount); // Output the result



  //problem 3
function checkIfAllArrays(arr) {
    // Iterate through each item in the array
    for (let i = 0; i < arr.length; i++) {
      // Check if the item is an array using Array.isArray()
      if (!Array.isArray(arr[i])) {
        // If any item is not an array, return false
        return false;
      }
    }
    
    // If all items are arrays, return true
    return true;
  }
  
  // Example usage
  const arr1 = [[1, 2], [3, 4], [5, 6]]; // Array of arrays
  const arr2 = [[1, 2], [3, 4], "not an array"]; // Array with non-array item
  const arr3 = ["not an array", "another non-array"]; // Array with all non-array items
  
  console.log(checkIfAllArrays(arr1)); // Output: true
  console.log(checkIfAllArrays(arr2)); // Output: false
  console.log(checkIfAllArrays(arr3)); // Output: false

  
  
  //problem 4
  function incrementVersionNumber(oldVersion) {
    // Split the old version string into major, minor, and patch numbers
    const [major, minor, patch] = oldVersion.split('.').map(Number);
    
    // Increment the patch number by 1
    const newPatch = patch + 1;
    
    // Check if the new patch number exceeds 9
    if (newPatch > 9) {
      // If so, increment the minor number by 1 and set the patch number to 0
      const newMinor = minor + 1;
      return `${major}.${newMinor}.0`;
    } else {
      // If not, update the patch number and return the new version string
      return `${major}.${minor}.${newPatch}`;
    }
  }
  
  // Example usage
  const oldVersion = "1.8.1"; // Old version number
  const newVersion = incrementVersionNumber(oldVersion); // Calculate new version number
  console.log("New version number: " + newVersion); // Output the result
  


// problem 5
function isWeirdObject(obj) {
    // Iterate through each key-value pair in the object
    for (const key in obj) {
      // Check if the length of the key is not greater than the length of its value
      if (key.length <= obj[key].length) {
        // If any key has a length less than or equal to its value, return false
        return "not weird";
      }
    }
    
    // If all keys have lengths greater than their values, return true
    return "weird";
  }
  
  // Example usage
  const obj1 = {key1: "12", key2: "1433"}; 
  const obj2 = {key1: "12", key2: "133"}; // Not weird object
  
  console.log(isWeirdObject(obj1)); // Output: true
  console.log(isWeirdObject(obj2)); // Output: false