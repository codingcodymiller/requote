import React, { useState } from "react";
import { useLocation } from "react-router-dom"
import { getCookie } from '../helpers'
import Modal from './modal';

type SortProps = {
  sortType: string;
  isReversed: boolean;
  updateSortType: (sortType: string) => void;
  updateIsReversed: (isReversed: boolean) => void;
}

export default function QuoteControls (props: SortProps){
  const { sortType, isReversed, updateSortType, updateIsReversed } = props;
  let location = useLocation();
  const regex: RegExp = /\/.*\/quotes/g;
  const viewingSharedQuotes: boolean = Boolean(location.pathname.match(regex));
  const [modalVisible, toggleModal] = useState(false);
  const [shareLabel, updateShareLabel] = useState("Copy Link to Share Quotes")
  const username = getCookie("username");

  const resetLinkToolTip = () => {
    updateShareLabel("Copy Link to Share Quotes");
  }
  const reverseList = () => updateIsReversed(!isReversed)
  const handleSortSelected = (e: { target: { value: string; }; }) => {
    updateSortType(e.target.value)
    toggleModal(!modalVisible)
  }
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${username}/quotes`)
      .then(() => updateShareLabel("Copied!"))
      .catch(() => updateShareLabel("Could Not Copy URL"))
  }

  return (
    <>
      <button aria-label="Filter Quotes" data-balloon-pos="up" className="btn btn-link text-dark px-1 mx-2">
        <i className="fa-light fa-xl fa-filter-list" onClick={() => toggleModal(!modalVisible)}></i>
      </button>
      <button aria-label="Reverse Quote Order" data-balloon-pos="up" className="btn btn-link text-dark px-1 mx-2">
        <i className={`fa-light fa-xl fa-arrow-${isReversed ? "up" : "down"}`} onClick={reverseList}></i>
      </button>
      {
        viewingSharedQuotes || !username
          ? <></> :
          <button aria-label={shareLabel} data-balloon-pos="up" className="btn btn-link text-dark px-1 mx-2" onMouseOut={resetLinkToolTip}>
            <i className="fa-light fa-xl fa-share-nodes" onClick={handleCopyLink}></i>
          </button>
      }
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
