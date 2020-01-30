// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  let index = 0;
  let char = json.charAt(index);
  let newJSON = json.slice(1);
  let result;

  const next = function() {
    index++;
    char = json.charAt(index);
    return char;
  };

  const value = function() {};

  const array = function() {
    let arr = [];
    next();
    while (char !== ']') {
      let item = value(char);
      arr.push(item);
    }
    return arr;
  };

  const object = function() {
    let obj = {};
    next();
  };
  const boolean = function() {};

  const nullness = function() {};

  const number = function() {
    return char;
  };

  const string = function() {};

  result = value();

  return result;
};

// return (new Function("return " + json))();
