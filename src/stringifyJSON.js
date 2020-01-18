// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  let result = '';

  function checkObj(obj) {
    if (Array.isArray(obj)) {
      // if (!obj.length) {
      //   result += '[]';
      //   return;
      // }
      // // obj.forEach(function(item) {
      // //   if (item.length) {
      // //     checkObj(item);
      // //   }
      // else {
        obj.forEach(function(item, index, arr) {
          if (Array.isArray(item)) {
            if (!item.length) {
              arr[index] = '[]';
            } else {
              arr[index] = checkObj(item);
            }
          }
          if (typeof item === 'string') {
            arr[index] = '"' + item + '"';
          } else {
            arr[index] = arr[index]
          }
        });
        result += '[' + obj + ']';
        return;
      // }

    // } else if (Object.keys(obj).length) {
    //   for (let item in obj) {
    //     if (obj[item].length || Object.keys(obj[item]).length) {
    //       checkObj(item);
    //     } else {
    //       result += `"${item}"`;
    //     }
    //   }
    } else {
      if (typeof obj === 'string') {
        result += '"' + obj +'"';
        return;
      } else {
        result += `${obj}`;
        return;
      }

    }
  }
  checkObj(obj);
  return result ;
};
