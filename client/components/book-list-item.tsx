import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectedBookContext } from '../pages/library';

export default function BookListItem(props) {
  const selectedBookData = useContext(SelectedBookContext);
  const navigate = useNavigate();
  const book = (({ imageLinks, title, authors, gBooksId, detailsUrl }) => ({ imageLinks, title, authors, gBooksId, detailsUrl }))(props.book);
  return (
    <div className="col-12 col-md-6 col-lg-4 my-2 cursor-pointer hover-grow" onClick={e => {
      selectedBookData.setBookData(book);
      navigate('../save-quote', { replace: false });
    }}>
      <div className="card h-100 shadow-sm p-2">
        <div className="row h-100">
          <div className="col-3 d-flex align-items-center">
            <img src={book.imageLinks.thumbnail} alt={`${book.title} Book Cover`} className="card book-img rounded-3 shadow-sm" />
          </div>
          <div className="col-9 py-2">
            <h6 className="two-line-truncate">{book.title}</h6>
            <p className="two-line-truncate">{(book.authors && book.authors.join(', ')) || ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
