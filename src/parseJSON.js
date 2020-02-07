// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  let index = 0;
  let char = json.charAt(index);
  let result;
  let isString = false;

  const next = function() {
    index++;
    char = json.charAt(index);

    if (char === ' ' || char === ':') {
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
      return boolean();
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
      next();
      return newArr;
    }
    newArr.push(value());
    while (char === ',') {
      next();
      newArr.push(value());
    }
    if (char === ']') {
      return newArr;
    } else {
      throw SyntaxError();
    }
  };

  const object = function() {
    let prop;
    let newObj = {};

    next();
    if (char === '}' && json[index - 1] === '{') {
      next();
      return newObj;
    }
    if (json[index - 1] === '{' || json[index - 2] === '{') {
      prop = value();
    }
    while (index < json.length - 1) {
      if (prop) {
        while (char === ' ') {
          next();
        }
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
      let tempTru = json.slice(index, index + 4);
      if (tempTru === 'true') {
        index += 3;
        next();
        return true;
      }
      index--;
      return string();
    } else {
      let tempFalse = json.slice(index, index + 5);
      if (tempFalse === 'false') {
        index += 4;
        next();
        return false;
      }
      index--;
      return string();
    }
  };

  const nullness = function() {
    let tempNull = json.slice(index, index + 4);
    if (tempNull === 'null') {
      index += 3;
      next();
      return null;
    } else {
      index--;
      return string();
    }
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
    isString = true;
    let newStr = '';
    next();
    let stringEnd = json.indexOf('"', index);
    while (json[stringEnd - 1] === '\\') {
      stringEnd = json.indexOf('"', stringEnd + 1);
    }
    if (stringEnd === index) {
      next();
      return newStr;
    }
    while (index !== stringEnd) {
      if (stringEnd === -1) {
        throw SyntaxError();
      }
      if (json[index - 1] === ' ') {
        newStr += ' ';
      }
      if (json[index - 1] === ':') {
        newStr += ':';
      }
      while (char === '\\' && json[index - 1] === '\\') {
        next();
      }
      if (char === '\\' && json[index + 1] !== '\\') {
        next();
      }
      newStr += json[index];
      next();
    }
    next();
    isString = false;
    return newStr;
  };

  const undef = function() {};

  result = value();
  console.log(result);
  return result;
};

// return (new Function("return " + json))(); interesting find although not relevant
