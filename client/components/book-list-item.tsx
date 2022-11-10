import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectedBookContext, BookDataContextValue, BookData } from '../pages/save-quote';

type SingleBookProps = {
  book: BookData;
}

export default function BookListItem(props: SingleBookProps) {
  const selectedBookData: BookDataContextValue = useContext(SelectedBookContext);
  const navigate = useNavigate();
  const book: BookData = props.book;
  const [src, updateSrc] = useState(book.image)
  book.authors = formatAuthorNames(book.authors);
  return (
    <div className="col-12 col-md-6 col-lg-4 my-2 cursor-pointer hover-grow" onClick={e => {
      selectedBookData.setBookData(book);
      navigate('/save-quote/form', { replace: false });
    }}>
      <div className="card h-100 shadow-sm p-2">
        <div className="row h-100">
          <div className="col-3 d-flex align-items-center">
            <img
              src={src}
              alt={`${book.title} Book Cover`}
              className="card book-img rounded-3 shadow-sm"
              onError={() => updateSrc('/images/placeholder-image.jpg')}
            />
          </div>
          <div className="col-9 py-2">
            <h6 className="two-line-truncate">{book.title}</h6>
            <p className="two-line-truncate">{book.authors.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatAuthorNames(authorsArray: string[]){
  return authorsArray.map(author => author.split(", ").reverse().join(" "))
}
