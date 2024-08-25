import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const BookInfo = () => {
  const { bookInfo } = useSelector((state) => state.books);
  return (
    <Fragment>
      <h2>Book Details</h2>
      <div className="alert alert-secondary" role="alert">
        There is no post selected yet. Please select!
      </div>
      <div>
        <p className="fw-bold">Title: {bookInfo.title}</p>
        <p className="fw-light">Description: {bookInfo.description}</p>
        <p className="fst-italic">Price: {bookInfo.price}</p>
      </div>
    </Fragment>
  );
};

export default BookInfo;
