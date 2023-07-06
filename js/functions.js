function checkStringLength (string, length) {
  if (string.length > length) {
    return false;
  }

  return true;
}

function isPalindrome (string) {
  const normalizedString = string.replaceAll(' ','').toLowerCase();

  let reverseString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reverseString += normalizedString[i];
  }

  if (normalizedString === reverseString) {
    return true;
  }

  return false;
}

function getDigitsFromString (string) {
  const normalizedString = string.toString();

  let numbersString = '';

  for (let i = 0; i < normalizedString.length; i++) {
    const symbol = normalizedString[i];

    if (!Number.isNaN(Number(symbol))) {
      numbersString += symbol;
    }
  }

  if(Number(numbersString) === 0) {
    return NaN;
  }

  return Number(numbersString);
}

checkStringLength ();
isPalindrome ();
getDigitsFromString();
