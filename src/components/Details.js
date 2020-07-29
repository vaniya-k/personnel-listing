import React from 'react';

const Details = ({detailsData}) => {
  const {firstName, lastName, phone, email, description, address} = detailsData;

  return (
    <div style={{width: `700px`, border: `2px solid grey`, padding: `0 15px`, marginTop: `7px`}}>
      <p style={{fontWeight: `bold`}}>{`${firstName} ${lastName}`}</p>
      <p><span style={{fontWeight: `bold`}}>Description: </span>{`${description}`}</p>
      <p><span style={{fontWeight: `bold`}}>Contacts: </span>{`${email} / ${phone}`}</p>
      <p><span style={{fontWeight: `bold`}}>Address: </span>{`${address.zip} ${address.state}, ${address.city}, ${address.streetAddress}`}</p>
    </div>
  )
};

export default Details;
