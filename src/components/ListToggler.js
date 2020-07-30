import React from 'react';

const ListToggler = ({activeListType, onListTypeButtonClick}) => {
  const basicStyle = {display: `inline-block`, width: `110px`, height: `14px`, outline: `2px solid grey`, cursor: `pointer`, fontSize: `11px`, marginRight: `7px`, textAlign: `center`};
  const activeStyle = {...basicStyle, color: `white`, backgroundColor: `grey`};

  return(
    <div style={{width: `100%`, display: `flex`, justifyContent: `center`, margin: `0 auto`}}>
      <div
        style={(activeListType === `short`) ? activeStyle : basicStyle}
        onClick={() => onListTypeButtonClick(`short`)}
      >
        SHORT LIST
      </div>

      <div
        style={(activeListType === `long`) ? activeStyle : basicStyle}
        onClick={() => onListTypeButtonClick(`long`)}
      >
        LONG LIST
      </div>
    </div>
  )
};

export default ListToggler;