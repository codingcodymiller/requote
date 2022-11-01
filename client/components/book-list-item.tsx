import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectedBookContext, BookDataContextValue, BookData } from '../pages/save-quote';
import { GoogleBookData } from './result-list'

type SingleBookProps = {
  book: GoogleBookData;
}

export default function BookListItem(props: SingleBookProps) {
  const selectedBookData: BookDataContextValue = useContext(SelectedBookContext);
  const navigate = useNavigate();
  const book: BookData = reviseBookDataModel(props.book);
  return (
    <div className="col-12 col-md-6 col-lg-4 my-2 cursor-pointer hover-grow" onClick={e => {
      selectedBookData.setBookData(book);
      navigate('/save-quote/form', { replace: false });
    }}>
      <div className="card h-100 shadow-sm p-2">
        <div className="row h-100">
          <div className="col-3 d-flex align-items-center">
            <img src={book.imageUrl} alt={`${book.title} Book Cover`} className="card book-img rounded-3 shadow-sm" />
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

function reviseBookDataModel<BookData>({ volumeInfo, id, selfLink }: GoogleBookData){
  return {
    imageUrl: volumeInfo.imageLinks.thumbnail,
    title: volumeInfo.title,
    authors: volumeInfo.authors,
    gBooksId: id,
    detailsUrl: selfLink
  }
}
