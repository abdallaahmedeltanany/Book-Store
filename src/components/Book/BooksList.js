import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "../../store/BookSlice";
import { readBook } from "../../store/BookSlice";

const BooksList = ({ isLoading, books }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const bookList =
    books.length > 0
      ? books.map((item) => (
          <li
            className="list-group-item d-flex  justify-content-between align-items-center"
            key={item.id}
          >
            <div>{item.title}</div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary"
                disabled={!isLoggedIn}
                onClick={() =>
                  dispatch(readBook(item))
                    .unwrap()
                    .then((originalPromiseResult) => {
                      console.log(originalPromiseResult);
                    })
                    .catch((rejectedValueOrSerializedError) => {
                      console.log(rejectedValueOrSerializedError);
                    })
                }
              >
                Read
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={!isLoggedIn}
                onClick={() =>
                  dispatch(deleteBook(item))
                    .unwrap()
                    .then((originalPromiseResult) => {
                      console.log(originalPromiseResult);
                    })
                    .catch((rejectedValueOrSerializedError) => {
                      console.log(rejectedValueOrSerializedError);
                    })
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))
      : "there is no books available!";
  return (
    <div>
      <h2>Books List</h2>
      {isLoading === true ? (
        "Loading..."
      ) : (
        <ul className="list-group">{bookList}</ul>
      )}
    </div>
  );
};

export default BooksList;
