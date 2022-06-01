import React from 'react';

export default function ResultList(props) {
  if (!props.results.length) return <></>;

  const results = props.results.filter(({ volumeInfo }) => Boolean(volumeInfo.imageLinks)).map(({ volumeInfo: book, id: bookId }) => {
    return (
      <div className="col-12 col-md-6 my-2" key={bookId}>
        <div className="card h-100 shadow-sm p-2">
          <div className="row h-100">
            <div className="col-3 d-flex align-items-center">
              <img src={book.imageLinks.thumbnail} alt={`${book.title} Book Cover`} className="book-img rounded-2" />
            </div>
            <div className="col-9 py-2">
              <h6>{book.title}</h6>
              <p>{(book.authors && book.authors.join(', ')) || ''}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="row">
      { results }
    </div>
  );
}
