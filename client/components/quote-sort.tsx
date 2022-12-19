import React, { useState } from "react";
import Modal from './modal';

type SortProps = {
  sortType: string;
  isReversed: boolean;
  updateSortType: (sortType: string) => void;
  updateIsReversed: (isReversed: boolean) => void;
}

export default function QuoteSort (props: SortProps){
  const { sortType, isReversed, updateSortType, updateIsReversed } = props;
  const [modalVisible, toggleModal] = useState(false);
  const reverseList = () => updateIsReversed(!isReversed)
  const handleSortSelected = (e: { target: { value: string; }; }) => {
    updateSortType(e.target.value)
    toggleModal(!modalVisible)
  }
  return (
    <>
    <div className="d-flex justify-content-around">
        <i className="p-1 fa-solid fa-xl fa-filter" onClick={() => toggleModal(!modalVisible)}></i>
        <i className={`p-1 fa-solid fa-xl fa-arrow-${isReversed ? "up" : "down"}`} onClick={reverseList}></i>
    </div>
      <Modal isOpen={modalVisible} handleClose={() => toggleModal(!modalVisible)}>
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
    </Modal>
    </>
  )
}
