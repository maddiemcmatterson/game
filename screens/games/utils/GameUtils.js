import { randomInt } from 'mathjs';


export function randomizeArray(input, deepCopy=true) {

  var array = null
  if (deepCopy) {
    array = JSON.parse(JSON.stringify(input));
  } else {
    array = input;
  }

  var cnt = array.length;
  var value = null;
  var index = null;

  while (cnt > 0) {
    index = Math.floor(cnt * Math.random());
    cnt -= 1;
    value = array[cnt];
    array[cnt] = array[index];
    array[index] = value;
  }

  return array;
}

function onlyUniqueValues(value, index, self) {
  return self.indexOf(value) === index;
}

export function uniqueArrayValues(array) {
  return (array.filter(onlyUniqueValues).length === array.length);
}

export function getRandomInt(min=0, max=10) {
  return randomInt(min, max);
}

function _getRandomLetters(size) {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substring(0, size);
  }

export function getRandomString(size) {

  var letters = '';
  while (letters.length < size) {
    letters += _getRandomLetters(size);
  }
  return letters.substring(0, size);
}

function _build_array(letters, size) {
  var cnt = 0;
  var array = [];
  for (var letter of letters.substring(0, size)) {
    array.push({ id:cnt, letter:letter });
    cnt += 1;
  }
  return array;
}

export function getUniqueRandomLetters(size) {
  var letters = '';
  while (letters.length < size) {
    _getRandomLetters(size).split('').forEach( letter => {
      if (!letters.includes(letter)) {
        letters += letter;
      }
    })
  }
  return _build_array(letters, size);
}


export function getRandomLetters(size) {

  var letters = '';
  while (letters.length < size) {
    letters += _getRandomLetters(size);
  }
  return _build_array(letters, size);
}
