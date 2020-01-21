// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  let isObj = false;

  function checkArray(obj) {
    if (Array.isArray(obj)) {
      let tempArr = obj.map(function(item, index, obj) {
        if (Array.isArray(item) && item.length === 0) {
          return `[${new Array()}]`;
        }
        if (Array.isArray(item)) {
            return checkArray(item);
        } else {
          if (item.constructor === Object) {
            return checkObject(item);
          }
          if (typeof item === 'string') {
            return `"${item}"`;
          } else if (item === undefined || typeof item === 'function') {
            return null;
          } else {
            return item;
          }
        }
      });
      return `[${tempArr}]`;
    } else if (typeof obj === 'string') {
        return '"' + obj +'"';
    } else if (obj !== Object(obj)) {
        return `${obj}`;
    }
  }

  function checkObject(obj) {
    if (Array.isArray(obj)) {
      return checkArray(obj);
    }

    if (typeof obj === 'string') {
      return '"' + obj + '"';
    } else if (obj === null || obj === true || obj === false) {
      return obj;
    } else if (obj === undefined || typeof obj === 'function') {
      return;
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
        if (val === undefined || typeof val === Function) {
          newObj = newObj
        } else {
          newObj += `"${key}":`;
          newObj += val;
          if (i + 1 < objKeys.length) {
            newObj += ',';
          }
        }
      }
      newObj = `{${newObj}}`;
      return newObj;
    }
  }
  return checkArray(obj) ? `${checkArray(obj)}`: `${checkObject(obj)}`;
}
