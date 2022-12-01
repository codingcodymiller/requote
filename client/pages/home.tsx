import React, { useRef, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

export default function Home() {
  if (localStorage.getItem("landing-page-seen")) {
    return <Navigate to="/quotes" />
  }
  const navigate = useNavigate();
  const [inProp, setInProp] = useState(false);
  const logoRef = useRef(null);
  const floorRef = useRef(null);
  const handleTransitionEnd = () => {
    localStorage.setItem("landing-page-seen", "true");
    navigate('/save-quote/book-search');
  }
  return (
    <div className="position-fixed landing-container bg-aqua-blue">
      <CSSTransition nodeRef={logoRef} in={inProp} timeout={500} classNames="landing-logo">
        <img ref={logoRef} className="position-absolute landing-logo" src="/logo.svg" alt="ReQuote logo" />
      </CSSTransition>
      <CSSTransition nodeRef={floorRef} in={inProp} timeout={2700} classNames="landing-floor" onEntered={handleTransitionEnd}>
        <div ref={floorRef} className="position-absolute bg-lavender-grey rounded-border-top landing-floor text-center p-5">
          <img className="position-absolute landing-image" src="/images/landing-image.svg" alt="Woman sitting and reading a book" />
          <div className="landing-content">
            <h3 className="fw-normal lh-base">
              Your favorite passages <br />
              from your favorite books, <br />
              <strong>at your fingertips.</strong>
            </h3>
            <div className="d-grid d-md-flex justify-content-md-center">
              <button className="btn btn-navy my-3 col-md-7 col-lg-4 p-2" type="button" onClick={() => setInProp(true)}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
