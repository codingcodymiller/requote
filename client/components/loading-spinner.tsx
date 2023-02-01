import React from "react";

export default function LoadingSpinner () {
  return (
    <div className="d-flex my-5 justify-content-center">
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
