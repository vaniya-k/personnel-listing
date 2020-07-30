import React from 'react';

const SortColumns = ({sortType, onSortColumnClick}) => {
  const buildColumns = () => {
    const basicStyle = {display: `inline-block`, width: `110px`, height: `14px`, outline: `2px solid grey`, cursor: `pointer`, fontSize: `11px`, marginRight: `7px`, paddingLeft: `5px`};
    const activeStyle = {...basicStyle, color: `white`, backgroundColor: `grey`};
    const buttons = [];
    
    for (const type in sortType) {
      buttons.push(
        <li
          key={type}
          style={(sortType[type] === null) ? basicStyle : activeStyle}
          onClick={() => onSortColumnClick(type)}>
            {`${type.toUpperCase()}`}
            {sortType[type] === `+` && ` (ASC.)`}
            {sortType[type] === `-` && ` (DESC.)`}
        </li>
      )
    };

    return buttons;
  };

  return (
    <div style={{width: `100%`, display: `flex`, justifyContent: `center`, margin: `0 auto`}}>
      <ul style={{paddingLeft: `0`}}>
        {buildColumns()}
      </ul>
    </div>
  )
}

export default SortColumns;