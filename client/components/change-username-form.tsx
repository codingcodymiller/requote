import React, { useState, useContext, useEffect, useRef, MutableRefObject } from "react";
import { UserContext } from "../app";

export default function ChangeUsernameForm(){
  const { updateUsername } = useContext(UserContext);
  const [usernameValue, updateUsernameValue] = useState('');
  const [isFormClean, updateFormCleanliness] = useState(true);
  const [isValid, updateValidity] = useState(true);
  const [message, updateMessage] = useState('');
  const usernameInput: MutableRefObject<HTMLInputElement> = useRef({} as HTMLInputElement);

  const handleInput = (e: { target: { value: string; }; }) => {
    updateUsernameValue(e.target.value)
    if(e.target.value){
      updateFormCleanliness(false);
    } else {
      updateFormCleanliness(true);
    }
  }

  const changeUsername = () => {
    fetch('/api/change-username', {
      method: 'PATCH',
      body: JSON.stringify({ username: usernameValue })
    })
    .then(res => res.json())
    .then(res => {
      if(res.status !== 204) {
        throw new Error(res.message);
      }
      updateValidity(true);
      usernameInput.current.setCustomValidity('')
      updateMessage('Your username has been updated!');
      updateUsername(usernameValue);
      setTimeout(() => {
        updateFormCleanliness(true);
        updateUsernameValue('');
      }, 1000)
    })
    .catch(err => {
      updateValidity(false);
      usernameInput.current.setCustomValidity('invalid');
      updateMessage('The username that was submitted is already taken, please try a different username.');
      console.error("Username submission error:", err);
    })
  }

  useEffect(() => {
    if(!usernameValue) return () => {}
    const timeoutId = setTimeout(() => {
      fetch(`/api/username-available?username=${usernameValue}`)
        .then(res => res.json())
        .then(res => {
          if (res.available) {
            updateValidity(true);
            usernameInput.current.setCustomValidity('');
            updateMessage('That username is available!');
          } else {
            updateValidity(false);
            usernameInput.current.setCustomValidity('invalid');
            updateMessage('That username is already taken.');
          }
        })
        .catch(err => {
          console.error("Username availability error:", err);
        })
    }, 300)
    return () => clearTimeout(timeoutId);
  }, [usernameValue])

  return (
    <form className={`col-12 mb-3 ${isFormClean ? '' : 'was-validated' }`} onSubmit={changeUsername} noValidate>
      <label htmlFor="new-username" className="ps-1 form-label">Change Username</label>
      <div className={`input-group has-validation`}>
        <input
          type="text"
          ref={usernameInput}
          value={usernameValue}
          onChange={handleInput}
          className={`form-control ${isFormClean ? '' : isValid ? 'is-valid' : 'is-invalid'}`}
          id="new-username"
          placeholder="New Username"
          aria-label="New Username"
          aria-describedby="button-addon"
          required
        />
        <button className="btn btn-navy rounded-end" type="button" id="button-addon">Submit</button>
        {
          isFormClean
          ? <></>
          : isValid
            ? <div className="valid-feedback is-valid">{message}</div>
            : <div className="invalid-feedback is-invalid">{message}</div>
        }
      </div>
    </form>
  )
}
