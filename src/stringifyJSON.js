// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
let result = '';

  function checkArray(obj) {
    if (Array.isArray(obj)) {
      let tempArr = obj.map(function(item, index, obj) {
        if (Array.isArray(item) && item.length === 0) {
          return `[${new Array()}]`;
        }
        if (Array.isArray(item)) {
            return checkArray(item);
        } else {
          if (typeof item === 'string') {
            return `"${item}"`;
          } else {
            return item;
          }
        }
      });
    return `[${tempArr}]`;
    } else {
      if (typeof obj === 'string') {
        return '"' + obj +'"';
      } else {
        return `${obj}`;
      }
    }
  }



  // function checkObject(obj) {
  //   if (Object.keys(obj).length === 0 && obj.constructor === Object) {
  //     result += `{}`;
  //       return;
  //   }
  // }




  console.log(checkArray(obj));
  // console.log(checkObject(obj));
  // isArray = checkArray(obj);
  // isObject = checkObject(obj);
  return checkArray(obj);
};
