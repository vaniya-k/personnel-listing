import React from 'react';

const List = ({itemsToDisplay, detailsId, onPersonClick}) => {
  const buildLiItems = () => {
    const basicStyle = {marginTop: `5px`, cursor: `pointer`, width: `630px`};
    const activeStyle = {...basicStyle, backgroundColor: `grey`, color: `white`};

    return itemsToDisplay.map((item, i) =>
      <li
        key ={item.id + item.lastName}
        onClick={() => onPersonClick(item.id + item.lastName, i)}
        style={(detailsId === item.id + item.lastName) ? activeStyle : basicStyle}
      >
        <span style={{display: `inline-block`, width: `70px`}}>{item.id}</span>
        <span style={{display: `inline-block`, width: `120px`}}>{item.firstName}</span>
        <span style={{display: `inline-block`, width: `140px`}}>{item.lastName}</span>
        <span style={{display: `inline-block`, width: `200px`}}>{item.email}</span>
        <span style={{display: `inline-block`, width: `100px`}}>{item.phone}</span>
      </li>
    );
  };
  
  return(
    <ul style={{listStyleType: `none`, paddingLeft: `35px`, margin: `0 auto`, height: `455px`}}>
      {buildLiItems()}
    </ul>
  )
};

export default List;