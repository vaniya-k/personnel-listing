import React from 'react';

const Paginator = ({activePageNumber, entriesPerPage, onPageNumberChange, entriesQuantity}) => {
  const pagesCount = Math.ceil(entriesQuantity / entriesPerPage);

  const composeButtonNames = () => {
    const names = [];
    
    for (let i = 0; i < pagesCount; i++) {
      names.push(`${(i * entriesPerPage) + 1}..${(i + 1) * entriesPerPage}`)
    };

    names[names.length - 1] = `${((names.length - 1) * entriesPerPage) + 1}..${entriesQuantity}`

    return names;
  }
  
  const buildButtons = () => {
    const basicStyle = {padding: `2px 4px`, outline: `2px solid grey`, cursor: `pointer`, fontSize: `11px`};
    const activeStyle = {backgroundColor: `grey`, padding: `2px 4px`, outline: `2px solid grey`, cursor: `pointer`, fontSize: `11px`, color: `white`};
    const buttonNames = composeButtonNames();

    const buttons = [];

    for(let i = 0; i < pagesCount; i++) {
      buttons.push(
        <li key={i} style={{display: `inline-block`, margin: `5px 10px`}}>
          <div onClick={() => onPageNumberChange(i + 1)} style={(activePageNumber === (i + 1)) ? activeStyle : basicStyle}>
            {buttonNames[i]}
          </div>
        </li>
      )
    };

    return buttons;
  };

  return (
    <ul style={{listStyleType: `none`, padding: `0`, marginBottom: `0`}}>
      {buildButtons()}
    </ul>
  );
};

export default Paginator;