
const find = (item, selectedOption, category, tree, path, callback) => {
  for (let i = tree.length - 1; i >= 0; i--) {
    (function () {
      var currentPath = path.slice();

      if (tree[i].value === category) {
        callback(findOption(currentPath, item, selectedOption));
      } else {
        if (tree[i].options) {
          currentPath.push({ value: tree[i].value, label: tree[i].label, options: [] });
          find(item, selectedOption, category, tree[i].options, currentPath, callback);
        }
      }
    })(tree[i]);
  }
}

const findOption = (current, item, selectedOption) => {
  let optionData = {};
  let temp2 = {};
  for (var i = current.length - 1; i >= 0; i--) {
    if (i === current.length - 1)
      optionData = { ...current[i], options: [] }
    temp2 = { ...current[i - 1], options: [optionData] }
    optionData = temp2;
  }

  const addOption = [...current, { ...current[current.length - 1], options: [selectedOption] }];
  addOption.splice(addOption.length - 2, 1);


  const optionsData = item.find(x => x.value === addOption[0].value);

  const opt = addNewOptions([optionsData], addOption, addOption[addOption.length - 1].value)
  if (opt !== undefined) {
    return opt
  }

  return optionData.options
}

const addNewOptions = (optionsData = [], data, parent) => {
  if (!optionsData.includes(undefined)) {
    return optionsData.map(e => {
      if (e.value === parent) {
        return { ...e, options: [...e.options, ...data[data.length - 1].options] }
      }
      return { ...e, options: [...addNewOptions(e.options, data, parent)] }
    })
  }
}
export default find;