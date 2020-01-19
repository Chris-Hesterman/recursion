// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  let result = '';

  function checkObj(obj) {
    if (Array.isArray(obj)) {
      let tempArr = obj.map(function(item, index, obj) {
        if (Array.isArray(item) && item.length === 0) {
          return `[${new Array()}]`;
        }
        if (Array.isArray(item)) {
            return checkObj(item);
        } else {
          if (typeof item === 'string') {
            return `"${item}"`;
          } else {
            return item
          }
        }
      });
      return `[${tempArr}]`
      // result += `[${tempArr}]`;
      // return result;
    } else {
      if (typeof obj === 'string') {
        // result += '"' + obj +'"';
        return '"' + obj +'"';;
      } else {
        // result += `${obj}`;
        return `${obj}`;
      }

    }
  }

  return checkObj(obj);;
};
