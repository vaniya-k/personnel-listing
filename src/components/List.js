import React from 'react';

const List = ({itemsToDisplay, onColumnClick, sortType}) => {

  const buildLiItems = () => {
    return itemsToDisplay.map(item =>
      <li key ={item.id + item.lastName} style={{marginTop: `5px`, cursor: `pointer`}}>
        <span style={{display: `inline-block`, width: `70px`}}>{item.id}</span>
        <span style={{display: `inline-block`, width: `120px`}}>{item.firstName}</span>
        <span style={{display: `inline-block`, width: `140px`}}>{item.lastName}</span>
        <span style={{display: `inline-block`, width: `200px`}}>{item.email}</span>
        <span style={{display: `inline-block`, width: `100px`}}>{item.phone}</span>
      </li>
    )
  };

  const buildButtons = () => {
    const sortButtonStyleBasic = {display: `inline-block`, width: `110px`, height: `14px`, outline: `2px solid grey`, cursor: `pointer`, fontSize: `11px`, marginRight: `7px`, paddingLeft: `5px`};
    const sortButtonStyleActive = {...sortButtonStyleBasic, color: `white`, backgroundColor: `grey`};
    const buttons = [];
    
    for (const type in sortType) {
      buttons.push(
        <li
          key={type}
          style={(sortType[type] === null) ? sortButtonStyleBasic : sortButtonStyleActive}
          onClick={() => onColumnClick(type)}>
            {`${type.toUpperCase()}`}
            {sortType[type] === `+` && ` (ASC.)`}
            {sortType[type] === `-` && ` (DESC.)`}
        </li>
      )
    }

    return buttons;
  }
  

  return(
    <>
      <div style={{width: `100%`, display: `flex`, justifyContent: `center`, margin: `0 auto`}}>
        <ul style={{paddingLeft: `0`}}>
          {buildButtons()}
        </ul>
      </div>
      <ul style={{listStyleType: `none`, paddingLeft: `35px`, margin: `0 auto`, height: `455px`}}>
        {buildLiItems()}
      </ul>
    </>
  )
};

export default List;