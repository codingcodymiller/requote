import React, { useState, useContext, useEffect, useRef, MutableRefObject, FormEvent } from "react";
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

  const changeUsername = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('/api/change-username', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ username: usernameValue })
    })
      .then(res => res.json().then(resData => ({ status: res.status, message: resData.message})))
      .then(res => {
        if(res.status !== 200){
          throw new Error(res.message)
        }
        updateValidity(true);
        usernameInput.current.setCustomValidity('')
        updateMessage('Your username has been updated!');
        updateUsername(usernameValue);
        setTimeout(() => {
          updateFormCleanliness(true);
          updateUsernameValue('');
        }, 3000)
      })
      .catch(err => {
        console.error(err);
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
    <form className={`col-10 col-md-8 col-lg-6 pb-3 mx-1 my-3 section-header text-center ${isFormClean ? '' : 'was-validated' }`} onSubmit={changeUsername} noValidate>
      <label htmlFor="new-username" className="ps-1 form-label">
        Change Username
        <span className="text-secondary fw-light fst-italic px-2">- Maximum length 25 characters</span>
      </label>
      <div className={`input-group has-validation`}>
        <input
          type="text"
          ref={usernameInput}
          value={usernameValue}
          onChange={handleInput}
          maxLength={25}
          className={`form-control ${isFormClean ? '' : isValid ? 'is-valid' : 'is-invalid'}`}
          id="new-username"
          placeholder="New Username"
          aria-label="New Username"
          aria-describedby="button-addon"
          required
        />
        <button className="btn btn-navy rounded-end" type="submit" id="button-addon">Submit</button>
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
