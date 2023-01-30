import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../app";

export default function ChangeUsernameForm(){
  const { updateUsername } = useContext(UserContext);
  const [usernameValue, updateUsernameValue] = useState('');
  const [isFormClean, updateFormCleanliness] = useState(true);
  const [isValid, updateValidity] = useState(true);
  const [message, updateMessage] = useState('');

  const handleInput = (e: { target: { value: string; }; }) => {
    updateUsernameValue(e.target.value)
    updateFormCleanliness(false);
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
      updateMessage('Your username has been updated!')
      updateUsername(usernameValue)
      setTimeout(() => {
        updateFormCleanliness(true)
        updateUsernameValue('')
      }, 1000)
    })
    .catch(err => {
      updateValidity(false);
      updateMessage('The username that was submitted is already taken, please try a different username.')
      console.error("Username submission error:", err)
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
            updateMessage('That username is available!')
          } else {
            updateValidity(false);
            updateMessage('That username is already taken.')
          }
        })
        .catch(err => {
          console.error("Username availability error:", err)
        })
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [usernameValue])

  return (
    <form className={`col-12 mb-3 ${isFormClean ? '' : 'was-validated' }`} onSubmit={changeUsername} noValidate>
      <label htmlFor="username" className="form-label">First name</label>
      <div className={`input-group has-validation ${isValid ? 'is-valid' : 'is-invalid'}`}>
        <input
          type="text"
          value={usernameValue}
          onChange={handleInput}
          className="form-control"
          id="username"
          placeholder="New username"
          aria-label="New username"
          aria-describedby="button-addon"
          required
        />
        <button className="btn btn-primary" type="button" id="button-addon">Button</button>
        <div className="valid-feedback">
          {message}
        </div>
        <div className="invalid-feedback">
          {message}
        </div>
      </div>
    </form>
  )
}
