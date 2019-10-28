
const find = (item, category, tree, path, callback) => {
  for (let i = tree.length - 1; i >= 0; i--) {

    // Closure will allow us to scope our path variable and only what we have traversed
    // in our initial and subsequent closure functions
    (function () {
      // copy but not reference
      var currentPath = path.slice();
      // console.log('path', currentPath);
      if (tree[i].value === category) {
        // currentPath.push({ value: tree[i].value });

        callback(findOption(currentPath, item));
      } else {
        if (tree[i].options) {
          // if (currentPath.length === 0)
          currentPath.push({ value: tree[i].value, label: tree[i].label });

          find(item, category, tree[i].options, currentPath, callback);
        }
      }
    })(tree[i]);
  }
}

const findOption = (current, item) => {
  let up = {};
  let temp2 = {};
  for (var i = current.length - 1; i >= 0; i--) {
    if (i === current.length - 1)
      up = { ...current[i], options: [] }
    temp2 = { ...current[i - 1], options: [up] }
    up = temp2;
  }
  // console.log('up', up);
  return up;

}

export default find;
//   removeCategory: function (category) {
//     // starts the quest for our category and its ancestors
//     // category is one we want to look for
//     // this.list is our root list of categoires,
//     // pass in an intial empty array, each closure will add to its own instance
//     // callback to finish things off
//     this.find(category, this.list, [], function (data) {
//       console.log(data);
//     });
//   }
// }