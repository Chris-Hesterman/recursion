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
    return char;
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
    if (char === 'u') {
      return undef();
    }
  };

  const array = function() {
    next();
    let result = [];
    if (char === ']') {
      return result;
    }
  };

  const object = function() {};
  const boolean = function() {};

  const nullness = function() {};

  const num = function() {
    return char;
  };

  const string = function() {};

  const undef = function() {};

  result = value();

  return result;
};

// return (new Function("return " + json))(); interesting find although not relevant
