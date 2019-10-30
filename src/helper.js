
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
  // console.log('addOption', addOption);
  addOption.splice(addOption.length - 2, 1);


  const optionsData = item.find(x => x.value === addOption[0].value);

  const opt = addNewOptions([optionsData], addOption, selectedOption)
  if (opt !== undefined) {
    return opt
  }

  return optionData.options
}

const addNewOptions = (optionsData = [], data, parent) => {
  // if (!optionsData.includes(undefined)) {
  //   return optionsData.map(e => {
  //     if (e.value === parent) {
  //       return { ...e, options: [...e.options, ...data[data.length - 1].options] }
  //     }
  //     return { ...e, options: [...addNewOptions(e.options, data, parent)] }
  //   })
  // }
  // console.log(optionsData, data);
  let options = {}
  let temp2 = {}
  if (!optionsData.includes(undefined)) {
    // console.log('optionsData', optionsData, data)
    const current = recur(optionsData, data)
    // console.log('current', current);

    for (var i = current.length - 1; i >= 0; i--) {
      // console.log('entry cuurent', i, current[i]);
      if (i === current.length - 1) {
        options = { ...current[i] }
        // console.log('options inside', options);
      }

      if (i > 0) {
        // console.log('current', i - 1, current[i - 1].options);
        temp2 = { ...current[i - 1], options: [...current[i - 1].options, options] }
        // console.log('temp2', i, temp2);
        options = temp2;
      }
    }
    // console.log('options', options)
    return [options];
  }

}

//adds the previous selected options within the options of the parent
const recur = (optionsData, data) => {
  console.log('optionsData', optionsData)
  for (let i = 0; i <= optionsData.length - 1; i++) {
    for (let j = 0; j <= data.length - 1; j++) {

      if (optionsData[i].value === data[j].value) {

        if (optionsData[i].options) {

          data[j].options = [...optionsData[i].options.filter(item => {
            if (j < data.length - 1)
              return item.value !== data[j + 1].value
            return item
          })]

          console.log('data[j].options', j, data[j].options)
          recur(optionsData[i].options, data)
        }
      }
    }
  }
  console.log('recurerwrwewer', data);
  return data;
}
export default find;