import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="position-fixed landing-container bg-aqua-blue">
      <img className="position-absolute landing-logo" src="/logo.svg" alt="requote logo" />
      <div className="position-absolute bg-lavender-grey rounded-border-top landing-floor text-center p-5">
        <img className="position-absolute landing-image" src="/images/landing-image.svg" alt="Woman sitting and reading a book" />
        <h3 className="fw-normal lh-base">
          Your favorite passages <br />
          from your favorite books, <br />
          <strong>at your fingertips.</strong>
        </h3>
        <div className="d-grid d-md-flex justify-content-md-center">
          <button className="btn btn-navy my-3 col-md-7 col-lg-4 p-2" type="button">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
