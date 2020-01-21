// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  let index = 0;
  let char = charAt(index);

  const next = function() {
    index +=;
    char = json.charAt(index);
  }

  const value = function(json) {
    switch(char) {
      case '{':
        return object();
      case '[':
        return array();
      case '\"':
        return string();
      case 't':
        return bool();
      case 'f':
        return bool();
      case 'n':
        return nul();
      default:
        if (char === '-' || (char >= 0 && char <= 9)) {
          return number();
        } else {
          return 'error, bad JSON';
        }
    }
  }

  const array = function() {

  }

  const object = function() {


  }
  const boolean = function() {

  }

  const nullness = function() {

  }

  const number = function() {

  }

  const string = function() {

  }


  // return (new Function("return " + json))();

};
