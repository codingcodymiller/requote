import React, { useContext, useEffect, useState } from 'react';
import BookCover from './book-cover';
import { QuotesContext, QuotesContextValue } from '../pages/quote-dashboard';
import LoadingSpinner from './loading-spinner';
import { BookData } from '../pages/save-quote';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { useNavigate } from 'react-router-dom';

type CarouselProps = {
  username?: string;
}

export default function BookCarousel ({ username }: CarouselProps) {
  const navigate = useNavigate();
  const showQuotes = (book: BookData) => {
    navigate(`/quotes/${book.id || ''}`, { replace: false });
  }
  const { quoteList }: QuotesContextValue = useContext(QuotesContext)
  const [bookList, updateBookList] = useState([]);
  const [isLoading, setLoadingStatus] = useState(true);

  useEffect(() => {
    let isComponentMounted = true;

    fetch(`/api/books/${username || ''}`)
      .then(res => res.json())
      .then(res => {
        updateBookList(res);
        setLoadingStatus(false);
      })
      .catch(err => {
        console.error("error:", err)
      })

    return () => { isComponentMounted = false }
  }, [quoteList])

  if(isLoading) return <LoadingSpinner />

  const bookSlides = bookList.map((book: BookData) => <BookCover book={book} key={book.id} callback={showQuotes} className="px-1" />);

  const allBooksData: BookData = {
    title: "All Books",
    image: "/images/all-books-graphic.jpg",
    authors: [],
    isbn: "",
    description: ""
  }
  bookSlides.unshift(<BookCover book={allBooksData} key="all-books" callback={showQuotes} className="px-1" />);

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
