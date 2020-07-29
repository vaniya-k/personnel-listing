import React, {useState, useEffect} from 'react';

const NAME_REGEX = /^[A-Z]{1}[a-z]{1,}$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+[.][A-Za-z]{2,}$/;
const PHONE_REGEX = /^([0-9()+\s-]{5,})*$/

const Form = () => {
  const [fieldsValues, setFieldsValues] = useState({id: ``, firstName: ``, lastName: ``, email: ``, phone: ``})
  const [fieldsValidity, setFieldsValidity] = useState({id: true, firstName: true, lastName: true, email: true, phone: true});
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  useEffect(() => {
    (Object.values(fieldsValidity).every(val => val === true) && Object.values(fieldsValues).every(val => val !== ``))
      ? setIsReadyToSubmit(true)
      : setIsReadyToSubmit(false)
  }, [fieldsValues, fieldsValidity])

  const handleNamesInput = (evt, field) => {
    const val = evt.target.value.trim();
    
    if(field === `firstName`) {
      setFieldsValues({...fieldsValues, firstName: val})
    } else {
      setFieldsValues({...fieldsValues, lastName: val})
    };

    if(val === ``) {
      setFieldsValidity({...fieldsValidity, [field]: true})
    } else {
      (NAME_REGEX.test(val) === true) ? setFieldsValidity({...fieldsValidity, [field]: true}) : setFieldsValidity({...fieldsValidity, [field]: false})
    };
  };

  const handleIdInput = (evt) => {
    const val = evt.target.value.trim();

    setFieldsValues({...fieldsValues, id: val});

    if(val === ``) {
      setFieldsValidity({...fieldsValidity, id: true})
    } else {
      (0 + val >= 0) ? setFieldsValidity({...fieldsValidity, id: true}) : setFieldsValidity({...fieldsValidity, id: false})
    };
  };

  const handleEmailInput = (evt) => {
    const val = evt.target.value.trim();

    setFieldsValues({...fieldsValues, email: val});

    if(val === ``) {
      setFieldsValidity({...fieldsValidity, email: true})
    } else {
      (EMAIL_REGEX.test(val) === true) ? setFieldsValidity({...fieldsValidity, email: true}) : setFieldsValidity({...fieldsValidity, email: false})
    };
  };

  const handlePhoneInput = (evt) => {
    const val = evt.target.value.trim();

    setFieldsValues({...fieldsValues, phone: val});

    if(val === ``) {
      setFieldsValidity({...fieldsValidity, phone: true})
    } else {
      (PHONE_REGEX.test(val) === true) ? setFieldsValidity({...fieldsValidity, phone: true}) : setFieldsValidity({...fieldsValidity, phone: false})
    };
  };

  const handleTest = (evt) => {
    evt.preventDefault;

    console.log(`Click`)
  }

  return(
    <>
      <form>
        <label style={{display: `block`}} htmlFor="id">
          {(fieldsValidity.id === true) ? `Id: ` : `Not complete or wrong!`}
        </label>
        <input type="text" id="id" onChange={handleIdInput}></input>

        <label style={{display: `block`, marginTop: `15px`}} htmlFor="firstName">
          {(fieldsValidity.firstName === true) ? `First name: ` : `Not complete or wrong!`}
        </label>
        <input type="text" id="firstName" onChange={(e) => handleNamesInput(e, `firstName`)}></input>

        <label style={{display: `block`, marginTop: `15px`}} htmlFor="lastName">
          {(fieldsValidity.lastName === true) ? `Last name: ` : `Not complete or wrong!`}
        </label>
        <input type="text" id="lastName" onChange={(e) => handleNamesInput(e, `lastName`)}></input>

        <label style={{display: `block`, marginTop: `15px`}} htmlFor="email">
          {(fieldsValidity.email === true) ? `Email: ` : `Not complete or wrong!`}
        </label>
        <input type="text" id="email" onChange={handleEmailInput}></input>

        <label style={{display: `block`, marginTop: `15px`}} htmlFor="phone">
          {(fieldsValidity.phone === true) ? `Phone: ` : `Not complete or wrong!`}
        </label>
        <input type="text" id="phone" onChange={handlePhoneInput}></input>
      </form>
      <button style={{width: `120px`, marginTop: `15px`}} onClick={handleTest}>{isReadyToSubmit ? `Ready to sumbit!`: `Fill out first..`}</button>
    </>
  )
};

export default Form;