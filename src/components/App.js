import React, {useState, useEffect} from 'react';
import FilterField from './FilterField';
import Paginator from './Paginator';
import List from './List';
import sortItems from '../utils/sortItems';
import filterItems from '../utils/filterItems';
import sample from '../../src/mocks/large';

const ITEMS_PER_PAGE = 20;

const App = () => {
  const initialSortType = {id: null, firstName: null, lastName: null, email: null, phone: null};
  const [sortType, setSortType] = useState({...initialSortType});
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [filterRequest, setFilterRequest] = useState(``);
  const [initialItems, setInitialItems] = useState(sample);
  const [processedItems, setProcessedItems] = useState(null);
  const [itemsToDisplay, setItemsToDisplay] = useState(null);

  const handlePageNumberChange = (newVal) => {
    if(newVal !== activePageNumber) {
      setActivePageNumber(newVal);
    }
  };

  const handleFilterSubmit = (newVal) => {
    if(newVal !== filterRequest) {
      setFilterRequest(newVal);
    }
  };

  const handleColumnClick = (column) => {
    if(sortType[column] === null) {
      setSortType({...initialSortType, [column]: `+`})
    } else if (sortType[column] === `+`) {
      setSortType({...initialSortType, [column]: `-`})
    } else {
      setSortType({...initialSortType})
    }
  }

  useEffect(() => {
    setActivePageNumber(1);

    setProcessedItems(sortItems(sortType, filterItems(filterRequest, initialItems)));
  }, [sortType, filterRequest, initialItems])

  useEffect(() => {
    if(processedItems !== null) {
      setItemsToDisplay(processedItems.slice((activePageNumber - 1) * ITEMS_PER_PAGE, activePageNumber * ITEMS_PER_PAGE))
    }
  }, [activePageNumber, processedItems])

  return (
    <div style={{width: `700px`, border: `2px solid grey`, padding: `25px 15px`}}>
      <FilterField
        onFilterSubmit={handleFilterSubmit}
        filterRequest={filterRequest}
      />
      {itemsToDisplay !== null && <List
        itemsToDisplay={itemsToDisplay}
        sortType={sortType}
        onColumnClick={handleColumnClick}
      />}
      {itemsToDisplay !== null && <Paginator
        entriesPerPage={ITEMS_PER_PAGE}
        entriesQuantity={processedItems.length}
        activePageNumber={activePageNumber}
        onPageNumberChange={handlePageNumberChange}
      />}
    </div>
  )
};

export default App;
