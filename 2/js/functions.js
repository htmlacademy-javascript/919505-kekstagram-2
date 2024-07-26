function checkStringLength (str, maxLength) {
  return str.length <= maxLength;
}

// Строка короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

// ---------------------------------

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
