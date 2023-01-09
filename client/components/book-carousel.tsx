import React, { useEffect, useState } from 'react';
import BookCover, { BookData } from './book-cover';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';

export default function BookCarousel () {

  const [bookList, updateBookList] = useState([]);

  useEffect(() => {
    let isComponentMounted = true;

    fetch(`/api/books/`)
      .then(res => res.json())
      .then(res => updateBookList(res))
      .catch(err => {
        console.error("error:", err)
      })

    return () => { isComponentMounted = false }
  }, [])

  if(!bookList.length) return <></>;

  const bookSlides = bookList.map((book: BookData) => <BookCover title={book.title} image={book.image} id={book.id} isbn={book.isbn} key={book.id} className="px-1" />);
  bookSlides.unshift(<BookCover title="All Books" image="/images/all-books-graphic.jpg" key="all-books" />)
  return (
    <div className="pb-2 px-4 mb-2 section-header">
      <Glider
        slidesToShow={2}
        slidesToScroll={1}
        scrollLock
        resizeLock
        rewind
        draggable
        hasArrows
        iconLeft={<i className="fa-2xs fa-duotone fa-chevrons-left cursor-pointer hover-aqua-blue d-block pt-4"></i>}
        iconRight={<i className="fa-2xs fa-duotone fa-chevrons-right cursor-pointer hover-aqua-blue d-block pt-4"></i>}
        responsive={[
          {
            breakpoint: 481,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 6,
            },
          },
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 8,
            },
          },
        ]}
      >
        {bookSlides}
      </Glider>
    </div>
  )
}
