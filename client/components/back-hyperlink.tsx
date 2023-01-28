import React from 'react';
import { useNavigate } from 'react-router-dom';

type BackHyperlinkProps = {
  className?: string;
}

export default function BackHyperlink (props: BackHyperlinkProps) {
  const navigate = useNavigate()
  if (!window.history.state || window.history.state?.idx === 0) return <></>
  return (
    <button className={`btn btn-link text-decoration-none text-light-grey ${props.className || ""}`} onClick={() => navigate(-1)}>
      <i className="fa-solid fa-chevron-left me-1"></i>
      Back
    </button>
  )
}
