import React, { useState } from "react";
import { SortStateUpdate, ReversedStateUpdate } from '../pages/quote-dashboard';

type SortProps = {
  sortType: string;
  isReversed: boolean;
  updateSortType: (sort: SortStateUpdate | ReversedStateUpdate) => void;
}

export default function QuoteSort (props: SortProps){
  const { sortType, isReversed, updateSortType } = props;
  const [modalShown, toggleModal] = useState(false);
  const reverseList = () => {
    updateSortType({
      isReversed: !isReversed
    })
  }
  const handleSortSelected = (e: { target: { value: string; }; }) => {
    updateSortType({
      sortType: e.target.value
    })
    toggleModal(!modalShown)
  }
  return (
    <>
    <div className="d-flex justify-content-around">
        <i className="p-1 fa-solid fa-xl fa-filter" onClick={() => toggleModal(!modalShown)}></i>
        <i className={`p-1 fa-solid fa-xl fa-arrow-${isReversed ? "up" : "down"}`} onClick={reverseList}></i>
    </div>
    <div className={`position-fixed fill-area z-index-10 d-flex justify-content-center align-items-center bg-shadow ${modalShown ? "" : "d-none"}`}>
        <div className="card shadow-sm p-3">
          <label className="d-block">
            <input className="mx-1" type="radio" name="sortType" value="date" onFocus={handleSortSelected} onChange={handleSortSelected} checked={sortType === "date"} />
            Date Added
          </label>
          <label className="d-block">
            <input className="mx-1" type="radio" name="sortType" value="page" onFocus={handleSortSelected} onChange={handleSortSelected} checked={sortType === "page"} />
            Page Number
          </label>
          <label className="d-block">
            <input className="mx-1" type="radio" name="sortType" value="quote" onFocus={handleSortSelected} onChange={handleSortSelected} checked={sortType === "quote"} />
            Quote Length
          </label>
        </div>
    </div>
    </>
  )
}
