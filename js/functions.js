function checkStringLength (str, maxLength) {
  return str.length <= maxLength;
}

function checkPalindrome (str) {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < normalizedStr.length / 2; i++) {
    const leftLetter = normalizedStr[i];
    const rightLetter = normalizedStr[normalizedStr.length - 1 - i];

    if (leftLetter !== rightLetter) {
      return false;
    }
  }
  return true;
}

function convertStringToNumber (str) {
  let result = '';

  if (typeof str === 'number') {
    str = str.toString();
  }

  for (let i = 0; i < str.length; i++) {
    const isLetterNaN = Number.isNaN(parseInt(str[i], 10));

    if (!isLetterNaN) {
      result += str[i];
    }
  }

  if (!result) {
    return NaN;
  }

  return parseInt(result, 10);
}

// Строка короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

// ---------------------------------

// Строка является палиндромом
checkPalindrome('топот'); // true
// Строка является палиндромом
checkPalindrome('воов'); // true
// Несмотря на разный регистр, тоже палиндром
checkPalindrome('ДовОд'); // true
// Это не палиндром
checkPalindrome('Кекс'); // false
// Это палиндром
checkPalindrome('Лёша на полке клопа нашёл '); // true

// ---------------------------------

convertStringToNumber('2023 год'); // 2023
convertStringToNumber('ECMAScript 2022'); // 2022
convertStringToNumber('1 кефир, 0.5 батона'); // 105
convertStringToNumber('агент 007'); // 7
convertStringToNumber('а я томат'); // NaN

convertStringToNumber(2023); // 2023
convertStringToNumber(-1); // 1
convertStringToNumber(1.5); // 15
