// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  let index = 0;
  let char = json.charAt(index);
  let result;

  const next = function() {
    index++;
    char = json.charAt(index);
    if (char === ':' || char === ' ') {
      next();
    }
  };

  const value = function() {
    if (char === '{') {
      return object();
    }
    if (char === '[') {
      return array();
    }
    if (char === '"') {
      return string();
    }
    if (char === 'n') {
      return nullness();
    }
    if (char === 't' || char === 'f') {
      return boolean(0);
    }
    if (Number.isInteger(parseInt(char)) || char === '-') {
      return num();
    }
    if (char === 'u') {
      return undef();
    }
  };

  const array = function() {
    next();
    let newArr = [];
    if (char === ']' && json[index - 1] === '[') {
      return newArr;
    }
    newArr.push(value());
    while (char === ',') {
      next();
      newArr.push(value());
    }
    return newArr;
  };

  const object = function() {
    let prop;
    let newObj = {};

    next();
    if (char === '}' && json[index - 1] === '{') {
      return newObj;
    }
    if (json[index - 1] === '{') {
      prop = value();
    }
    while (index < json.length - 1) {
      if (json[index - 2] === ':' || json[index - 1] === ':') {
        newObj[prop] = value();
      }
      if (char === ',') {
        next();
        prop = value();
      } else if (char === '}') {
        next();
        return newObj;
      } else {
        next();
        if (index === json.length - 1) {
          return newObj;
        } else {
          prop = value();
        }
      }
    }
  };

  const boolean = function() {
    if (char === 't') {
      index += 3;
      next();
      return true;
    } else {
      index += 4;
      next();
      return false;
    }
  };

  const nullness = function() {
    index += 3;
    next();
    return null;
  };

  const num = function() {
    let numString = '';

    while (Number.isInteger(parseInt(char)) || char === '.' || char === '-') {
      numString += char;
      next();
    }
    return parseFloat(numString);
  };

  const string = function() {
    let newStr = '';
    next();
    let stringEnd = json.indexOf('"', index);
    if (stringEnd === index) {
      next();
      return newStr;
    }
    while (index !== stringEnd) {
      if (json[index - 1] === ' ') {
        newStr += ' ';
      }
      newStr += json[index];
      next();
    }
    next();
    return newStr;
  };

  const undef = function() {};

  result = value();
  return result;
};

// return (new Function("return " + json))(); interesting find although not relevant
