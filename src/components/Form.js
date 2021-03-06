import React, {useState, useEffect, useRef} from 'react';

const NAME_REGEX = /^[A-Z]{1}[a-z]{1,}$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+[.][A-Za-z]{2,}$/;
const PHONE_REGEX = /^([0-9()+\s-]{5,})*$/;

const Form = ({onPersonAddSubmit}) => {
  const fieldsInitialValues = {id: ``, firstName: ``, lastName: ``, email: ``, phone: ``};
  const [fieldsValues, setFieldsValues] = useState({...fieldsInitialValues});
  const [fieldsValidity, setFieldsValidity] = useState({id: true, firstName: true, lastName: true, email: true, phone: true});
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  
  const idRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const handleInput = (evt, field) => {
    const val = evt.target.value.trim();

    setFieldsValues({...fieldsValues, [field]: val});

    switch(field) {
      case `firstName`:
        return (NAME_REGEX.test(val) === true || val === ``)
          ? setFieldsValidity({...fieldsValidity, [field]: true})
          : setFieldsValidity({...fieldsValidity, [field]: false});
      case `lastName`:
        return (NAME_REGEX.test(val) === true || val === ``)
          ? setFieldsValidity({...fieldsValidity, [field]: true})
          : setFieldsValidity({...fieldsValidity, [field]: false});
      case `email`:
        return (EMAIL_REGEX.test(val) === true || val === ``)
          ? setFieldsValidity({...fieldsValidity, [field]: true})
          : setFieldsValidity({...fieldsValidity, [field]: false});
      case `id`:
        return (0 + val >= 0 || val === ``)
          ? setFieldsValidity({...fieldsValidity, [field]: true})
          : setFieldsValidity({...fieldsValidity, [field]: false});
      case `phone`:
        return (PHONE_REGEX.test(val) === true || val === ``)
          ? setFieldsValidity({...fieldsValidity, [field]: true})
          : setFieldsValidity({...fieldsValidity, [field]: false});
    };
  };

  const handleSubmit= () => {
    if(isReadyToSubmit === true) {
      onPersonAddSubmit({
        id: Number.parseInt(fieldsValues.id),
        firstName: fieldsValues.firstName,
        lastName: fieldsValues.lastName,
        phone: fieldsValues.phone,
        email: fieldsValues.email,
        description: ``,
        address: {
          zip: ``,
          state: ``,
          city: ``,
          streetAddress: ``
        }
      });

      setFieldsValues(fieldsInitialValues);

      idRef.current.value = ``;
      firstNameRef.current.value = ``;
      lastNameRef.current.value = ``;
      phoneRef.current.value = ``;
      emailRef.current.value = ``;
    }
  };

  useEffect(() => {
    (Object.values(fieldsValidity).every((val) => val === true) && Object.values(fieldsValues).every((val) => val !== ``))
      ? setIsReadyToSubmit(true)
      : setIsReadyToSubmit(false)
  }, [fieldsValues, fieldsValidity]);

  return(
    <div style={{border: `2px solid grey`, marginLeft: `7px`, padding: `25px 20px`}}>
      <form>
        <label style={{display: `block`}} htmlFor="id">
          {(fieldsValidity.id === true) ? `Id: ` : `Not complete or wrong!`}
        </label>
        <input ref={idRef} type="text" id="id" onChange={(e) => handleInput(e, `id`)}></input>

        <label style={{display: `block`, marginTop: `15px`}} htmlFor="firstName">
          {(fieldsValidity.firstName === true) ? `First name: ` : `Not complete or wrong!`}
        </label>
        <input ref={firstNameRef} type="text" id="firstName" onChange={(e) => handleInput(e, `firstName`)}></input>

        <label style={{display: `block`, marginTop: `15px`}} htmlFor="lastName">
          {(fieldsValidity.lastName === true) ? `Last name: ` : `Not complete or wrong!`}
        </label>
        <input ref={lastNameRef} type="text" id="lastName" onChange={(e) => handleInput(e, `lastName`)}></input>

        <label style={{display: `block`, marginTop: `15px`}} htmlFor="email">
          {(fieldsValidity.email === true) ? `Email: ` : `Not complete or wrong!`}
        </label>
        <input ref={emailRef} type="text" id="email" onChange={(e) => handleInput(e, `email`)}></input>

        <label style={{display: `block`, marginTop: `15px`}} htmlFor="phone">
          {(fieldsValidity.phone === true) ? `Phone: ` : `Not complete or wrong!`}
        </label>
        <input ref={phoneRef} type="text" id="phone" onChange={(e) => handleInput(e, `phone`)}></input>
      </form>

      <button
        style={{width: `120px`, marginTop: `20px`}}
        disabled={!isReadyToSubmit ? true : false}
        onClick={handleSubmit}
      >
        {isReadyToSubmit ? `Add!`: `Fill out first..`}
      </button>
    </div>
  )
};

export default Form;