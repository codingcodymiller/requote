import React, { useEffect, useState } from 'react';
import * as DOMPurify from 'dompurify';
import SectionHeader from '../components/section-header';
import BackHyperlink from '../components/back-hyperlink';
import { useParams } from 'react-router-dom';
import { BookData } from './save-quote';

export default function BookDetails(){
  const { isbn } = useParams();
  const bookDefault: BookData = {
    title: '',
    image: '',
    authors: [''],
    isbn: '',
    description: ''
  }
  const [book, updateBook] = useState(bookDefault);
  useEffect(() => {
    let isComponentMounted = true;

    fetch(`/api/book/${isbn}`)
      .then(res => res.json())
      .then(({ title, image, authors, isbn, description}: BookData) => {
        if (!isComponentMounted) return;
        updateBook({ title, image, authors, isbn, description })
      });

    return () => { isComponentMounted = false }
  })

  return (
    <>
      <div className="position-relative">
        <BackHyperlink className="position-absolute left" />
        <SectionHeader text="Book Details" />
      </div>
      <div className="card d-block p-4 clearfix">
        <h2 className="text-center mb-4">{book.title}</h2>
        <img className="col-4 float-start me-3" src={book.image} alt={`${book.title} cover`} />
        <p className="fw-bold">{`Author${book.authors.length > 1 ? "s" : ""}:`}</p>
        <p>{book.authors.join(",")}</p>
        <p className="fw-bold">ISBN:</p>
        <p>{book.isbn}</p>
        <p className="fw-bold">Description:</p>
        <p className="preserve-whitespace" dangerouslySetInnerHTML={sanitizeDescription(book.description)}></p>
      </div>
    </>
  )
}

function sanitizeDescription(description: string){
  return {
    __html: DOMPurify.sanitize(description)
  }
}
