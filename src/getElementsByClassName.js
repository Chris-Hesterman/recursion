// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  let elements = [];
  let start = document.body;

  function checkClass(node) {
    let children = node.childNodes;

    if (node.classList) {
      if (Array.from(node.classList).includes(className)) {
        elements.push(node);
      }
    }
    if (!children) return;
    for (let child of children) {
      checkClass(child);
    }
  }
  checkClass(start);
  return elements;
};
