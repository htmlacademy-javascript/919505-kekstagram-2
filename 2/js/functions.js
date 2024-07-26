function checkStringLength (str, maxLength) {
  return str.length <= maxLength;
}

// Строка короче 20 символов
console.log(checkStringLength('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(checkStringLength('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(checkStringLength('проверяемая строка', 10)); // false

// ---------------------------------

function checkPalindrome (str) {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < normalizedStr.length / 2; i++) {
    let leftLetter = normalizedStr[i];
    let rightLetter = normalizedStr[normalizedStr.length - 1 - i];

    if (leftLetter !== rightLetter) {
      return false;
    }
  }
  return true;
}

// Строка является палиндромом
console.log(checkPalindrome('топот')); // true
// Строка является палиндромом
console.log(checkPalindrome('воов')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(checkPalindrome('ДовОд')); // true
// Это не палиндром
console.log(checkPalindrome('Кекс'));  // false
// Это палиндром
console.log(checkPalindrome('Лёша на полке клопа нашёл ')); // true
