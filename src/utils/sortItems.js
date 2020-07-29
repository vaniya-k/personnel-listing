const getCleanNumber = (val) => {
  return Number.parseInt(`${val}`.replace(/[()-]/g, ``))
}

const getCleanString = (val) => {
  return val.replace(/[@.]/g, ``).toLowerCase()
}

const sortItems = (sortType, initialItems) => {
  const column = Object.keys(sortType).find(type => sortType[type] !== null);
  const direction = sortType[column];
  const tempItems = [...initialItems];

  if(column === `id` || column === `phone`) {
    (direction === `+`)
      ? tempItems.sort((a, b) => getCleanNumber(a[column]) - getCleanNumber(b[column]))
      : tempItems.sort((a, b) => getCleanNumber(a[column]) - getCleanNumber(b[column])).reverse()
  } else if (column === `firstName` || column === `lastName` || column === `email`) {
    (direction === `+`)
      ? tempItems.sort((a, b) => getCleanString(a[column]).localeCompare(getCleanString(b[column])))
      : tempItems.sort((a, b) => getCleanString(a[column]).localeCompare(getCleanString(b[column]))).reverse()
  };

  return tempItems;
};

export default sortItems;