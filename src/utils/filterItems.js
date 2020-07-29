const checkFilterMatch = (item, filterRequest) => {
  for (const property in item) {
    if(property !== `description` && property !== `address` && `${item[property]}`.toLowerCase().includes(filterRequest)) {
      return true
    }
  }
}

const filterItems = (filterRequest, initialItems) => {
  if (filterRequest === ``) {
    return initialItems
  }

  return initialItems.filter(item => checkFilterMatch(item, filterRequest))
}

export default filterItems;