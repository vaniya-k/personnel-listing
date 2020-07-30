import React, {useRef} from 'react';

const FilterField = ({onFilterSubmit, filterRequest}) => {
  const inputRef = useRef();

  const handleEnterPress = (evt) => {
    if(evt.keyCode === 13) {
      evt.preventDefault();

      onFilterSubmit(inputRef.current.value.toLowerCase().trim());

      inputRef.current.value = ``;
    }
  };

  return (
    <div  style={{width: `80%`, display: `flex`, justifyContent: `center`, margin: `20px auto 0 auto`}}>
      <form style={{marginRight: `20px`}}>
        <label htmlFor="search">Type your filter request here:&nbsp;&nbsp;</label>
        <input type="text" id="search" placeholder="hit Enter to submit" ref={inputRef} onKeyDown={handleEnterPress}></input>
      </form>

      <span>{`Currently: ${(filterRequest === `` ? `none` : filterRequest)}`}</span>
    </div>
  )
};

export default FilterField;