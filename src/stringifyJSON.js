// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

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
      } else if (obj.constructor !== Object) {
        return `${obj}`;
      }
    }
  }



  function checkObject(obj) {
    if (Array.isArray(obj)) {
      return checkArray(obj);
    }
    if (typeof obj === 'string') {
      return '"' + obj + '"';
    } else if (obj === null || obj.constructor === Boolean) {
      return obj;
    }
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        return `{}`;
    }
    if (Object.keys(obj).length > 0 && obj.constructor === Object) {
      let newObj = ''
      let objKeys = Object.keys(obj);
      for (let i = 0; i < objKeys.length; i++) {
        let key = `${objKeys[i]}`;
        let val = checkObject(obj[objKeys[i]]);
        newObj += `"${key}":`;
        newObj += val;
        if (i + 1 < objKeys.length) {
          newObj += ',';
        }

      }
      newObj = `{${newObj}}`;
      return newObj;
    }
  }




  // console.log(checkObject(obj));
  // console.log(checkObject(obj));
  // isArray = checkArray(obj);
  // isObject = checkObject(obj);
  return `${checkObject(obj)}`;
};
