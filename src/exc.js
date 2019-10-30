
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
  // console.log('selected option', selectedOption);
  let addOption = [];
  let optionData = {};
  let temp2 = {};
  for (var i = current.length - 1; i >= 0; i--) {
    if (i === current.length - 1) {
      optionData = { ...current[i] }
      // console.log('optiobdsd', optionData);
    }
    temp2 = { ...current[i - 1], options: [optionData] }
    optionData = temp2;
  }

  addOption = [...current, { ...current[current.length - 1], options: [selectedOption] }];

  addOption.splice(addOption.length - 2, 1);

  const optionsData = item.find(x => x.value === addOption[0].value);

  const opt = addNewOptions([optionsData], addOption, addOption[addOption.length - 1].value)

  if (opt !== undefined) {
    return opt
  }

  // console.log('optionsData', optionData);
  return optionData.options
}

const addNewOptions = (optionsData = [], data, parent) => {
  // console.log(optionsData, data);
  // let options = {}
  // let temp2 = {}
  // if (!optionsData.includes(undefined)) {
  //   const current = recur(optionsData, data)
  //   // console.log('current', current);
  //   for (var i = current.length - 1; i >= 0; i--) {
  //     if (i === current.length - 1) {
  //       options = { ...current[i], options: [...current[i].options] }
  //       // console.log('options', options);
  //     }

  //     if (i > 0) {
  //       // console.log('current', i, current[i - 1]);
  //       temp2 = { ...current[i - 1], options: [...current[i - 1].options, options] }
  //       // console.log('temp2', i, temp2);
  //       options = temp2;
  //     }
  //   }
  //   return [options];
  // }


  if (!optionsData.includes(undefined)) {
    // recur(optionsData, data)
    return optionsData.map(e => {
      if (e.value === parent) {
        return { ...e, options: [...e.options] }
      }

      if (e.options) {
        // console.log('e', e);
        return { ...e, options: [...addNewOptions(e.options, data, parent)] }
      }
      return e
    })

  }
}

const recur = (optionsData, data, updatedTree = []) => {
  // console.log(optionsData, data);
  for (var i = 0; i <= optionsData.length - 1; i++) {
    for (var j = 0; j <= data.length - 1; j++) {
      // console.log('(optionsData[i].value === data[j].value', (optionsData[i].value === data[j].value));
      if (optionsData[i].value === data[j].value) {

        if (optionsData[i].options) {
          // console.log('sd', optionsData[i].options);
          data[j].options = [...optionsData[i].options]
          // console.log('sd', data[j]);
          recur(optionsData[i].options, data)
        }
      }
    }
  }
  return data;
}
export default find;
