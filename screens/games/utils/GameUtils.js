

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