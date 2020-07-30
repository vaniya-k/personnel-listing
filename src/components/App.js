import React, {useState, useEffect} from 'react';
import ListToggler from './ListToggler';
import FilterField from './FilterField';
import SortColumns from './SortColumns';
import Paginator from './Paginator';
import List from './List';
import Details from './Details';
import Form from './Form';
import sortItems from '../utils/sortItems';
import filterItems from '../utils/filterItems';
import useJsonFetch from '../utils/useJsonFetch';

const ITEMS_PER_PAGE = 20;

const LIST_URLS = {
  short: `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`,
  long: `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
};

const App = () => {
  const [activeListType, setActiveListType] = useState(null);
  const [url, setUrl] = useState(null);
  const [apiData, loadingApiData, loadingApiDataError] = useJsonFetch(url);

  const initialSortType = {id: null, firstName: null, lastName: null, email: null, phone: null};
  const [sortType, setSortType] = useState({...initialSortType});
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [filterRequest, setFilterRequest] = useState(``);

  const [initialItems, setInitialItems] = useState(null);
  const [processedItems, setProcessedItems] = useState(null);
  const [itemsToDisplay, setItemsToDisplay] = useState(null);

  const [detailsId, setDetailsId] = useState(null);
  const [detailsData, setDetailsData] = useState(null);

  const handleActiveListTypeChange = (newVal) => {
    if(newVal !== activeListType && loadingApiData !== true) {
      setActiveListType(newVal)
    }
  };

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

  const handleSortTypeChange = (column) => {
    if(sortType[column] === null) {
      setSortType({...initialSortType, [column]: `+`})
    } else if (sortType[column] === `+`) {
      setSortType({...initialSortType, [column]: `-`})
    } else {
      setSortType({...initialSortType})
    }
  };

  const handleDetailsIdChange = (newVal, indexForItemsToDisplay) => {
    if(newVal !== detailsId) {
      setDetailsId(newVal);
      setDetailsData(itemsToDisplay[indexForItemsToDisplay])
    } else {
      setDetailsId(null)
    }
  };

  const handlePersonAdd = (person) => {
    const tempInitialItems = [...initialItems];
    tempInitialItems.unshift(person);
    setInitialItems(tempInitialItems);
  };

  useEffect(() => {
    if(activeListType !== null) {
      setItemsToDisplay(null);
      setInitialItems(null);

      setDetailsId(null);
      setFilterRequest(``);
      setSortType(initialSortType);

      setUrl(LIST_URLS[activeListType]);
    }
  }, [activeListType]);

  useEffect(() => {
    setInitialItems(apiData)
  }, [apiData]);

  useEffect(() => {
    if(initialItems !== null) {
      setActivePageNumber(1);

      setProcessedItems(sortItems(sortType, filterItems(filterRequest, initialItems)));
    }
  }, [sortType, filterRequest, initialItems]);

  useEffect(() => {
    if(processedItems !== null) {
      setItemsToDisplay(processedItems.slice((activePageNumber - 1) * ITEMS_PER_PAGE, activePageNumber * ITEMS_PER_PAGE))
    }
  }, [activePageNumber, processedItems]);

  const checkShowingContents = () => {
    return (itemsToDisplay !== null && loadingApiData !== true && loadingApiDataError === null) ? true : false
  }

  return (
    <>
      <div style={{display: `flex`, alignItems: `flex-start`}}>
        <div>
          <div style={{width: `700px`, border: `2px solid grey`, padding: `25px 15px`}}>
            <ListToggler activeListType={activeListType} onListTypeButtonClick={handleActiveListTypeChange}/>
            {loadingApiData === true && <p style={{width: `100%`, textAlign: `center`}}>Please wait...</p>}
            {loadingApiDataError !== null && <p style={{width: `100%`, textAlign: `center`}}>Something went wrong...</p>}
            {checkShowingContents() && <FilterField
              onFilterSubmit={handleFilterSubmit}
              filterRequest={filterRequest}
            />}
            {checkShowingContents() && <SortColumns
              sortType={sortType}
              onSortColumnClick={handleSortTypeChange}
            />}
            {checkShowingContents() && <List
              itemsToDisplay={itemsToDisplay}
              sortType={sortType}
              onColumnClick={handleSortTypeChange}
              onPersonClick={handleDetailsIdChange}
              detailsId={detailsId}
            />}
            {checkShowingContents() && <Paginator
              entriesPerPage={ITEMS_PER_PAGE}
              entriesQuantity={processedItems.length}
              activePageNumber={activePageNumber}
              onPageButtonClick={handlePageNumberChange}
            />}
          </div>
          {detailsId !== null && <Details detailsData={detailsData}/>}
        </div>
        {checkShowingContents() && <Form onPersonAddSubmit={handlePersonAdd}/>}
      </div>
    </>
  )
};

export default App;
